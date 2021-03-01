const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const senti = require("sentiment");
const path = require("path");

const app = express();
const sen = new senti();
const public = path.join(__dirname, "./public");
var senti_score = 0;
var totms = 0;

setInterval(() => {
  senti_score = 0;
  totms = 0;
}, 1000 * 60 * 60 * 24); // reset aggregates after a day

app.use(express.static(public));

const server = http.createServer(app);
const io = new Server(server);

function review_sentiment(review) {
  return sen.analyze(review).score;
}

function getSenBracket() {
  if (senti_score > 0 && senti_score < 3) {
    return 1;
  } else if (senti_score < 0 && senti_score > -3) {
    return -1;
  } else if (senti_score <= -3) {
    return -2;
  } else if (senti_score >= 3) {
    return 2;
  } else {
    return 0;
  }
}

io.on("connection", (socket) => {
  socket.emit("mood", getSenBracket());

  socket.on("message", (data) => {
    prev_sum = senti_score * totms;
    totms = totms + 1;
    senti_score = (senti_score * totms + review_sentiment(data)) / totms;
    console.log(senti_score);

    socket.broadcast.emit("message", data);
    io.emit("mood", getSenBracket());
  });
});

server.listen(80, () => {
  console.log("server is up and running on port 80");
});
