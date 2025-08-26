const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
let confetti = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createConfetti(x, y) {
  for (let i = 0; i < 100; i++) {
    confetti.push({
      x: x,
      y: y,
      size: Math.random() * 8 + 2,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      speedX: (Math.random() - 0.5) * 10,
      speedY: (Math.random() - 1.5) * 10,
      gravity: 0.3,
      alpha: 1,
    });
  }
}

function updateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = confetti.length - 1; i >= 0; i--) {
    const c = confetti[i];
    c.x += c.speedX;
    c.y += c.speedY;
    c.speedY += c.gravity;
    c.alpha -= 0.01;
    if (c.alpha <= 0) {
      confetti.splice(i, 1);
      continue;
    }
    ctx.globalAlpha = c.alpha;
    ctx.fillStyle = c.color;
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(updateConfetti);
}
updateConfetti();

document.addEventListener("click", (e) => {
  createConfetti(e.clientX, e.clientY);
});

document.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  createConfetti(touch.clientX, touch.clientY);
});
