import { SpaceValuesPosition } from "./types/SpaceValues";

const canvas = document.querySelector("canvas");
const c = canvas!.getContext("2d");
export default class Particle {
    private position: SpaceValuesPosition
    private velocity: SpaceValuesPosition
    private radio: number
    private color: string
    private opacity: number
    private fades: boolean
    constructor({ position, velocity, radio, color, fades }: { position: SpaceValuesPosition, velocity: SpaceValuesPosition, radio: number, color: string, opacity?: number, fades?: boolean }) {
        this.position = position;
        this.velocity = velocity;

        this.radio = radio;
        this.color = color;
        this.opacity = 1;
        this.fades = fades ?? false;
    }
    draw() {
        c!.save();
        c!.globalAlpha = this.opacity;
        c!.beginPath();
        c!.arc(this.position.x, this.position.y, this.radio, 0, 2 * Math.PI);
        c!.fillStyle = this.color;
        c!.fill();
        c!.closePath();
        c!.restore()
    };
    update() {
        this.draw();
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (!this.fades) this.opacity += -0.01

    }
    getPosition() {
        return [this.position.x, this.position.y]
    }
    updatePosition({ x, y }: Partial<{ x: number, y: number }>) {
        this.position.x = x ?? this.position.x
        this.position.y = y ?? this.position.y
    }
    getRadio() {
        return this.radio
    }
    getOpacity() {
        return this.opacity
    }
}