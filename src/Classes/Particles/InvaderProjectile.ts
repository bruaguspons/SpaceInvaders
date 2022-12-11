import { SpaceValuesPosition } from "../types/SpaceValues";
import Particle from "./Particle";
const canvas = document.querySelector("canvas");
const c = canvas!.getContext("2d");


export default class InvaderProjectile extends Particle {
    private width: number
    private height: number
    constructor({ position, velocity, color }: { position: SpaceValuesPosition, velocity: SpaceValuesPosition, color: string }) {
        super({ position, velocity, color })
        this.width = 8;
        this.height = 12;
    }
    draw() {
        const [x, y] = super.getPosition()
        c!.beginPath();
        c!.moveTo(x - this.width, y);
        c!.lineTo(x + this.width, y);
        c!.lineTo(x, y + this.height);
        c!.closePath();
        c!.fillStyle = super.getColor();
        c!.fill();

    };
    updateInvaderProjectile() {
        this.draw()
        super.update()
    }
    getDimentions() {
        return [this.width, this.height]
    }
}