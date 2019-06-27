console.log('Hi Ballz');

//creating a canvas and setting its size based on window size; canvas rendering context
let canvas = document.getElementById('ball-canvas');

canvas.width = window.innerWidth - 30;
canvas.height = window.innerHeight - 30;
canvas.margin = 0;
canvas.padding = 0;

const ctx = canvas.getContext('2d');

//checking if window has been resized, resizing canvas accordingly
function adjustCanvasSize() {
  if (window.innerWidth != canvas.width + 30 || window.innerHeight != canvas.height + 30) {
    canvas.width = window.innerWidth - 30;
    canvas.height = window.innerHeight - 30;
  }
}

window.addEventListener('resize', adjustCanvasSize);


//custom ball colors and gradient shades
const ballColors = 
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
//current mouse click position
let clickX = 0;
let clickY = 0;

function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect()
  clickX = event.clientX - rect.left
  clickY = event.clientY - rect.top
  // prints the mouse click coordinates
  console.log("x: " + clickX + " y: " + clickY);
}

let activeBalls = [];

//creates a new ball object on click and adds it to the activeBalls list
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
    this.fireVelocity = 10; //Math.random() * 10;
    this.x = x;
    this.y = y;
    //delta x & delta y; firing at random directions
    this.dx = (Math.random() * 2 - 1); //* this.fireVelocity;
    this.dy = (Math.random() * 2 - 1); //* this.fireVelocity;
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


function animate() {
  console.log("Animating");

  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //iterating through the active balls list; drawing a ball on the canvas and adding movement for each
  activeBalls.forEach( function(aBall) {

    aBall.draw();

    aBall.x += aBall.dx;
    aBall.y += aBall.dy;
    
    if (aBall.y + aBall.radius >= canvas.height) {
      aBall.dy = -aBall.dy;
    } else {
      aBall.dy += 1;
    }

    // if (aBall.y + aBall.radius > canvas.height || aBall.y - aBall.radius < 0) {
    //   console.log("Don't-push-me-'cause-I'm-close-to-the-edge")
    //   aBall.dy = -aBall.dy;
    // }  

    if (aBall.x + aBall.radius > canvas.width || aBall.x - aBall.radius < 0) {
      console.log("I'm-try-ing-not-to-lose-my-head")
      aBall.dx = -aBall.dx;
    }  

    if (aBall.y - aBall.radius < 0) { //aball.y + aball.radius > canvas.height || 
      aBall.dy = -aBall.dy;
    }

  });
  };


animate();



//https://burakkanber.com/blog/modeling-physics-javascript-gravity-and-drag/
