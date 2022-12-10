import { SpaceValuesDimentions, SpaceValuesPosition } from "./types/SpaceValues";

const canvas = document.querySelector("canvas");

export default class Ship {
    private color: string
    private velocity: SpaceValuesPosition
    private opacity: number
    private width: number = 0
    private height: number = 0
    private image: HTMLImageElement
    private position: SpaceValuesPosition
    constructor({ position, img, color, scale }: { position?: SpaceValuesPosition, img: string, color: string, scale: number }) {
        this.color = color;
        this.velocity = {
            x: 0,
            y: 0
        };
        this.opacity = 1;

        this.position = {
            x: 0,
            y: 0
        }

        this.image = new Image();
        this.image.src = img;
        this.image.onload = () => {
            this.width = this.image.width * scale;
            this.height = this.image.height * scale;
            this.position = {
                x: position?.x ?? (canvas!.width / 2) - (this.width / 2),
                y: position?.y ?? canvas!.height - this.height - 20
            };
        };
    }

    update({ velocity, opacity, dimentions }: { velocity?: SpaceValuesPosition, opacity?: number, dimentions?: SpaceValuesDimentions }) {
        if (this.image) {
            this.velocity.x = velocity?.x ?? this.velocity.x
            this.velocity.y = velocity?.y ?? this.velocity.y
            if (this.velocity.x) {
                this.position.x += this.velocity.x
            }
            if (this.velocity.y) {
                this.position.y += this.velocity.y
            }

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
    getOpacity() {
        return this.opacity
    }
    getImage() {
        return this.image
    }
    getColor() {
        return this.color
    }
}