const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
export default class Particle {
    constructor({ position, velocity, radio, color, fades }) {
        this.position = position;
        this.velocity = velocity;

        this.radio = radio;
        this.color = color;
        this.opacity = 1;
        this.fades = fades;
    }
    draw() {
        c.save();
        c.globalAlpha = this.opacity;
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radio, 0, 2 * Math.PI);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
        c.restore()
    };
    update() {
        this.draw();
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (!this.fades) this.opacity += -0.01

    }
}