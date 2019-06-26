console.log('Hi Ballz');

//creating a canvas and setting its size based on window size; canvas rendering context
let canvas = document.getElementById('ball-canvas');

canvas.width = window.innerWidth - 30;
canvas.height = window.innerHeight - 30;
canvas.margin = 0;
canvas.padding = 0;


const ctx = canvas.getContext('2d');

//custom ball colors and gradient shades
const ballColors = 
  //   [
  //     ('#067f71', '#51e2d2'), //blue-green
  //     ('#ffa221', '#ffce8c'), //yellow
  //     ('#e138ff', '#f4b7ff'), //pink
  //     ('#14ebff', '#a3f7ff'), //neon-blue
  //     ('#d7ff28', '#edffa3'), //neon-green
  //     ('#823fff', '#cbafff'), //purple
  //     ('#ff1c3a', '#ff9eaa'), //reddish
  //     ('#ff793f', '#f9ad8b') //orange
  // ]

  [
    {'name': 'blueGreen', 'hexCode': ['#067f71', '#51e2d2']},
    {'name': 'yellow', 'hexCode': ['#ffa221', '#ffce8c']},
    {'name': 'pink', 'hexCode': ['#e138ff', '#f4b7ff']},
    {'name': 'neonBlue', 'hexCode': ['#14ebff', '#a3f7ff']},
    {'name': 'neonGreen','hexCode': ['#d7ff28', '#edffa3']},
    {'name': 'purple', 'hexCode': ['#823fff', '#cbafff']},
    {'name': 'reddish', 'hexCode': ['#ff1c3a', '#ff9eaa']},
    {'name': 'orange', 'hexCode': ['#ff793f', '#f9ad8b']}
  ];

console.log(ctx);
//mouse click position
let clickX = 0;
let clickY = 0;

function adjustCanvasSize() {
  //checks if window has been resized, resizes and resets canvas
  if (window.innerWidth != canvas.width + 30 || window.innerHeight != canvas.height + 30) {
    canvas.width = window.innerWidth - 30;
    canvas.height = window.innerHeight - 30;
  }
}

function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect()
  clickX = event.clientX - rect.left
  clickY = event.clientY - rect.top
  // prints the mouse click coordinates
  console.log("x: " + clickX + " y: " + clickY);
}

//adjust canvas size to fit window size
window.addEventListener('resize', adjustCanvasSize);

canvas.addEventListener('mousedown', function(e) {
  getCursorPosition(canvas, e);
  activeBalls.push(new Ball(clickX, clickY));
  console.log(activeBalls, "ACTIVE BALLS");
});

class Ball {

  constructor(x, y){
    this.radius = Math.random() * 100;
    let randomColor = ballColors[Math.floor(Math.random() * ballColors.length)];
    this.color = randomColor;
    console.log(this.color)
    this.fireAngle = Math.random() * 360;
    this.fireVelocity = Math.random();
    this.x = x;
    this.y = y;
    this.dx = 10 * this.fireVelocity;
    this.dy = 10 * this.fireVelocity;
  }

  draw () {
    //drawing a circle:
    ctx.beginPath();
    //ARC: x coordinate, y coordinate; r; 0 to 2pi radians = full circle
    let r = this.radius;
    ctx.arc(this.x, this.y, r, 0, 2 * Math.PI);
    //gradient, fill
    const grad = ctx.createRadialGradient(this.x, this.y, r, this.x-r/2, this.y-r/2, r/10);
    grad.addColorStop(0, this.color['hexCode'][0]);
    grad.addColorStop(1, this.color['hexCode'][1]);
    ctx.fillStyle = grad;
    ctx.fill();
  }

  //ball drops to the floor
  drop () {
    // if(this.y < canvas.height-this.radius){
      this.x = this.x;
      this.y += 10;
    // }  
  }
  
  bounceOffFloor () {
    if(this.y > this.radius){
      this.y = this.y - 10;
    }  
  }
  
  bounce () {
    // this.drop();
    this.bounceOffFloor();
  }

  fire () {
    this.x -= this.fireVelocity * 0.5;
    this.y -= this.fireVelocity * 0.5;
  }

}

let activeBalls = [];

