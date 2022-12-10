import Player from './Classes/player'
import Grid from './Classes/GridInvader';
import Particle from './Classes/Particle';
import Projectile from './Classes/Projectile';

import { chooseShip } from '../main';
import Aim from './img/aim.svg'
import LeftArrow from './img/left-arrow.svg'
import RightArrow from './img/right-arrow.svg'
import InvaderProjectile from './Classes/InvaderProjectile';
import Ship from './Classes/Ship';
import Invader from './Classes/Invader';

const canvas = document.querySelector("canvas");
const c = canvas!.getContext("2d");

canvas!.width = innerWidth;
canvas!.height = innerHeight
if (innerWidth < 500) canvas!.height = innerHeight - 2 * 80;

export const startGame = (shipNum: number) => {
    const keys = {
        ArrowLeft: false,
        ArrowRight: false
    }

    const player = new Player(shipNum);
    const projectiles: Projectile[] = [];
    let grids: Grid[] = [];
    let invaderProjectiles: InvaderProjectile[] = [];
    const particles: Particle[] = [];
    const stars: Particle[] = []
    let frames = 0;
    let randomNumber = Math.ceil(Math.random() * 500 + 400);

    let game = {
        over: false,
        active: true
    }
    let numScore = 0;
    document.querySelector('#app')!.innerHTML = `
    <div id="scoreBox">Score: <span id="score">${numScore}</span></div>
  `
    const score = document.querySelector('#score')
    // console.log(score.innerHTML)
    if (innerWidth < 500) {
        document.querySelector('#app')!.innerHTML += `
    <div id='mobil'>
        <div>
          <button><img src=${LeftArrow}></img></button>
          <button><img src=${RightArrow}></img></button>
        </div>
        <button><img src=${Aim}></img></button>
        </div>
        `
        if (innerWidth < 500) {
            const arrows = document.querySelectorAll('#mobil button')
            arrows[0].addEventListener('touchstart', () => {
                console.log('gola')
                keys.ArrowLeft = true;
            })
            arrows[0].addEventListener('touchend', () => {
                keys.ArrowLeft = false;
            })
            arrows[1].addEventListener('touchstart', () => {
                keys.ArrowRight = true;
            })
            arrows[1].addEventListener('touchend', () => {
                keys.ArrowRight = false;
            })
            arrows[2].addEventListener('touchstart', () => {
                const [x, y] = player.getPosition()
                const [w, ,] = player.getDimentions()
                projectiles.push(new Projectile({
                    position: {
                        x: x + (w / 2),
                        y: y
                    },
                    velocity: {
                        x: 0,
                        y: -10
                    }
                }));
            })
        }
    }

    for (let i = 0; i < 100; i++) {
        stars.push(new Particle({
            position: {
                x: Math.random() * canvas!.width,
                y: Math.random() * canvas!.height
            },
            velocity: {
                x: 0,
                y: 1
            },
            radio: Math.random() * 3,
            color: "white",
            fades: true
        }))
    }

    function createParticles(object: Ship | Invader) {
        const [x, y] = object.getPosition()
        const [w, h] = object.getDimentions()
        for (let i = 0; i < 10; i++) {
            particles.push(new Particle({
                position: {
                    x: x + w / 2,
                    y: y + h / 2
                },
                velocity: {
                    x: (Math.random() - 0.5) * 2,
                    y: (Math.random() - 0.5) * 2
                },
                radio: Math.random() * 3 + 3,
                color: object.getColor()

            }))
        }
    }
    function loop() {
        if (!game.active) return
        requestAnimationFrame(loop);
        c!.fillStyle = "black";
        c!.fillRect(0, 0, canvas!.width, canvas!.height)

        stars.forEach((star) => {
            const [, y] = star.getPosition()
            const r = star.getRadio()
            if (y - r >= canvas!.height) {
                star.updatePosition({ x: Math.random() * canvas!.width })
                star.updatePosition({ y: 0 })
            }
            star.update()
        })

        player.UpdatePlayer({});
        particles.forEach((particle, index) => {
            if (particle.getOpacity() <= 0.01) {
                setTimeout(() => {
                    particles.splice(index, 1)
                }, 0)
            } else { particle.update(); }

        });

        invaderProjectiles.forEach((invaderProjectile, index) => {
            const [xPlayer, yPlayer] = player.getPosition()
            const [wPlayer, hPlayer] = player.getDimentions()
            const [xProjectile, yProjectile] = invaderProjectile.getPosition()
            const [wProjectile, hProjectile] = invaderProjectile.getDimentions()

            if (yProjectile >= canvas!.height) {
                setTimeout(() => {
                    invaderProjectiles.splice(index, 1)
                }, 0)
            } else {
                invaderProjectile.update();

            }
            if (
                yProjectile + hProjectile >= yPlayer &&
                yProjectile <= yPlayer + hPlayer &&
                xProjectile + (2 * wProjectile) >= xPlayer &&
                xProjectile <= xPlayer + wPlayer
            ) {
                invaderProjectiles.splice(index, 1)
                createParticles(player)
                player.UpdatePlayer({
                    opacity: 0, dimentions: {
                        w: 0,
                        h: 0
                    }
                });
                game.over = true;

                setTimeout(() => {
                    game.active = false
                    document.querySelector('#app')!.innerHTML += `
                        <div id="GO">
                            <h2>Game Over</h2>
                            <p>Your Score is: ${numScore} </p>
                            <button id="playAgain">Play Again</button>
                            <button id='ship'>Choose Ship</button>
                        </div>
                    `
                    document.getElementById('ship')!.addEventListener('click', () => {
                        document.querySelector('#GO')!.remove()
                        document.querySelector('#scoreBox')!.remove()
                        if (innerWidth < 500) document.querySelector('#mobil')!.remove()
                        c!.clearRect(0, 0, canvas!.width, canvas!.height)
                        chooseShip()
                    })
                    document.querySelector('#playAgain')!.addEventListener("click", () => {
                        c!.clearRect(0, 0, canvas!.width, canvas!.height)
                        startGame(shipNum)
                        // console.log("hola")
                        // game.active = true
                        // game.over = false
                        // invaderProjectiles = []
                        // grids = []
                        // grids.push(new Grid());
                        // player.reset()
                        // loop()
                        // score.innerHTML = 0
                        // responstive()
                    })
                }, 2000)
            }

        })

        projectiles.forEach((projectile, index) => {
            const [, y] = projectile.getPosition()
            if (y + projectile.getRadio() <= 0) {
                setTimeout(() => {
                    projectiles.splice(index, 1)
                }, 0)
            } else {
                projectile.update();
            }
        });

        grids.forEach((grid, gridIndex) => {
            grid.update()
            const InvadersLength = grid.getLength()
            if (frames % 50 == 0 && InvadersLength > 0) {
                grid.getInvader(Math.floor(Math.random() * InvadersLength)).shoot(invaderProjectiles)
            }

            grid.getAllInvaders().forEach((invader, index) => {
                invader.update({ velocity: grid.getVelocity() })
                const [xInvader, yInvader] = invader.getPosition()
                const [wInvader, hInvader] = invader.getDimentions()
                projectiles.forEach((projectile, i) => {
                    const [x, y] = projectile.getPosition()
                    const r = projectile.getRadio()
                    if (
                        y >= yInvader &&
                        y + 2 * r <= yInvader + hInvader &&
                        x >= xInvader &&
                        x + 2 * r <= xInvader + wInvader

                    ) {
                        createParticles(invader);
                        grid.deleteInvader(index)
                        projectiles.splice(i, 1)
                        numScore += 100;
                        score!.innerHTML = String(numScore)
                    }
                })
            })
            if (grid.getLength() == 0) {
                grids.splice(gridIndex, 1);
            }
            if (grids.length === 0) {
                frames = randomNumber - 1
            }
        })
        // const [xPlayer, yPlayer] = player.getPosition()
        const [wPlayer,] = player.getDimentions()
        // const opacity = player.getOpacity()

        // const [x,] = player.getPosition()
        const x = 0
        if (keys.ArrowLeft && x >= 0) {
            player.UpdatePlayer({ velocity: { x: -7, y: 0 } })
            player.updateRotation(-0.20);
        } else if (keys.ArrowRight && x <= canvas!.width - wPlayer) {
            player.UpdatePlayer({ velocity: { x: 7, y: 0 } })
            player.updateRotation(0.20);
        } else {
            player.UpdatePlayer({ velocity: { x: 0, y: 0 } })
            player.updateRotation(0);
        };

        // spawning enemies
        if (frames % randomNumber == 0) {
            grids.push(new Grid());
            randomNumber = Math.ceil(Math.random() * 500 + 800);
            frames = 0;

        }

        frames++;
    }

    loop();

    addEventListener("keydown", ({ key }) => {
        const [x, y] = player.getPosition()
        const [w,] = player.getDimentions()
        if (game.over) return
        switch (key) {
            case "a":
            case "ArrowLeft":
                keys.ArrowLeft = true;
                break;

            case "d":
            case "ArrowRight":
                keys.ArrowRight = true;
                break;
            case " ": {
                projectiles.push(new Projectile({
                    position: {
                        x: x + (w / 2),
                        y: y
                    },
                    velocity: {
                        x: 0,
                        y: -10
                    }
                }));
                break
            }
        }
    })

    addEventListener("keyup", ({ key }) => {
        switch (key) {
            case "a":
            case "ArrowLeft":
                keys.ArrowLeft = false;
                break;

            case "d":
            case "ArrowRight":
                keys.ArrowRight = false;
                break;
        }
    })
}