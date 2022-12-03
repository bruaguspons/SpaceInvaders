import './style.css'
import { startGame } from './src/StartGame'
import ship1 from './src/img/ship1.png'
import ship2 from './src/img/ship2.png'
import ship3 from './src/img/ship3.png'
import LeftArrow from './src/img/left-arrow.svg'
import RightArrow from './src/img/right-arrow.svg'


export const chooseShip = () => {

  document.querySelector('#app').innerHTML += `
      <div id='selector'>
        <div class='card'><img src=${ship1}></img></div>
        <div id='btn-sele'>
          <button><img src=${LeftArrow}></img></button>
          <button>Play</button>
          <button><img src=${RightArrow}></img></button>
        <div/>
      <div/>
  `
  let current = 0
  const ships = [ship1, ship2, ship3]
  const ship = document.querySelector('.card')
  const btns = document.querySelectorAll('#btn-sele>button')

  btns[0].addEventListener('click', () => {
    ship.innerHTML = `<img class='shipOutLeft' src=${ships[current]}></img>`
    if (current == 0) current = 3
    current--
    ship.innerHTML += `<img class='shipInLeft' src=${ships[current]}></img>`
    setTimeout(() => {
      document.querySelector('.shipOutLeft').remove()
    }, 500)
  })

  btns[2].addEventListener('click', () => {
    ship.innerHTML = `<img class='shipOutRight' src=${ships[current]}></img>`
    current = (current + 1) % 3
    ship.innerHTML += `<img class='shipInRight' src=${ships[current]}></img>`
    setTimeout(() => {
      document.querySelector('.shipOutRight').remove()
    }, 500)
  })

  btns[1].addEventListener('click', () => {
    document.querySelector('#selector').remove()
    startGame(current)
  })
}
chooseShip()






