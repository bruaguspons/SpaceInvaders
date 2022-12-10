import { SpaceValuesPosition } from "./types/SpaceValues";

const canvas = document.querySelector("canvas");
const c = canvas!.getContext("2d");
export default class Projectile {
    private position: SpaceValuesPosition
    private velocity: SpaceValuesPosition
    private radio: number
    constructor({ position, velocity }: { position: SpaceValuesPosition, velocity: SpaceValuesPosition }) {
        this.position = position;
        this.velocity = velocity;

        this.radio = 5;
    }
    draw() {
        c!.beginPath();
        c!.arc(this.position.x, this.position.y, this.radio, 0, 2 * Math.PI);
        c!.closePath();
        c!.fillStyle = "yellow";
        c!.fill();
    };
    update() {
        this.draw();
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
    getPosition() {
        return [this.position.x, this.position.y]
    }
    getRadio() {
        return this.radio
    }
}