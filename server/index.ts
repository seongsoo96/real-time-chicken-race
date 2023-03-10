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

  socket.join(name)
  socket.emit("room_enter", room)
  console.log("rooms ::::: ")
  console.log(io.sockets.adapter.rooms.get(name))
  // const peopleList = Array.from(io.sockets.adapter.rooms.get(name).values())
  const peopleList = [...io.sockets.adapter.rooms.get(name)]
  io.to(name).emit("people_list", peopleList)
  io.to(name).emit("message", `${socket.id} 님이 입장하셨습니다.`)
}

function getRoom(name) {
  return roomList.find((room) => room.name == name)
}

const port = 3001
let roomList = []
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

    const roomInfo = {
      name: formState.name,
      password: formState.password,
      people: formState.people,
    }

    roomList.push(roomInfo)
    io.sockets.emit("room_list", roomList)

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

  socket.on("nick_name", (obj) => {
    const { id, nickName, roomName } = obj
    roomData[roomName] = [...roomData[roomName], { id, nickName }]
    // io.to(roomName).emit("player_list", roomData[roomName])
    socket.emit("player_list", roomData[roomName])
  })
  // console.log("socket ::::::")
  // socket.join("room1")
  // console.log(socket)
  // // 방 목록 반환
  // socket.on("room_list", (roomList) => {
  //   console.log("3")
  //   if (roomList.length) {
  //     socket.join("room1")
  //     socket.emit("room_list", roomList)
  //   } else {
  //     console.log("4")
  //     socket.emit("room_list", [])
  //   }
  // })

  // console.log("5")
  // // 방목록 io.sockets.adapter.rooms
  // // 방 유니크 키 io.sockets.adapter.sids
  // socket.on("new_room", (formState, cb) => {
  //   socket.emit("")
  //   console.log("6")

  //   const roomInfo = {
  //     name: formState.name,
  //     password: formState.password,
  //     people: formState.people,
  //     id: socket.id,
  //   }
  //   cb(roomInfo)
  //   roomList.push(roomInfo)
  //   io.sockets.emit("room_list", roomList)

  //   // 방 입장
  //   const room = roomList.find((room) => room.name == formState.name)

  //   socket.join(formState.name)
  //   socket.emit("room_enter", room)
  //   io.to(formState.name).emit("message", `${socket.id} 님이 입장하셨습니다.`)
  // })
  // // socket.on("disconnect", () => {
  // //   console.log("❌ server disconnected")
  // // })
})

server.listen(port, function () {
  console.log(`✅ listening on port ${port}`)
})
