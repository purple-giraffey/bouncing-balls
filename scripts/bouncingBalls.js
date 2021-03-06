//creating a canvas and setting its size based on window size; canvas rendering context

let canvas;
let ctx;

function createCanvas() {
  canvas = document.createElement('canvas');
  canvas.id = "ball-canvas";
  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');
}

function setCanvasSize(width, height, margin=0, padding=0) {
  if(width > 30 && height > 30) {
    canvas.width = width - 30;
    canvas.height = height - 30;
    canvas.margin = margin;
    canvas.padding = padding;
  } else {
    throw new RangeError('Parameters not within range!');
  }
}

createCanvas();
setCanvasSize(window.innerWidth, window.innerHeight);

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
    {'name': 'orange', 'hexCode': ['#ff793f', '#f9ad8b']},
    {'name': 'vantaBlack', 'hexCode': ['#000000', '#000000']}
  ];

function randomColor() {
  return ballColors[Math.floor(Math.random() * ballColors.length)];
}

//current mouse click position
let clickX = 0;
let clickY = 0;

function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect()
  clickX = event.clientX - rect.left
  clickY = event.clientY - rect.top
  //mouse click coordinates
  return clickX, clickY;
}

let activeBalls = [];

//creates a new ball object on click and adds it to the activeBalls list
canvas.addEventListener('mousedown', function(e) {
  getCursorPosition(canvas, e);
  activeBalls.push(new Ball(clickX, clickY));
});


class Ball {

  constructor(x, y){
    //the balls are never bigger than the canvas size
    this.radius = Math.random() * (Math.min(canvas.width, canvas.height)/5);
    this.color = randomColor();
    this.fireVelocity = Math.random();
    this.x = x;
    this.y = y;
    this.coefRest = 0.7; //coefficient of restitution, depending on elasticity
    //delta x & delta y; firing at random directions
    this.dx = (Math.random()* 2 - 1) * this.fireVelocity;
    this.dy = (Math.random()* 2 - 1) * this.fireVelocity;
    //this.isActive = true;
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

  stickToFloor() {
    this.dx = 0;
    this.dy = 0;
    this.y = canvas.height - this.radius;
  }
}


function bounce() {

  requestAnimationFrame(bounce);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //iterating through the active balls list; drawing a ball on the canvas and adding movement for each
  activeBalls.forEach( function(aBall) {

    //if (aBall.isActive === true) {
      aBall.draw();

      aBall.x += aBall.dx * 100; //*100 corrects initial firing from gravity's strong effect
      aBall.y += aBall.dy;

    //handles hitting each wall
      if (aBall.y + aBall.radius >= canvas.height) {
        aBall.dy = -aBall.dy * aBall.coefRest;
        aBall.y = canvas.height - aBall.radius;
      } else {
        aBall.dx *= 0.99; //stops the fallen ball's horizontal movement
        aBall.dy += aBall.fireVelocity + 0.09; //adding gravity effect
      }

      if (aBall.y - aBall.radius <= 0) {
        aBall.dy = -aBall.dy * aBall.coefRest;
        aBall.y = aBall.radius + 0.5; //0.5 for ceiling sticking
      } else {
        aBall.dx *= 0.99; //stops the fallen ball's horizontal movement
        aBall.dy += aBall.fireVelocity + 0.09; //adding gravity effect
      }

      if (aBall.x + aBall.radius >= canvas.width) {
        aBall.dx = -aBall.dx * aBall.coefRest;
        aBall.x = canvas.width - aBall.radius;
      }
      
      if(aBall.x - aBall.radius <= 0) {
        aBall.dx = -aBall.dx * aBall.coefRest;
        aBall.x = aBall.radius;
      }

      //ball stops moving, stays at final position and sticks to the floor
      if(Math.abs(aBall.dx) < 0.000001) {
        aBall.stickToFloor();
        return aBall;
      }


      //primitive collision handling, bugged
      //UNCOMMENT THIS SECTION TO UNLOCK BALL INTERACTIONS
      /*
      activeBalls.forEach(function(otherBall) {
        if (aBall === otherBall) {
        } else {
          let xdist = aBall.x - otherBall.x;
          let ydist = aBall.y - otherBall.y;
          let distance = Math.sqrt(xdist * xdist + ydist * ydist);

          if (distance < aBall.radius + otherBall.radius) {
            if (Math.sign(aBall.dx) !== Math.sign(otherBall.dx) && aBall.x !== 0 || aBall.y !== 0) {
              aBall.dx *= -1; //simply change direction if balls collide
              aBall.dy *= -1;
            }
          }
        }
      });
      */
  
  });
  };


bounce();

module.exports = { setCanvasSize, randomColor, canvas, ctx, Ball, ballColors, activeBalls, bounce };