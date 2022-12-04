import InvaderImgB from './../img/invaderB.svg'
import InvaderImgR from './../img/invaderR.svg'
import InvaderImgG from './../img/invaderG.svg'
import InvaderProjectile from './InvaderProjectile';
import Ship from './Ship';

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const images = new Map()
images.set('blue', InvaderImgB)
images.set('red', InvaderImgR)
images.set('green', InvaderImgG)
let scale = 0.28;
if (innerWidth < 500) {
    scale = 0.2
}
export default class Invader {
    constructor({ position, color }) {
        // super({
        //     position: {
        //         x: position.x,
        //         y: position.y
        //     }, img: images.get(color), color: color, scale: scale
        // })
        this.color = color;
        this.velocity = {
            x: 0,
            y: 0
        };
        this.opacity = 1;
        const image = new Image();
        image.src = images.get(color);
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
    shoot(invaderProjectiles) {
        invaderProjectiles.push(new InvaderProjectile({
            position: {
                x: this.position.x + (this.width / 2),
                y: this.position.y + this.height
            },
            velocity: {
                x: 0,
                y: 5
            },
            color: this.color
        }))
    }
    update({ velocity, opacity, dimentions }) {
        if (this.image) {
            this.draw()
            this.velocity.x = velocity?.x ?? this.velocity.x
            this.velocity.y = velocity?.y ?? this.velocity.y
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y

            this.opacity = opacity ?? this.opacity
            this.width = dimentions?.w ?? this.width
            this.height = dimentions?.h ?? this.height
        }
    }
    getPosition() {
        return [this.position.x, this.position.y]
    }
    getDimentions() {
        return [this.width, this.height]
    }

}