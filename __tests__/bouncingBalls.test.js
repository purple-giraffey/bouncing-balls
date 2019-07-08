const { setCanvasSize, randomColor, Ball, ballColors, activeBalls, bounce } = require("../scripts/bouncingBalls.js");
const { canvas } = require("../scripts/bouncingBalls.js");
const { ctx } = require("../scripts/bouncingBalls.js");

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

    it("should set canvas size to equal custom values & throw error for values out of range", () => {
        setCanvasSize(100, 80, 15, 10);
        expect(canvas.width).toBe(70);
        expect(canvas.height).toBe(50);
        expect(canvas.margin).toBe(15);
        expect(canvas.padding).toBe(10);
        expect(() => {setCanvasSize(10, 10, 150, 150)}).toThrow();
    });

    it("should check if the return value of randomColor belongs to the ballColors array", () => {
        expect(randomColor()).toBeIn(ballColors);
    });

    it("should return a new instance of the Ball class, with the given values", () => {
        expect(new Ball()).toBeInstanceOf(Ball);
        let ball = new Ball(10,15);
        expect(ball.x).toBe(10);
        expect(ball.y).toBe(15);
    });

    it("shouldn't throw an error when the ball.draw() method is called on a new ball instance with valid x and y values", () => {
        let ball = new Ball;
        expect(() => {ball.draw()}).toThrow();
        ball.x = 10;
        ball.y = 15;
        expect(() => {ball.draw()}).not.toThrow();
        ball.x = "a";
        expect(() => {ball.draw()}).toThrow();
    });

    it("should not throw an error in the bounce function", () => {
        activeBalls.push(new Ball(20, 20));
        expect(() => { bounce()}).not.toThrow();
    });

    it("should check if the ball's final position is inside of the canvas when it finishes bouncing", () => {
        let bouncingBall = new Ball(30, 30)
        activeBalls.push(bouncingBall);
        bounce();
        expect(bouncingBall.x).toBeGreaterThanOrEqual(bouncingBall.radius);
        expect(bouncingBall.x).toBeLessThanOrEqual(canvas.width - bouncingBall.radius);
        expect(bouncingBall.y).toBeLessThanOrEqual(canvas.height - bouncingBall.radius);
    });

});