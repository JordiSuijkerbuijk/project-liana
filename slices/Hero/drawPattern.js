export default function initPattern2 () {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const ball = new Ball(ctx, canvas.width, canvas.height, '#c295d8');
  const ball2 = new Ball(ctx, canvas.width, canvas.height, '#c295d8');
  const ball3 = new Ball(ctx, canvas.width, canvas.height, '#c295d8');
  const ball4 = new Ball(ctx, canvas.width, canvas.height, '#c295d8');

  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  })

  ball.draw();
  ball2.draw();
  ball3.draw();
  ball4.draw();

  // update(ctx, ball, endX, endY, canvas.width, canvas.height);
  update(ctx, [ball, ball3, ball2, ball4 ], canvas.width, canvas.height);
  // update(ctx, ball3, endX, endY, canvas.width, canvas.height);
}

function update(context, balls, width, height) {
  context.clearRect(0, 0, width, height);
  for (let i = 0; i < balls.length; i++) {
    if (Math.ceil(balls[i].x) == balls[i].endX || Math.floor(balls[i].x) == balls[i].endX) {
      balls[i].endX = getRandomInt(width, 0)
    }

    if (Math.ceil(balls[i].y) == balls[i].endY || Math.floor(balls[i].y) == balls[i].endY) {
      balls[i].endY = getRandomInt(height, 0)
    }

    if (Math.ceil(balls[i].radius) == balls[i].endRadius || Math.floor(balls[i].radius) == balls[i].endRadius) {
      balls[i].endRadius = getRandomInt(200, 150);
    }

    if (balls[i].opacity == balls[i].endOpacity) {
      balls[i].endOpacity = Math.min(0.25, Math.random());
    }

    balls[i].draw();
    balls[i].opacity = lerp(balls[i].opacity, balls[i].endOpacity, 0.1);
    balls[i].x = balls[i].x > balls[i].endX ? balls[i].x - 0.15 : balls[i].x + 0.15;
    balls[i].y = balls[i].y > balls[i].endY ? balls[i].y - 0.15 : balls[i].y + 0.15;
    balls[i].radius = lerp(balls[i].radius, balls[i].endRadius, 0.003)
}
  requestAnimationFrame(() => update(context, balls, width, height));
}

function getRandomInt(max, min = 50) {
  return Math.max(min, Math.floor(Math.random() * max));
}

function lerp(min, max, fraction) {
  return (max - min) * fraction + min;
}

class Ball {
  ctx;
  width;
  height;
  fillColor;

  constructor(ctx, width, height, fill) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.x = getRandomInt(width, -200);
    this.y = getRandomInt(height, -200);
    this.radius = getRandomInt(200,150);
    this.fillColor = fill;
    this.endX = getRandomInt(width, -200); 
    this.endY = getRandomInt(height, -200); 
    this.endRadius = getRandomInt(200, 150);
    this.opacity = 0.25
    this.endOpacity = Math.min(0.25, Math.random());
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.fillColor;
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    this.ctx.globalAlpha = this.opacity;
    this.ctx.fill();
  }
}


// export default function initPattern2 () {
//   const canvas = document.getElementById('canvas');
//   const ctx = canvas.getContext('2d');
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;

//   const ball = new Ball(ctx, canvas.width, canvas.height, '#c295d8');
//   const ball2 = new Ball(ctx, canvas.width, canvas.height, '#c295d8');
//   const ball3 = new Ball(ctx, canvas.width, canvas.height, '#c295d8');
//   const ball4 = new Ball(ctx, canvas.width, canvas.height, '#c295d8');

//   window.addEventListener('resize', function() {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//   })

//   ball.draw();
//   ball2.draw();
//   ball3.draw();
//   ball4.draw();

//   // update(ctx, ball, endX, endY, canvas.width, canvas.height);
//   update(ctx, [ball, ball3, ball2, ball4 ], canvas.width, canvas.height);
//   // update(ctx, ball3, endX, endY, canvas.width, canvas.height);
// }

// function update(context, balls, width, height) {
//   context.clearRect(0, 0, width, height);
//   for (let i = 0; i < balls.length; i++) {
//     if (Math.ceil(balls[i].x) == balls[i].endX || Math.floor(balls[i].x) == balls[i].endX) {
//       balls[i].endX = getRandomInt(width, -700)
//     }

//     if (Math.ceil(balls[i].y) == balls[i].endY || Math.floor(balls[i].y) == balls[i].endY) {
//       balls[i].endY = getRandomInt(height, -700)
//     }

//     if (Math.ceil(balls[i].width) == balls[i].endWidth || Math.floor(balls[i].width) == balls[i].endWidth) {
//       balls[i].endWidth = getRandomInt(500, 200)
//     }

//     if (Math.ceil(balls[i].height) == balls[i].endHeight || Math.floor(balls[i].height) == balls[i].endHeight) {
//       balls[i].endHeight = getRandomInt(700, 400)
//     }

//     if (balls[i].opacity == balls[i].endOpacity) {
//       balls[i].endOpacity = Math.min(0.25, Math.random());
//     }

//     balls[i].draw();
//     balls[i].opacity = lerp(balls[i].opacity, balls[i].endOpacity, 0.1);
//     balls[i].x = lerp(balls[i].x, balls[i].endX, 0.001)
//     balls[i].y = lerp(balls[i].y, balls[i].endY, 0.001)
//     balls[i].width = lerp(balls[i].width, balls[i].endWidth, 0.001)
//     balls[i].height = lerp(balls[i].height, balls[i].endHeight, 0.001)
//     // balls[i].x = balls[i].x > balls[i].endX ? balls[i].x - 1 : balls[i].x + 1;
//     // balls[i].y = balls[i].y > balls[i].endY ? balls[i].y - 1 : balls[i].y + 1;
//     // balls[i].width = balls[i].width > balls[i].endWidth ? balls[i].width - 0.25 : balls[i].width + 0.25;
//     // balls[i].height = balls[i].height > balls[i].endHeight ? balls[i].height - 0.25 : balls[i].height + 0.25;
// }
//   requestAnimationFrame(() => update(context, balls, width, height));
// }

// function getRandomInt(max, min = 50) {
//   return Math.max(min, Math.floor(Math.random() * max));
// }

// function lerp(min, max, fraction) {
//   return (max - min) * fraction + min;
// }

// class Ball {
//   ctx;
//   width;
//   height;
//   fillColor;

//   constructor(ctx, width, height, fill) {
//     this.ctx = ctx;
//     this.width = width;
//     this.height = height;
//     this.x = getRandomInt(width - 700, -700);
//     this.y = getRandomInt(height - 700, -700);
//     this.fillColor = fill;
//     this.endX = getRandomInt(width - 700, -700); 
//     this.endY = getRandomInt(height - 700, -700);
//     this.opacity = 0.25
//     this.endOpacity = Math.min(0.25, Math.random());
//     this.width = getRandomInt(500, 200);
//     this.endWidth = getRandomInt(700, 400);
//     this.height = getRandomInt(500, 200);
//     this.endHeight = getRandomInt(700, 400);
//   }

//   draw() {
//     this.ctx.beginPath();
//     this.ctx.fillStyle = this.fillColor;
//     this.ctx.roundRect(this.x, this.y, this.width, this.height, 200);
//     this.ctx.globalAlpha = this.opacity;
//     this.ctx.fill();
//   }
// }