function animate() {
  console.log("Animating");
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  activeBalls.forEach( function(aball) {
    aball.draw();
    //aball.fire();
    console.log("ABALLXY", aball.x, aball.y)
    aball.x += aball.dx;
    aball.y += aball.dy;
    if (aball.y + aball.radius > canvas.height || aball.y - aball.radius <0) {
      aball.dy = -aball.dy;
    }
    if (aball.x + aball.radius > canvas.width || aball.x - aball.radius < 0) {
      aball.dx = -aball.dx;
    }  
    //   if (aball.y + aball.radius > canvas.height || aball.y + aball.radius < 0) {
    //     aball.dy = -aball.dy;
    //   }
    // }
    // if (aball.x + aball.radius <= 0 || aball.y + aball.radius <= 0) {
    //   console.log("DON'T PUSH ME 'CAUSE I'M CLOSE TO THE EDGE");
    //   aball.x = aball.x;
    //   aball.y = aball.x * Math.tan(90);
    // } else {
    //   aball.fire();
    // }
  });
  };


  //     bal[i].y += bal[i].dy;
//     bal[i].x += bal[i].dx;
//     if (bal[i].y + bal[i].radius >= ty) {
//       bal[i].dy = -bal[i].dy * grav;
//     } else {
//       bal[i].dy += bal[i].vel;
//     }    
//     if(bal[i].x + bal[i].radius > tx || bal[i].x - bal[i].radius < 0){
//         bal[i].dx = -bal[i].dx;
//     }
animate();



//Ball Creator, the god of balls
// function createBall(clickX, clickY) {

//   // creating a ball object
//   ballObj = new Ball();
//   console.log(ballObj);

//   return ballObj;
//   };



// function animate() {    
//   if (tx != window.innerWidth || ty != window.innerHeight) {
//     tx = window.innerWidth;
//     ty = window.innerHeight;
//     canvas.width = tx;
//     canvas.height = ty;
//   }
//   requestAnimationFrame(animate);
//   c.clearRect(0, 0, tx, ty);
//   for (var i = 0; i < bal.length; i++) {
//     bal[i].update();
//     bal[i].y += bal[i].dy;
//     bal[i].x += bal[i].dx;
//     if (bal[i].y + bal[i].radius >= ty) {
//       bal[i].dy = -bal[i].dy * grav;
//     } else {
//       bal[i].dy += bal[i].vel;
//     }    
//     if(bal[i].x + bal[i].radius > tx || bal[i].x - bal[i].radius < 0){
//         bal[i].dx = -bal[i].dx;
//     }
//     if(mousex > bal[i].x - 20 && 
//       mousex < bal[i].x + 20 &&
//       mousey > bal[i].y -50 &&
//       mousey < bal[i].y +50 &&
//       bal[i].radius < 70){
//         //bal[i].x += +1;
//         bal[i].radius +=5; 
//       } else {
//         if(bal[i].radius > bal[i].startradius){
//           bal[i].radius += -5;
//         }
//       }
      
//     //forloop end
//     }
// //animation end
// }





//moving css ball through button
// function myMove() {
//   var elem = document.getElementById('ball');   
//   var pos = 0;
//   var id = setInterval(frame, 10);
//   function frame() {
//     if (pos == y) {
//       console.log("pos", canvas.clientHeight)
//       clearInterval(id);
//     } else {    
//       pos++; 
//       elem.style.top = pos + 'px'; 
//       elem.style.left = pos + 'px'; 
//     }
//   }
// }

// function Ball() {
//   //this.color = randomColor();
//   this.radius = Math.random() * 100;
//   this.startradius = this.radius;
//   this.x = Math.random() * (x - this.radius * 2) + this.radius;
//   this.y = Math.random() * (y - this.radius);
//   this.dy = Math.random() * 2;
//   this.dx = Math.round((Math.random() - 0.5) * 10);
//   this.vel = Math.random() /5;
//   this.update = function() {
//     ctx.beginPath();
//     ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
//     ctx.fillStyle = this.color;
//     ctx.fill();
//   };
// }

// var bal = [];
// for (var i=0; i<50; i++){
//     bal.push(new Ball());
// }
