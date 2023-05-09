import './styles.css'
import React, { useState, useEffect, useRef } from 'react'

export default function Game() {
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [isDead, setDead] = useState(false)
  const [score, setScore] = useState(0)
  const blockElem = useRef(null)
  const characterElem = useRef(null)
  let timer: string | number | NodeJS.Timeout | undefined

  useEffect(() => {
    listenEvent()
  }, [])

  const listenEvent = () => {
    document.body.onkeyup = (e) => {
      if (Number(e.keyCode) === 32) {
        handleCharacterAnimation()
      }
    }
  }

  const handleCharacterAnimation = () => {
    // if (!isGameStarted) return;

    if (!characterElem.current) return

    if (characterElem.current.classList.contains('animateCharacter')) return

    characterElem.current.classList.add('animateCharacter')

    setScore((score) => ++score)

    setTimeout(() => {
      characterElem.current.classList.remove('animateCharacter')
    }, 900)
  }

  const handleBlockAnimation = () => {
    if (!blockElem.current) return

    if (blockElem.current.classList.contains('animateBlock')) return

    blockElem.current.classList.add('animateBlock')
  }

  const startGame = () => {
    console.log('Game is started')
    timer = setInterval(() => {
      checkIfgameOver()
    }, 200)
    handleBlockAnimation()
    setIsGameStarted(true)
  }

  const resetGame = () => {
    console.log('Game is reset')
    clearInterval(timer)
    setScore(0)
    setDead(false)
    setIsGameStarted(false)
    blockElem.current.classList.remove('animateBlock')
  }

  const checkIfgameOver = () => {
    // let getCharacterTopPosition = characterElem.getPropertyValue("bottom");
    let characterComputed = parseInt(
      window.getComputedStyle(characterElem.current).getPropertyValue('bottom'),
      0,
    )

    let blockComputed = parseInt(
      window.getComputedStyle(blockElem.current).getPropertyValue('left'),
      0,
    )

    if (
      characterComputed > -5 &&
      characterComputed < 30 &&
      blockComputed >= -5 &&
      blockComputed <= 25
    ) {
      characterElem.current.classList.remove('animateCharacter')
      blockElem.current.classList.remove('animateBlock')
      setDead(true)
    }

    /*
      0 14   
      0 30 

    */

    // if (
    //   (blockComputed >= -0 || blockComputed >= 0 || blockComputed < 5) &&
    //   (characterComputed >= -0 ||
    //     characterComputed >= 0 ||
    //     characterComputed < 5)
    // ) {
    //   characterElem.current.classList.remove("animateCharacter");
    //   blockElem.current.classList.remove("animateBlock");
    //   setDead(true);
    // }

    console.log(characterComputed, blockComputed)
  }

  return (
    <div className="App">
      <h1>Create your favourite Dino game in React ^_^</h1>
      <h4>Tap sapcebar to jump </h4>

      <div className="game">
        {/* Gamne character */}
        <div ref={characterElem} className="character"></div>
        {/* Game Block */}
        <div ref={blockElem} className="block"></div>
        <div className="floor"></div>
      </div>

      <div className="score">
        {isDead ? <h3 className="red">You are dead</h3> : ''}
      </div>
      <div className="score">
        {isGameStarted ? <h1>Score: {score}</h1> : ''}
      </div>
      <div className="btn-divs">
        <button
          disabled={isGameStarted ? true : false}
          onClick={startGame}
          className="start"
        >
          START THE GAME
        </button>
        <button onClick={resetGame} className="reset">
          RESET GAME
        </button>
        <button onClick={checkIfgameOver}>Get offset</button>
      </div>
    </div>
  )
}
