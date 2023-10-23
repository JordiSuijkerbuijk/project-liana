function randomNoise(canvas, x, y, width, height, alpha) {
  x = x || 0;
  y = y || 0;
  width = width || canvas.width;
  height = height || canvas.height;
  alpha = alpha || 255;
  var g = canvas.getContext("2d"),
      imageData = g.getImageData(x, y, width, height),
      random = Math.random,
      pixels = imageData.data,
      n = pixels.length,
      i = 0;
  while (i < n) {
      pixels[i++] = pixels[i++] = pixels[i++] = (random() * 256) | 0;
      pixels[i++] = alpha;
  }
  g.putImageData(imageData, x, y);
  return canvas;
}

export default function perlinNoise() {
  const canvas = document.getElementById('canvas');
  canvas.width = 5000;
  canvas.height = 5000;

  let noise = randomNoise(canvas);
  var g = canvas.getContext("2d");
  g.save();
  
  /* Scale random iterations onto the canvas to generate Perlin noise. */
  for (var size = 25; size <= noise.width; size *= 25) {
      var x = (Math.random() * (noise.width - size)) | 0,
          y = (Math.random() * (noise.height - size)) | 0;
      g.globalAlpha = 25 / size;
      g.drawImage(noise, x, y, size, size, 0, 0, canvas.width, canvas.height);
  }

  g.restore();
  return canvas;
}


// let canvas;
// let ctx;
// let circle;
// let circle2;
// let circle3;

// export default function init () {
//   canvas = document.getElementById('canvas');
//   ctx = canvas.getContext('2d');
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
//   circle = new Circle(ctx, canvas.width, canvas.height);
//   circle2 = new Circle(ctx, canvas.width, canvas.height);
//   circle3 = new Circle(ctx, canvas.width, canvas.height);
//   circle.animate("green");

//   setTimeout(circle2.animate("orange"), 1000);
// }

// window.addEventListener('resize', function() {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
//   circle = new Circle(ctx, canvas.width, canvas.height);
//   circle2 = new Circle(ctx, canvas.width, canvas.height);
//   circle3 = new Circle(ctx, canvas.width, canvas.height);
//   circle.animate("green");

//   setTimeout(circle2.animate("orange"), 1000);
// })

// const mouse = {
//   x: 0,
//   y: 0,
// }

// window.addEventListener('mousemove', function(e) {
  
//   mouse.x = e.x;
//   mouse.y = e.y
// })

// class Circle {
//   #ctx;
//   #width;
//   #height;

//   constructor(ctx, width, height) {
//     this.#ctx = ctx;
//     this.#width = width;
//     this.#height = height;
//     this.x = 0;
//     this.y = 0;
//   }

//   #draw(x, y, color) {
//     this.#ctx.beginPath();
//     this.#ctx.arc(x, y, 50, 0, 2 * Math.PI);
//     this.#ctx.stroke();
//     this.#ctx.fillStyle = color;
//     this.#ctx.fill();
//   }

//   animate(color) {
//     this.#ctx.clearRect(0, 0, this.#width, this.#height);
//     this.#draw(mouse.x, mouse.y, color)
//     requestAnimationFrame(this.animate.bind(this));
//   }
// }
