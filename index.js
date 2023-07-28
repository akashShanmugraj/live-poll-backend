const express = require("express");
const app = express();
const product = require("./api/product");

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
    res.send("live-poll-backend express boilerplate from https://github.com/hatuanem199801/express-vercel ")
})

app.get("/api", (req, res) => {
    res.send("API for live-poll-backend")
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
