const { Router } = require('express');

const r = Router();

r.get('/', (req, res) => res.send("express boilerplate for live-poll-backend"));

module.exports = r;
