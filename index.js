const express = require("express");
const http = require('http').createServer()
const bodyParser = require("body-parser");

const io = require('socket.io')(http, {
    cors: {origin: "*"}
});
console.log("live-poll-backend express")
console.time()
const app = express();
const product = require("./api/product");

app.use(express.json({ extended: false }));
app.use(bodyParser.json());

app.get("/credits", (req, res) => {
    res.send("live-poll-backend express boilerplate from https://github.com/hatuanem199801/express-vercel ")
})

app.get("/api", (req, res) => {
    res.send("API for live-poll-backend")
})

app.post("/api/post/response", (req, res) => {
    console.log(JSON.parse(req.body));
    res.send("OK").status(200);    
}
)
app.post("/socket/:id", (req, res) => {
    const id = req.params.id
    var data = JSON.stringify(req.body)
    console.log(`Sending message ${data} to ${id}`)
    io.to(id).emit('message', data)
    res.send(`Sent message ${data} to ${id}`).status(200)
})

app.post("/test/:id", (req, res) => {
    const now = new Date();
    const options = { timeZone: 'Asia/Kolkata' };
    const time = now.toLocaleString('en-IN', options);
    
    console.log(`Received message from ${req.params.id} at ${time}`)
    console.log(req.body)
    res.send("OK").status(200)
})

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', (msg) => {
        console.log('Added new connection to the room ' + msg)
        console.log(msg);
        socket.join(msg)
        console.log(socket.id)
    });
    socket.on('disconnect', () => {
        console.log("user disconnected")
    })
});

http.listen(3000, () => console.log('Websocket ws://localhost:8080'))
app.listen(8080, () => console.log(`Server is running in port ${PORT}`));
