const express = require("express");
const http = require('http').createServer()
const io = require('socket.io')(http, {
    cors: {origin: "*"}
});

const app = express();
const product = require("./api/product");
app.use(express.json({ extended: false }));

app.get("/credits", (req, res) => {
    res.send("live-poll-backend express boilerplate from https://github.com/hatuanem199801/express-vercel ")
})

app.get("/api", (req, res) => {
    res.send("API for live-poll-backend")
})

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', (msg) => {
        console.log(msg);
        io.emit('message', msg);
        console.log(socket.id)
    });
    socket.on('disconnect', () => {
        console.log("user disconnected")
    })
});

const PORT = 3840;
http.listen(8080, () => console.log('Websocket ws://localhost:8080'))
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
