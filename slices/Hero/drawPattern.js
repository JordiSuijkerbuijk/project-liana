// let canvas;
// let ctx;
// let pattern;

// export default function initPattern () {
//   canvas = document.getElementById('canvas');
//   ctx = canvas.getContext('2d');
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
//   pattern = new Pattern(ctx, canvas.width, canvas.height);
//   pattern.draw();
// }

// window.addEventListener('resize', function() {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
  

//   setTimeout(circle2.animate("orange"), 1000);
// })

// class Pattern {
//   #ctx;
//   #width;
//   #height;

//   constructor(ctx, width, height) {
//     this.#ctx = ctx;
//     this.#width = width;
//     this.#height = height;
//     this.x = 0;
//     this.y = 0;
//     this.#ctx.fillStyle = "#f2f2f2"
//     this.#ctx.globalAlpha = 0.25;
//   }

//   draw(x, y) {
//     this.#ctx.clearRect(0, 0, canvas.width, canvas.height)
//     this.#ctx.beginPath();
    
//     ;
//     for (var x = 15; x < canvas.width; x+=34) {
//       for (var y = 15; y < canvas.height; y+=34) {
//         this.#ctx.fillRect(x, y, 2, 2);
//       }
//   }
//   }
// }