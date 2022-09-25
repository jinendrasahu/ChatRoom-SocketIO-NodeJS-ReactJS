const socketio = require("socket.io");
const app = require("express")();
const http = require("http");
const PORT = 5000;
const server = http.createServer(app);
const io = socketio(server,{
    cors:"*"
});
server.listen(PORT, () => {
    console.log("Server is runing..");
});

let messages = [];
io.on("connection", (socket) => {
    
    socket.on("joined",(data)=>{
        socket.emit("message", messages);
    });
    socket.on("send",(data)=>{
        messages.push(data);
        io.emit("send", data);
    });
})