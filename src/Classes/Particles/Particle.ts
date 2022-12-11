import { SpaceValuesPosition } from "../types/SpaceValues"


export default class Particle {
    private position: SpaceValuesPosition
    private velocity: SpaceValuesPosition
    private radio: number
    private color: string
    private opacity: number
    private fades: boolean
    constructor({ position, velocity, radio, color, fades }: { position: SpaceValuesPosition, velocity: SpaceValuesPosition, radio?: number, color: string, opacity?: number, fades?: boolean }) {
        this.position = position;
        this.velocity = velocity;

        this.radio = radio ?? 0;
        this.color = color;
        this.opacity = 1;
        this.fades = fades ?? false;
    }

    update() {
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
    getColor() {
        return this.color
    }
    getVolicity() {
        return [this.velocity.x, this.velocity.y]
    }
}