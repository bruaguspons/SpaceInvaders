import InvaderImg from './img/invader.png'
import InvaderProjectile from './InvaderProjectile';
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

let scale = 1;
if (innerWidth < 500) {
    scale = 0.8
}

export default class Invader {
    constructor({ position }) {

        this.velocity = {
            x: 0,
            y: 0
        };
        this.color = "red"
        const image = new Image();
        image.src = InvaderImg;
        image.onload = () => {
            this.width = image.width * scale;
            this.height = image.height * scale;
            this.image = image;
            this.position = {
                x: position.x,
                y: position.y
            };
        };
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update({ velocity }) {
        if (this.image) {
            this.draw();
            this.position.x += velocity.x;
            this.position.y += velocity.y;
        }
    }
    shoot(invaderProjectiles) {
        invaderProjectiles.push(new InvaderProjectile({
            position: {
                x: this.position.x + (this.width / 2),
                y: this.position.y + this.height
            },
            velocity: {
                x: 0,
                y: 5
            }
        }))
    }

}