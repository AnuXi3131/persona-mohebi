import Toastify from "toastify-js";

const audio = new Audio("./audios/discord-notification.mp3");

function toast(msg, type) {
  audio.currentTime = 0;
  audio.play();

  document.querySelectorAll(".toastify").forEach((item) => {
    item.remove();
  });

  Toastify({
    text: msg,
    duration: 3000,
    gravity: "top",
    position: "right",
    className: type,
  }).showToast();
}

export default toast;
