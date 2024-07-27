// React Query Tutorial V5 - Full Tanstack Query Tutorial for Beginners
// https://www.youtube.com/watch?v=3e-higRXoaM&t=924s

// 12:20
// 1:03:00 бесконечная прокрутка
import './App.css'
import Projects from './components/Projects'
import Todos from './components/Todos'

import Products from './components/Products'

function App() {
  return (
    <>
      {/* <Todos /> */}
      {/* <Projects /> */}
      <Products />
    </>
  )
}

export default App

// {
//   const button = document.querySelector('.user-tap-button')
//   console.log(1, 'button', button)
//   let reachedZeroEnergy = false
//   function tick() {
//     try {
//       const energy = document.querySelector('.user-tap-energy > p')
//       console.log(2, 'energy', energy)
//       if (energy) {
//         const energyStr = energy.innerText
//         const currEnergy = Number(energyStr.split('/')[0])
//         const maxEnergy = Number(energyStr.split('/')[1])

//         if (!reachedZeroEnergy) {
//           button.dispatchEvent(new PointerEvent('pointerup'))
//           button.dispatchEvent(new PointerEvent('pointerup'))
//           button.dispatchEvent(new PointerEvent('pointerup'))
//           button.dispatchEvent(new PointerEvent('pointerup'))
//         }
//         if (currEnergy <= 10) {
//           reachedZeroEnergy = true
//         }
//         if (currEnergy >= maxEnergy - 10) {
//           reachedZeroEnergy = false
//         }
//       }
//     } catch (e) {
//       console.log(111, 'error', e)
//     }

//     setTimeout(tick, 100 * Math.random() + 50)
//   }
//   tick()
// }
