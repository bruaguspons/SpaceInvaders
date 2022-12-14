import ParticleExplotion from "../Particles/ParticleExplotion";
import { SpaceValuesDimentions, SpaceValuesPosition } from "../types/SpaceValues";

const canvas = document.querySelector("canvas");

export default class Ship {
    private particlesExplotions: ParticleExplotion[] = []
    private destroid: boolean = false
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

    update({ velocity, opacity, dimentions }: { velocity?: SpaceValuesPosition, opacity?: number, dimentions?: SpaceValuesDimentions }): void {
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

    getPosition(): number[] {
        return [this.position.x, this.position.y]
    }
    getDimentions(): number[] {
        return [this.width, this.height]
    }
    getOpacity(): number {
        return this.opacity
    }
    getImage(): HTMLImageElement {
        return this.image
    }
    getColor(): string {
        return this.color
    }
    destroyship() {
        if (this.particlesExplotions.length == 0 && !this.destroid) {
            this.destroid = true
            const [x, y] = this.getPosition()
            const [w, h] = this.getDimentions()
            for (let i = 0; i < 10; i++) {
                this.particlesExplotions.push(new ParticleExplotion({
                    position: {
                        x: x + w / 2,
                        y: y + h / 2
                    },
                    velocity: {
                        x: (Math.random() - 0.5) * 2,
                        y: (Math.random() - 0.5) * 2
                    },
                    radio: Math.random() * 3 + 3,
                    color: this.getColor()

                }))
            }
            this.opacity = 0
            this.width = 0
            this.height = 0
            return false
        } if (this.particlesExplotions.length > 0) {
            this.particlesExplotions.forEach((particle, index) => {
                if (particle.getOpacity() <= 0.01) {
                    this.particlesExplotions.splice(index, 1)
                } else { particle.updateExplotion(); }

            });
            return false
        }
        return true
    }
}