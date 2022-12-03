import './style.css'
import Player from './src/player'
import Grid from './src/GridInvader';
import Particle from './src/Particle';
import Projectile from './src/Projectile';

import Aim from './src/img/aim.svg'
import LeftArrow from './src/img/left-arrow.svg'
import Leftright from './src/img/right-arrow.svg'

const score = document.querySelector("#score");
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const keys = {
  ArrowLeft: false,
  ArrowRight: false
}

const player = new Player();
const projectiles = [];
let grids = [];
let invaderProjectiles = [];
const particles = [];
const stars = []
let frames = 0;
let randomNumber = Math.ceil(Math.random() * 500 + 400);
let game = {
  over: false,
  active: true
}
let numScore = 0;
if (innerWidth < 500) {
  document.querySelector('#app').innerHTML += `
    <div id='mobil'>
        <div>
          <button><img src=${LeftArrow}></img></button>
          <button><img src=${Leftright}></img></button>
        </div>
        <button><img src=${Aim}></img></button>
    </div>
    `
}

const responstive = () => {
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
      projectiles.push(new Projectile({
        position: {
          x: player.position.x + (player.width / 2),
          y: player.position.y
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
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height
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

function createParticles({ object }) {
  for (let i = 0; i < 10; i++) {
    particles.push(new Particle({
      position: {
        x: object.position.x + object.width / 2,
        y: object.position.y + object.height / 2
      },
      velocity: {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2
      },
      radio: Math.random() * 3 + 3,
      color: object.color

    }))
  }
}
responstive()
function loop() {
  if (!game.active) return
  requestAnimationFrame(loop);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height)

  stars.forEach((star) => {
    if (star.position.y - star.radio >= canvas.height) {
      star.position.x = Math.random() * canvas.width;
      star.position.y = 0
    }
    star.update()
  })

  player.update();
  particles.forEach((particle, index) => {
    if (particle.opacity <= 0.01) {
      setTimeout(() => {
        particles.splice(index, 1)
      }, 0)
    } else { particle.update(); }

  });

  invaderProjectiles.forEach((invaderProjectile, index) => {
    if (invaderProjectile.position.y >= canvas.height) {
      setTimeout(() => {
        invaderProjectiles.splice(index, 1)
      }, 0)
    } else {
      invaderProjectile.update();

    }
    if (
      invaderProjectile.position.y + invaderProjectile.height >= player.position.y &&
      invaderProjectile.position.y <= player.position.y + player.height &&
      invaderProjectile.position.x + (2 * invaderProjectile.width) >= player.position.x &&
      invaderProjectile.position.x <= player.position.x + player.width
    ) {
      invaderProjectiles.splice(index, 1)
      player.opacity = 0;
      createParticles({
        object: player
      })
      player.height = 0
      player.width = 0
      game.over = true;

      setTimeout(() => {
        game.active = false
        document.querySelector('#app').innerHTML += `
          <div id="GO">
            <h2>Game Over</h2>
            <p>your Score is: ${score.innerHTML} </p>
            <button id="btn-GO">Play Again</button>
          </div>
        `
        document.querySelector('#btn-GO').addEventListener("click", () => {
          console.log("hola")
          game.active = true
          game.over = false
          score.innerHTML = 0
          invaderProjectiles = []
          grids = []
          grids.push(new Grid());
          player.reset()
          document.querySelector('#GO').remove()
          loop()
          responstive()
        })
      }, 2000)
    }

  })

  projectiles.forEach((projectile, index) => {

    if (projectile.position.y + projectile.radio <= 0) {
      setTimeout(() => {
        projectiles.splice(index, 1)
      }, 0)
    } else {
      projectile.update();
    }
  });

  grids.forEach((grid, gridIndex) => {
    grid.update()

    if (frames % 50 == 0 && grid.invaders.length > 0) {
      grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(invaderProjectiles)

    }

    grid.invaders.forEach((invader, index) => {
      invader.update({ velocity: grid.velocity })
      projectiles.forEach((projectile, i) => {
        if (
          projectile.position.y >= invader.position.y &&
          projectile.position.y + 2 * projectile.radio <= invader.position.y + invader.height &&
          projectile.position.x >= invader.position.x &&
          projectile.position.x + 2 * projectile.radio <= invader.position.x + invader.width

        ) {
          createParticles({
            object: invader
          });
          setTimeout(() => {
            grid.invaders.splice(index, 1)
            projectiles.splice(i, 1)
          })
          numScore += 100;
          console.log(numScore)
          score.innerHTML = numScore
        }
      })
    })
    if (grid.invaders.length == 0) {
      grids.splice(gridIndex, 1);
    }
  })

  if (keys.ArrowLeft && player.position.x >= 0) {
    player.velocity = -7;
    player.rotation = -0.20;
  } else if (keys.ArrowRight && player.position.x <= canvas.width - player.width) {
    player.velocity = 7;
    player.rotation = 0.20;
  } else {
    player.velocity = 0;
    player.rotation = 0;
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
          x: player.position.x + (player.width / 2),
          y: player.position.y
        },
        velocity: {
          x: 0,
          y: -10
        }
      }));
      break
    }
    case "f": {
      console.log(player.height, player.width, player.position.x)
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







