import { SpaceValuesPosition } from "./types/SpaceValues";

const canvas = document.querySelector("canvas");
const c = canvas!.getContext("2d");
export default class InvaderProjectile {
    private position: SpaceValuesPosition
    private velocity: SpaceValuesPosition
    private color: string
    private width: number
    private height: number
    constructor({ position, velocity, color }: { position: SpaceValuesPosition, velocity: SpaceValuesPosition, color: string }) {
        this.position = position;
        this.velocity = velocity;
        this.color = color
        this.width = 8;
        this.height = 12;
    }
    draw() {
        c!.beginPath();
        c!.moveTo(this.position.x - this.width, this.position.y);
        c!.lineTo(this.position.x + this.width, this.position.y);
        c!.lineTo(this.position.x, this.position.y + this.height);
        c!.closePath();
        c!.fillStyle = this.color;
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
    getDimentions() {
        return [this.width, this.height]
    }
}