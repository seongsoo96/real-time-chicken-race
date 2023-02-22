const app = require("express")()
const server = require("http").createServer(app)
const cors = require("cors")
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
})

const port = 3001

io.on("connection", (socket) => {
  console.log("✅ server connected")
  socket.on("disconnect", () => {
    console.log("❌ server disconnected")
  })
})

server.listen(port, function () {
  console.log(`✅ listening on port ${port}`)
})
