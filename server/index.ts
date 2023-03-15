import http from "http"
const app = require("express")()
const server = http.createServer(app)
const cors = require("cors")
const router = require("express").Router()
import { Server } from "socket.io"
app.use(cors())
const io = new Server(server, {
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
function enterRoom(socket, name) {
  const room = getRoom(name)
  console.log(`Socket ${socket.id} is entering room ${name}.`)
  if (room === undefined) {
    socket.emit("error", "정상적인 방이 아닙니다.")
    return
  }

  const player = playerList.filter((player) => player.id === socket.id)[0]
  if (roomData[name]) {
    roomData[name] = [...roomData[name], player]
  }
  const index = roomList.findIndex((room) => room.name === name)
  if (index !== -1) {
    roomList[index].count = roomData[name].length
  }

  io.emit("room_list", roomList)
  socket.emit("navigate", name)
  socket.join(name)
  io.to(name).emit("room_enter", room, roomData[name])
  io.to(name).emit("message", `${socket.id} 님이 입장하셨습니다.`)
}

function getRoom(name) {
  return roomList.find((room) => room.name == name)
}
function checkAccess(socket) {
  if (!playerList.filter((player) => player.id === socket.id).length) {
    console.log("socket.id 비정상 접속 테스트 ::: ", socket.id)
    socket.emit("redirect", "/")
    return
  }
}

const port = 3001
let roomList = []
let roomListWithPw = []
let playerList = []
const nickNameList = []
const roomData = {}
io.on("connection", (socket) => {
  // checkAccess(socket)

  socket.onAny((event) => {
    console.log(`Socket event: ${event}`)
  })

  //방 목록 반환
  socket.on("room_list", () => {
    socket.emit("room_list", roomList)
  })

  //방 만들기
  socket.on("room_new", (formState) => {
    const name = formState.name
    console.log(`Socket ${socket.id} is creating room ${name}.`)

    // 방 데이터 초기화(방마다 플레이어 데이터 넣을거임)
    if (!roomData[name]) {
      roomData[name] = []
    }

    //Socket은 ID와 같은 Room을 Default로 갖고 있음
    if (socket.rooms.size > 1) {
      console.log(`socket ${socket.id} is already in room.`)
      console.log(socket.rooms)
      socket.emit("error", "이미 다른 방에 참가중입니다.")
      return
    }

    //동일한 방이 존재할 경우
    if (!checkDuplicateRoomName(name)) {
      console.log(`Room name ${name} already exists.`)
      socket.emit("error", "동일한 방이 이미 존재합니다.")
      return
    }

    console.log("-----------------------")
    const roomInfo = {
      name: formState.name,
      people: formState.people,
      count: 0,
    }

    roomList.push(roomInfo)
    roomListWithPw.push({ ...roomInfo, password: formState.password })
    console.log(roomListWithPw)

    enterRoom(socket, name)
  })

  //기존 방 참가
  socket.on("room_enter", (room) => {
    if (socket.rooms.size > 1) {
      console.log(`socket ${socket.id} is already in room.`)
      console.log(socket.rooms)
      socket.emit("error", "이미 다른 방에 참가중입니다.")
      return
    }

    enterRoom(socket, room.name)
  })

  // socket.on("nick_name", (obj) => {
  //   const { id, nickName, roomName } = obj
  //   if (roomData[roomName]) {
  //     roomData[roomName] = [...roomData[roomName], { id, nickName }]
  //   }
  //   io.to(roomName).emit("player_list", roomData[roomName])
  // })

  socket.on("nick_name", (obj) => {
    const { id, nickName, name, password, people } = obj
    if (nickNameList.find((nick) => nick === nickName)) {
      socket.emit("error", `이미 존재하는 닉네임입니다.`)
    } else {
      nickNameList.push(nickName)
      playerList.push({ id, nickName })
      if (password) {
        //방 만들때
        socket.emit("nick_name_ok", { name, password, people })
      } else {
        //방에 입장할때
        socket.emit("nick_name_ok")
      }
    }
  })

  // 방입장이 패스워드 체크
  socket.on("pw_check", (room) => {
    console.log("pw_check roomListWithPw :::::")
    console.log(roomListWithPw.filter((r) => r.name === room.name)[0])
    let currRoom = roomListWithPw.filter((r) => r.name === room.name)[0]
    if (currRoom && currRoom.password === room.password) {
      socket.emit("pw_check_ok")
    } else {
      socket.emit("error", "비밀번호가 틀렸습니다.")
    }
  })
})

server.listen(port, function () {
  console.log(`✅ listening on port ${port}`)
})
