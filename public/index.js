const socket = io();

const t_box = document.getElementById("t-box");
const text_display = document.getElementById("text-display");
const audio = document.querySelector("audio");
const audioDic = {
  "-2": "/hind.mp3",
  "-1": "/siren.mp3",
  0: "/h.mp3",
  1: "/h.mp3",
  2: "/h.mp3",
};

var mood = 0;

socket.on("message", (data) => {
  const dv = document.createElement("div");
  dv.className = "text-box";
  const txt = document.createElement("p");
  txt.innerHTML = data;
  txt.className = "m1 mg";
  dv.appendChild(txt);
  text_display.appendChild(dv);
  txt.scrollIntoView();
});

socket.on("mood", (data) => {
  if (mood != data) {
    mood = data;
    console.log(mood);
    audio.src = audioDic[mood];
    audio.play();
  }
});

function message(e) {
  e.preventDefault();
  const dv = document.createElement("div");
  dv.className = "text-box";
  const txt = document.createElement("p");
  txt.innerHTML = t_box.value;
  txt.className = "m2 mg";
  dv.appendChild(txt);
  text_display.appendChild(dv);
  txt.scrollIntoView();
  socket.emit("message", t_box.value);
  t_box.value = "";
}

function checkEnter(event) {
  if (event.keyCode == 13) {
    message(event);
  }
}
