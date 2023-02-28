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

const port = 3001
let roomList = []
io.on("connection", (socket) => {
  console.log("✅ server connected", socket.id)

  // 방 목록 반환
  socket.on("room_list", () => {
    socket.emit("room_list", roomList)
  })

  // 방목록 io.sockets.adapter.rooms
  // 방 유니크 키 io.sockets.adapter.sids
  socket.on("new_room", (formState, cb) => {
    socket.emit("")

    const roomInfo = {
      name: formState.name,
      password: formState.password,
      people: formState.people,
      id: socket.id,
    }
    cb(roomInfo)
    roomList.push(roomInfo)
    io.sockets.emit("room_list", roomList)

    // 방 입장
    const room = roomList.find((room) => room.name == formState.name)

    socket.join(formState.name)
    socket.emit("room_enter", room)
    io.to(formState.name).emit("message", `${socket.id} 님이 입장하셨습니다.`)
  })
  // socket.on("disconnect", () => {
  //   console.log("❌ server disconnected")
  // })
})

server.listen(port, function () {
  console.log(`✅ listening on port ${port}`)
})
