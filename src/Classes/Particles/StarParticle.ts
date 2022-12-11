import Particle from "./Particle";
import { SpaceValuesPosition } from "../types/SpaceValues";

const canvas = document.querySelector("canvas");
const c = canvas!.getContext("2d");
export default class StarParticle extends Particle {
    constructor({ position, velocity, radio, color, fades }: { position: SpaceValuesPosition, velocity: SpaceValuesPosition, radio?: number, color: string, opacity?: number, fades?: boolean }) {
        super({ position, velocity, radio, color, fades })
    }

    draw() {
        const [x, y] = super.getPosition()
        c!.save();
        c!.globalAlpha = super.getOpacity();
        c!.beginPath();
        c!.arc(x, y, super.getRadio(), 0, 2 * Math.PI);
        c!.fillStyle = super.getColor();
        c!.fill();
        c!.closePath();
        c!.restore()
    };
    updateStar() {
        this.draw()
        super.update()
    }

}