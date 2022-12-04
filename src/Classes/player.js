import ship1 from './../img/ship1.png'
import ship2 from './../img/ship2.png'
import ship3 from './../img/ship3.png'
import Ship from './Ship'
const ships = [ship1, ship2, ship3]

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

let scale = 0.30;
if (innerWidth < 500) {
    scale = 0.20
}
export default class Player extends Ship {
    constructor(shipNum) {
        super({ img: ships[shipNum], color: "orange", scale: scale })
        this.rotation = 0;
    }

    draw() {
        c.save()
        c.globalAlpha = this.opacity
        c.translate(
            this.position.x + this.width / 2,
            this.position.y + this.height / 2
        );
        c.rotate(this.rotation);
        c.translate(
            -this.position.x - this.width / 2,
            -this.position.y - this.height / 2
        );

        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        c.restore();
    }
    updateRotation(rotation) {
        this.rotation = rotation
    }
}