const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
export default class InvaderProjectile {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;

        this.width = 8;
        this.height = 12;
    }
    draw() {
        c.beginPath();
        c.moveTo(this.position.x - this.width, this.position.y);
        c.lineTo(this.position.x + this.width, this.position.y);
        c.lineTo(this.position.x, this.position.y + this.height);
        c.closePath();
        c.fillStyle = "white";
        c.fill();

    };
    update() {
        this.draw();
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}