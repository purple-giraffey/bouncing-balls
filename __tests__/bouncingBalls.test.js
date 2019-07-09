const { setCanvasSize, randomColor, Ball, ballColors, activeBalls, bounce } = require("../scripts/bouncingBalls.js");
const { canvas } = require("../scripts/bouncingBalls.js");
const { ctx } = require("../scripts/bouncingBalls.js");

//custom matcher, checks if the result is a part of an array
expect.extend({
    toBeIn(received, array) {
      const pass = array.includes(received);
      if (pass) {
        return {
          message: () =>
            `expected ${received} to be a part of ${array}`,
          pass: true,
        };
      } else {
        return {
          message: () =>
            `expected ${received} not to be a part of ${array}`,
          pass: false,
        };
      }
    },
  });

describe("Data tests", () => {

    it("should set canvas size to equal custom values", () => {
        setCanvasSize(100, 80, 15, 10);
        expect(canvas.width).toBe(70);
        expect(canvas.height).toBe(50);
        expect(canvas.margin).toBe(15);
        expect(canvas.padding).toBe(10);
    });

    it("should throw an error for values out of range", () => {
      expect(() => {setCanvasSize(10, 10, 150, 150)}).toThrow();
    })

    it("should check if the return value of randomColor belongs to the ballColors array", () => {
        expect(randomColor()).toBeIn(ballColors);
    });

    it("should return a new instance of the Ball class", () => {
        expect(new Ball()).toBeInstanceOf(Ball);
    });

    it("should set the passed values onto a new instance of the Ball class", () => {
      let ball = new Ball(10,15);
      expect(ball.x).toBe(10);
      expect(ball.y).toBe(15);
    })

    it("shouldn't throw an error when the ball.draw() method is called on a new ball instance with valid x and y values", () => {
        let aBall = new Ball;
        expect(() => {ball.draw()}).toThrow();
        aBall.x = 10;
        aBall.y = 15;
        expect(() => {aBall.draw()}).not.toThrow();
        aBall.x = "a";
        expect(() => {aBall.draw()}).toThrow();
    });

    it("shouldn't throw an error in the bounce function", () => {
        activeBalls.push(new Ball(20, 20));
        expect(() => { bounce()}).not.toThrow();
    });

    it("should check if the ball's position is inside of the canvas when it bounces", () => {
        let aBall = new Ball(30, 30)
        activeBalls.push(aBall);
        bounce();
        expect(aBall.x).toBeGreaterThanOrEqual(aBall.radius);
        expect(aBall.x).toBeLessThanOrEqual(canvas.width - aBall.radius);
        expect(aBall.y).toBeGreaterThanOrEqual(aBall.radius);
        expect(aBall.y).toBeLessThanOrEqual(canvas.height - aBall.radius);
    });

    it("shouldn't throw an error when the ball.stickToFloor() method is called", () => {
      let aBall = new Ball(10, 10);
      expect(() => { aBall.stickToFloor()}).not.toThrow();
    });

    it("should set the ball position to bottom of canvas", () => {
      let aBall = new Ball(10, 10);
      aBall.stickToFloor();
      expect(aBall.y).toBe(canvas.height - aBall.radius);
    });

    it("should check if ball has stopped moving 50 seconds after the bounce() function is called", () => {
      let aBall = new Ball(20,20);
      activeBalls.push(aBall);
      //the bounce() function is called
      bounce();
      //checking that the ball is not moving after 50 seconds (arbitrary but enough for any ball to have stopped; not an optimal solution)
      setTimeout(() => expect(aBall.dy, aBall.dx).toBe(0), 50000);
      setTimeout(() => expect(aBall.y).toBe(canvas.height - bBall.radius), 50000);
    });

});