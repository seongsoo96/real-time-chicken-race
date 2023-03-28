import {
  ClientToServerEvents,
  FormState,
  RoomInfo,
  RoomInfoWithPw,
  ServerToClientEvents,
  SocketErrorMessage,
} from "types"
import http from "http"
const app = require("express")()
const server = http.createServer(app)
const cors = require("cors")
import { Server, Socket } from "socket.io"
app.use(cors())
const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
})

//중복된 이름의 방이 존재할 경우 false, 없을 경우 true
function checkDuplicateRoomName(name) {
  if (io.sockets.adapter.rooms.get(name)) {
    return false
  } else {
    return true
  }
}

// 방입장
function enterRoom(socket: Socket, roomName: string) {
  const room = getRoom(roomName)
  console.log(`Socket ${socket.id} is entering room ${roomName}.`)

  const player = playerList.filter((player) => player.id === socket.id)[0]
  if (roomData[roomName]) {
    roomData[roomName] = [...roomData[roomName], player]
  }
  const index = roomList.findIndex((room) => room.name === roomName)
  if (index !== -1) {
    roomList[index].count = roomData[roomName].length
  }

  io.emit("room_list", roomList)
  console.log("roomName ::: ", roomName)
  socket.emit("navigate", roomName)
  socket.join(roomName)
  io.to(roomName).emit("room_enter", room, roomData[roomName])
}

function getRoom(name) {
  return roomList.find((room) => room.name == name)
}

function getJoinedRoomName(socket) {
  return Array.from(socket.rooms)[1] || ""
}

//이름이 roomName인 방에 속한 Socket 개수 반환
function countRoom(roomName) {
  console.log("countRoom ::: ", io.sockets.adapter.rooms.get(roomName)?.size)
  return io.sockets.adapter.rooms.get(roomName)?.size || 0
}

function leaveRoom(socket) {
  console.log("rooms:: ", socket.rooms)
  const roomName = getJoinedRoomName(socket)
  console.log("roomName ::: ", roomName)

  console.log(`Socket ${socket.id} is leaving room ${roomName}.`)

  if (roomName) {
    //현재 Disconnect 하는 Socket이 해당 방의 마지막 소켓일 경우 방 제거
    if (countRoom(roomName) === 1) {
      console.log(`Remove room ${roomName}`)
      roomList = roomList.filter((value) => value.name != roomName)
      console.log("leaveRoom roomList :: ", roomList)
      io.emit("room_list", roomList)
    } else {
      const room = getRoom(roomName)
      if (room) {
        console.log("leaveRoom room ::: ", room)
        room.count -= room.count
        console.log("leaveRoom room ::: ", room)
      }
    }
    socket.emit("navigate", "/")
    socket.leave(roomName)
  }
}

function roomNew(socket: Socket, formState: FormState) {
  const roomName = formState.name
  console.log(`Socket ${socket.id} is creating room ${roomName}.`)

  // 방 데이터 초기화(방마다 플레이어 데이터 넣을거임)
  if (!roomData[roomName]) {
    roomData[roomName] = []
  }

  //Socket은 ID와 같은 Room을 Default로 갖고 있음
  console.log("socket.rooms.size ::: ", socket.rooms)
  if (socket.rooms.size > 1) {
    console.log(`socket ${socket.id} is already in room.`)
    console.log(socket.rooms)
    socket.emit("error", "이미 다른 방에 참가중입니다.")
    return
  }

  //동일한 방이 존재할 경우
  if (!checkDuplicateRoomName(roomName)) {
    console.log(`Room name ${roomName} already exists.`)
    socket.emit("error", "동일한 방이 이미 존재합니다.")
    return
  }

  const roomInfo: RoomInfo = {
    name: formState.name,
    people: formState.people,
    count: 0,
  }

  roomList.push(roomInfo)
  roomListWithPw.push({ ...roomInfo, password: formState.password })

  enterRoom(socket, roomName)
}

const port = 3001
let roomList: RoomInfo[] = []
let roomListWithPw: RoomInfoWithPw[] = []
let playerList = []
const nickNameList = []
const roomData = {}
io.on("connection", (socket) => {
  socket.onAny((event) => {
    console.log(`Socket event: ${event}`)
  })

  //방 목록 반환
  socket.on("room_list", () => {
    socket.emit("room_list", roomList)
  })

  //방 만들기
  socket.on("room_new", (formState: FormState) => {
    console.log("✅ server :::  room_new------------")

    const roomName = formState.name
    console.log(`Socket ${socket.id} is creating room ${roomName}.`)

    // 방 데이터 초기화(방마다 플레이어 데이터 넣을거임)
    if (!roomData[roomName]) {
      roomData[roomName] = []
    }

    const roomInfo: RoomInfo = {
      name: formState.name,
      people: formState.people,
      count: 0,
    }

    roomList.push(roomInfo)
    roomListWithPw.push({ ...roomInfo, password: formState.password })

    enterRoom(socket, roomName)
  })

  // 방 입장 시 패스워드 체크
  socket.on("pw_check", (room) => {
    let currRoom = roomListWithPw.filter((r) => r.name === room.name)[0]
    if (currRoom && currRoom.password === room.password) {
      socket.emit("pw_check_ok")
    } else {
      const error: SocketErrorMessage = {
        msg: "비밀번호가 틀렸습니다.",
        type: "pw_check",
      }
      socket.emit("error", error)
    }
  })

  // 방 생성 or 방 입장 시 닉네임 중복체크
  socket.on("nick_name", (obj) => {
    const { id, nickName, name, password, people } = obj
    console.log("obj :::: ", obj)
    if (nickNameList.find((nick) => nick === nickName)) {
      const error: SocketErrorMessage = {
        msg: "이미 존재하는 닉네임입니다.",
        type: "nick_check",
      }
      socket.emit("error", error)
    } else {
      nickNameList.push(nickName)
      playerList.push({ id, nickName })
      if (password) {
        roomNew(socket, { name, password, people })
      } else {
        if (socket.rooms.size > 1) {
          console.log(`socket ${socket.id} is already in room.`)
          console.log(socket.rooms)
          return
        }
        enterRoom(socket, name)
      }
    }
  })

  //기존 방 참가
  socket.on("room_enter", (roomName: string) => {
    if (socket.rooms.size > 1) {
      console.log(`socket ${socket.id} is already in room.`)
      console.log(socket.rooms)
      return
    }

    enterRoom(socket, roomName)
  })

  // 새로고침이나 방 나갈 때
  socket.on("disconnecting", () => {
    console.log(`Socket ${socket.id} is disconnecting.`)
    leaveRoom(socket)
  })
})

server.listen(port, function () {
  console.log(`✅ listening on port ${port}`)
})
