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
  console.log("room::: ", room)
  if (room === undefined) {
    socket.emit("error", "정상적인 방이 아닙니다.")
    return
  }
  // roomData -  {
  //               '방1': [
  //                       {id: '1socket.id', nickName: '닉넴1'}
  //                       {id: '2socket.id', nickName: '닉넴2'}
  //                     ]
  //               '방2': [
  //                       {id: '3socket.id', nickName: '닉넴3'}
  //                       {id: '4socket.id', nickName: '닉넴4'}
  //                     ]
  //             }

  const player = playerList.filter((player) => player.id === socket.id)[0]
  if (roomData[name]) {
    roomData[name] = [...roomData[name], player]
  }
  io.to(name).emit("player_list", roomData[name])

  socket.emit("navigate", name)
  socket.join(name)
  socket.emit("room_enter", room)
  console.log("rooms ::::: ")
  console.log(io.sockets.adapter.rooms.get(name))
  const peopleList = [...io.sockets.adapter.rooms.get(name)]
  io.to(name).emit("people_list", peopleList)
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
    }

    roomList.push(roomInfo)
    roomListWithPw.push({ ...roomInfo, password: formState.password })
    console.log(roomListWithPw)
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

  // socket.on("nick_name", (obj) => {
  //   const { id, nickName, roomName } = obj
  //   if (roomData[roomName]) {
  //     roomData[roomName] = [...roomData[roomName], { id, nickName }]
  //   }
  //   io.to(roomName).emit("player_list", roomData[roomName])
  // })

  socket.on("nick_name", (obj) => {
    const { id, nickName, name, password, people } = obj
    playerList.push({ id, nickName })
    if (password) {
      //방 만들때
      socket.emit("nick_name_ok", { name, password, people })
    } else {
      //방에 입장할때
      socket.emit("nick_name_ok")
    }
  })

  // 방입장이 패스워드 체크
  socket.on("pw_check", (room) => {
    console.log("pw_check roomListWithPw :::::")
    console.log(roomListWithPw.filter((r) => r.name === room.name)[0])
    let currRoom = roomListWithPw.filter((r) => r.name === room.name)[0]
    if (currRoom) {
      socket.emit("pw_check_ok", currRoom.password === room.password)
    }
  })
})

server.listen(port, function () {
  console.log(`✅ listening on port ${port}`)
})
