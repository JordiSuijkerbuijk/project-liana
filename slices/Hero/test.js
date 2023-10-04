let canvas;
let ctx;
let circle;
let circle2;
let circle3;

export default function init () {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  circle = new Circle(ctx, canvas.width, canvas.height);
  circle2 = new Circle(ctx, canvas.width, canvas.height);
  circle3 = new Circle(ctx, canvas.width, canvas.height);
  circle.animate("green");

  setTimeout(circle2.animate("orange"), 1000);
}

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  circle = new Circle(ctx, canvas.width, canvas.height);
  circle2 = new Circle(ctx, canvas.width, canvas.height);
  circle3 = new Circle(ctx, canvas.width, canvas.height);
  circle.animate("green");

  setTimeout(circle2.animate("orange"), 1000);
})

const mouse = {
  x: 0,
  y: 0,
}

window.addEventListener('mousemove', function(e) {
  
  mouse.x = e.x;
  mouse.y = e.y
})

class Circle {
  #ctx;
  #width;
  #height;

  constructor(ctx, width, height) {
    this.#ctx = ctx;
    this.#width = width;
    this.#height = height;
    this.x = 0;
    this.y = 0;
  }

  #draw(x, y, color) {
    this.#ctx.beginPath();
    this.#ctx.arc(x, y, 50, 0, 2 * Math.PI);
    this.#ctx.stroke();
    this.#ctx.fillStyle = color;
    this.#ctx.fill();
  }

  animate(color) {
    this.#ctx.clearRect(0, 0, this.#width, this.#height);
    this.#draw(mouse.x, mouse.y, color)
    requestAnimationFrame(this.animate.bind(this));
  }
}
