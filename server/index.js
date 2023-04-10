"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app = require("express")();
const server = http_1.default.createServer(app);
const cors = require("cors");
const socket_io_1 = require("socket.io");
app.use(cors());
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        credentials: true,
    },
});
//중복된 이름의 방이 존재할 경우 false, 없을 경우 true
function checkDuplicateRoomName(name) {
    return io.sockets.adapter.rooms.get(name) ? false : true;
}
// 방입장
function enterRoom(socket, roomName) {
    const room = getRoom(roomName);
    console.log(`✅ Socket ${socket.id} is entering room ${roomName}.`);
    const player = playerList.filter((player) => player.id === socket.id)[0];
    if (roomData[roomName]) {
        roomData[roomName] = [...roomData[roomName], player];
    }
    const index = roomList.findIndex((room) => room.name === roomName);
    if (index !== -1) {
        roomList[index].count = roomData[roomName].length;
    }
    io.emit("room_list", roomList);
    // console.log("roomName ::: ", roomName)
    socket.emit("navigate", roomName);
    socket.join(roomName);
    io.to(roomName).emit("room_enter", room, roomData[roomName]);
}
function getRoom(name) {
    return roomList.find((room) => room.name == name);
}
function getJoinedRoomName(socket) {
    return (Array.from(socket.rooms)[1] || "");
}
//이름이 roomName인 방에 속한 Socket 개수 반환
function countRoom(roomName) {
    var _a;
    // console.log("countRoom ::: ", io.sockets.adapter.rooms.get(roomName)?.size)
    return ((_a = io.sockets.adapter.rooms.get(roomName)) === null || _a === void 0 ? void 0 : _a.size) || 0;
}
function leaveRoom(socket) {
    const roomName = getJoinedRoomName(socket);
    // console.log("playerList ::: ", playerList)
    // console.log("roomName ::: ", roomName)
    // console.log("roomData ::: ", roomData)
    console.log(`✅ Socket ${socket.id} is leaving room ${roomName}.`);
    const leavingPlayer = playerList.filter((player) => player.id === socket.id)[0];
    const nickName = (leavingPlayer === null || leavingPlayer === void 0 ? void 0 : leavingPlayer.nickName) || "";
    nickNameList = nickNameList.filter((nick) => nick !== nickName);
    if (roomName) {
        //현재 Disconnect 하는 Socket이 해당 방의 마지막 소켓일 경우 방 제거
        if (countRoom(roomName) === 1) {
            console.log(`✅ Remove room ${roomName}`);
            roomList = roomList.filter((value) => value.name != roomName);
            console.log("✅🔶 socket.id ::: ", socket.id);
            console.log("✅🔶 roomList ::: ", roomList);
            console.log("✅🔶 roomData[roomName] ::: ", roomData[roomName]);
            roomData[roomName] = [];
            io.emit("room_list", roomList);
        }
        else {
            const room = getRoom(roomName);
            if (room) {
                room.count -= 1;
                // console.log("✅❌ playerList ::: ", playerList)
                playerList = playerList.filter((player) => player.id !== socket.id);
                // console.log("✅❌ playerList 필터링 후 ::: ", playerList)
                if (roomData[roomName]) {
                    roomData[roomName] = roomData[roomName].filter((player) => player.id !== socket.id);
                }
                console.log("✅❌ socket.id ::: ", socket.id);
                console.log("✅❌ roomList ::: ", roomList);
                console.log("✅❌ roomData[roomName] ::: ", roomData[roomName]);
                io.emit("room_list", roomList);
                io.to(roomName).emit("room_update", roomData[roomName]);
            }
        }
        socket.leave(roomName);
        // socket.disconnect()
    }
}
function roomNew(socket, formState) {
    const roomName = formState.name;
    console.log(`✅ Socket ${socket.id} is creating room ${roomName}.`);
    // 방 데이터 초기화(방마다 플레이어 데이터 넣을거임)
    if (!roomData[roomName]) {
        roomData[roomName] = [];
    }
    //Socket은 ID와 같은 Room을 Default로 갖고 있음
    // console.log("socket.rooms.size ::: ", socket.rooms)
    if (socket.rooms.size > 1) {
        console.log(`🔶 socket ${socket.id} is already in room.`);
        // console.log(socket.rooms)
        socket.emit("error", "이미 다른 방에 참가중입니다.");
        return;
    }
    const roomInfo = {
        name: formState.name,
        people: formState.people,
        count: 0,
    };
    roomList.push(roomInfo);
    roomListWithPw.push(Object.assign(Object.assign({}, roomInfo), { password: formState.password }));
    enterRoom(socket, roomName);
}
const port = 3001;
let roomList = [];
let roomListWithPw = [];
let playerList = [];
let nickNameList = [];
const roomData = {};
io.on("connection", (socket) => {
    socket.onAny((event) => {
        console.log(`✅ Socket event: ${event}`);
    });
    //방 목록 반환
    socket.on("room_list", () => {
        socket.emit("room_list", roomList);
    });
    socket.on("room_name_check", (roomName) => {
        const check = checkDuplicateRoomName(roomName);
        socket.emit("room_name_ok", check);
    });
    //방 만들기
    socket.on("room_new", (formState) => {
        // console.log("✅ server :::  room_new------------")
        const roomName = formState.name;
        console.log(`✅ Socket ${socket.id} is creating room ${roomName}.`);
        // 방 데이터 초기화(방마다 플레이어 데이터 넣을거임)
        if (!roomData[roomName]) {
            roomData[roomName] = [];
        }
        const roomInfo = {
            name: formState.name,
            people: formState.people,
            count: 0,
        };
        roomList.push(roomInfo);
        roomListWithPw.push(Object.assign(Object.assign({}, roomInfo), { password: formState.password }));
        enterRoom(socket, roomName);
    });
    // 방 입장 시 패스워드 체크
    socket.on("pw_check", (room) => {
        let currRoom = roomListWithPw.filter((r) => r.name === room.name)[0];
        if (currRoom && currRoom.password === room.password) {
            socket.emit("pw_check_ok");
        }
        else {
            const error = {
                msg: "비밀번호가 틀렸습니다.",
                type: "pw_check",
            };
            socket.emit("error", error);
        }
    });
    // 방 생성 or 방 입장 시 닉네임 중복체크
    socket.on("nick_name_check", (obj) => {
        const { id, nickName, color, name, password, people } = obj;
        // console.log("obj :::: ", obj)
        if (nickNameList.find((nick) => nick === nickName)) {
            const error = {
                msg: "이미 존재하는 닉네임입니다.",
                type: "nick_check",
            };
            socket.emit("error", error);
        }
        else {
            nickNameList.push(nickName);
            playerList.push({ id, nickName, color });
            if (password) {
                roomNew(socket, { name, password, people });
            }
            else {
                if (socket.rooms.size > 1) {
                    console.log(`🔶 Socket ${socket.id} is already in room.`);
                    // console.log(socket.rooms)
                    return;
                }
                enterRoom(socket, name);
            }
        }
    });
    //기존 방 참가
    socket.on("room_enter", (roomName) => {
        if (socket.rooms.size > 1) {
            console.log(`🔶 Socket ${socket.id} is already in room.`);
            // console.log(socket.rooms)
            return;
        }
        enterRoom(socket, roomName);
    });
    socket.on("user_leaving", () => {
        leaveRoom(socket);
    });
    // 새로고침이나 방 나갈 때
    socket.on("disconnecting", (reason) => {
        console.log(`❌ Socket ${socket.id} is disconnecting. 이유 ::: ${reason}`);
        leaveRoom(socket);
    });
});
server.listen(port, function () {
    console.log(`✅ listening on port ${port}`);
});
