const socket = io();

const t_box = document.getElementById("t-box");
const text_display = document.getElementById("text-display");
const audio = document.querySelector("audio");
const audioDic = {
  "-2": "/hind.mp3",
  "-1": "/th_siren.mp3",
  0: "/ocean.mp3",
  1: "/h.mp3",
  2: "/h.mp3",
};
const colourDic = {
  "-2": "rgba(0,0,0, 0.9)",
  "-1": "rgba(255, 0, 0, 0.6)",
  0: "rgba(0, 185, 255, 0.3)",
  1: "wheat",
  2: "wheat",
};

particlesJS("particles-js", objs[0]);
var mood = -5;
const particlesJs = document.getElementById("particles-js");
particlesJs.style.backgroundColor = colourDic[mood];

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
    particlesJs.style.background = colourDic[mood];
    audio.src = audioDic[mood];
    audio.play();
    particlesJS("particles-js", objs[mood]);
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
