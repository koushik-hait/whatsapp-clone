const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require('cors')

const port = process.env.PORT || 5000;
app.use(cors())

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        method: ["GET", "POST"],
    }
});



// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

io.on('connection', (socket) => {
  // console.log(`User connected ${socket.id}`);

  socket.on("chat", (data) => {
    // console.log(data);
    // socket.broadcast.emit("chat", data);
    io.to(data.userid).emit("chat", data);
  })

  socket.emit("me", socket.id);

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});
});

server.listen(port, () => {
  console.log(`Server listening on PORT: ${port}`);
});