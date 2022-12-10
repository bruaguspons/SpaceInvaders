import InvaderImgB from '../img/invaderB.svg'
import InvaderImgR from '../img/invaderR.svg'
import InvaderImgG from '../img/invaderG.svg'
import InvaderProjectile from './InvaderProjectile';
// import Ship from './Ship';
import { SpaceValuesDimentions, SpaceValuesPosition } from './types/SpaceValues';
const canvas = document.querySelector("canvas");
const c = canvas!.getContext("2d");
const images = new Map()
images.set('blue', InvaderImgB)
images.set('red', InvaderImgR)
images.set('green', InvaderImgG)
let scale = 0.28;
if (innerWidth < 500) {
    scale = 0.2
}
export default class Invader {
    private color: string
    private velocity: SpaceValuesPosition
    private opacity: number
    private width: number = 0
    private height: number = 0
    private position: SpaceValuesPosition = {
        x: 0,
        y: 0
    }
    private image: HTMLImageElement
    constructor({ position, color }: { position: SpaceValuesPosition, color: string }) {
        this.color = color;
        this.velocity = {
            x: 0,
            y: 0
        };
        this.opacity = 1;
        this.image = new Image();
        this.image.src = images.get(color);
        this.image.onload = () => {
            this.width = this.image.width * scale;
            this.height = this.image.height * scale;
            this.position = {
                x: position.x,
                y: position.y
            };
        };
    }

    draw() {
        c!.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
    shoot(invaderProjectiles: InvaderProjectile[]) {
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
    update({ velocity, opacity, dimentions }: { velocity?: SpaceValuesPosition, opacity?: number, dimentions?: SpaceValuesDimentions }) {
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
    getColor() {
        return this.color
    }
}