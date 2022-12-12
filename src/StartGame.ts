
import Grid from './Classes/GridInvader';
import StarParticle from './Classes/Particles/StarParticle';

import InvaderProjectile from './Classes/Particles/InvaderProjectile';


import Ship from './Classes/ships/Ship';
import playerMoves from './utils/playerMoves';
import gameOver from './utils/gameOver';
import Player from './Classes/ships/player';
import PlayerProjectile from './Classes/Particles/PlayerProjectile';

const canvas = document.querySelector("canvas");
const c = canvas!.getContext("2d");

canvas!.width = innerWidth;
canvas!.height = innerHeight
if (innerWidth < 500) canvas!.height = innerHeight - 2 * 80;

export const startGame = (shipNum: number) => {
    // variables
    const game = {
        over: false,
        active: true
    }
    const keys = {
        ArrowLeft: false,
        ArrowRight: false
    }
    // Player objects
    const player = new Player(shipNum);
    const playerProjectiles: PlayerProjectile[] = [];

    // Invaders Objects
    let grids: Grid[] = [];
    let invaderProjectiles: InvaderProjectile[] = [];

    // stars
    const stars = new StarParticle()


    let frames = 0;
    let randomNumber = Math.ceil(Math.random() * 500 + 400);

    const destoyShips: Ship[] = []

    // display score
    let numScore = 0;
    document.querySelector('#app')!.innerHTML += `
    <div id="scoreBox">Score: <span id="score">${numScore}</span></div>
    `
    const score = document.querySelector('#score')

    // display player controllers
    playerMoves(player, playerProjectiles, shipNum, game.over, keys)


    function loop() {
        if (!game.active) return
        // background
        requestAnimationFrame(loop);
        c!.fillStyle = "black";
        c!.fillRect(0, 0, canvas!.width, canvas!.height)
        stars.updateStar()


        // player controllers
        player.playerMoveZone(keys)
        player.UpdatePlayer({});

        // Invaders Shoots
        invaderProjectiles.forEach((invaderProjectile, index) => {
            const { shoot, outScreen } = invaderProjectile.shootPlayer(player)
            if (shoot || outScreen) {
                invaderProjectiles.splice(index, 1)
            } else {
                invaderProjectile.updateInvaderProjectile();
            }
            if (shoot && !game.over) {
                game.over = true
                destoyShips.push(player)
                setTimeout(() => {
                    game.active = false
                    gameOver(numScore, shipNum)
                }, 2000)
            }
        })
        // remove shoot if its out of the screen
        playerProjectiles.forEach((projectile, index) => {
            const [, y] = projectile.getPosition()
            if (y + projectile.getRadio() <= 0) {
                playerProjectiles.splice(index, 1)
            } else {
                projectile.updatePlayerProjectile();
            }
        });

        // player Shoots
        grids.forEach((grid, gridIndex) => {
            grid.update()
            const InvadersLength = grid.getLength()
            if (frames % 50 == 0 && InvadersLength > 0) {
                grid.getInvader(Math.floor(Math.random() * InvadersLength)).shoot(invaderProjectiles)
            }

            grid.getAllInvaders().forEach((invader, index) => {
                invader.updateInvader({ velocity: grid.getVelocity() })

                playerProjectiles.forEach((projectile, ind) => {
                    const { shoot } = projectile.shootInvader(invader)

                    if (shoot) {
                        playerProjectiles.splice(ind, 1)
                        destoyShips.push(invader)
                        grid.deleteInvader(index)
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

        // destoy ships
        for (const ind in destoyShips) {
            if (destoyShips[Number(ind)].destroyship()) destoyShips.splice(Number(ind), 1)
        }


        // spawning enemies
        if (frames % randomNumber == 0) {
            grids.push(new Grid());
            randomNumber = Math.ceil(Math.random() * 500 + 800);
            frames = 0;

        }

        frames++;
    }

    loop();
}