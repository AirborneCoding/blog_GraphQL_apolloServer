const { Server } = require("socket.io");

const io = new Server({
    cors: {
        origin: "http://localhost:5173"
    }
});

io.on("connection", (socket) => {

    console.log("someone has connected")

    socket.on("disconnect", () => {
        console.log("someone left");
    });
});

module.exports = io;
