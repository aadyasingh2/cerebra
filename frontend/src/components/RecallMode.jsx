import React, { useState } from 'react'
import './recall.css'

function RecallMode() {
    const [screen, setScreen] = useState('idle')
    const [score, setScore] = useState(0)
    const [cardsIndex, setCardsIndex] = useState(1)
    const [currentInput, setInput] = useState("")
    const cards = [
        { front: "What is a derivative?", back: "Rate of change of a function" },
        { front: "What is an integral?", back: "Area under a curve" },
        { front: "What is the chain rule?", back: "d/dx[f(g(x))] = f'(g(x)) · g'(x)" },
    ]

    return (
        <div className='recall-container'>
            {
                (screen == 'idle' && <button className='idle-btn' onClick={() => {
                    setScreen('recall')
                    setScore(0)
                }}>
                    Start A Recall Session
                </button>)
            }
            {
                (screen == 'recall' &&
                    <div className='study-card'>
                        <div className='front'>
                            <p>{cards[cardsIndex - 1].front}</p>
                            <input type='text' onChange={(event) =>
                                setInput(event.target.value)

                            } value={currentInput}></input>

                            <button onClick={() => {
                                setInput("")
                                if (currentInput == cards[cardsIndex - 1].back) {
                                    setScore(score + 1)

                                } if (cardsIndex === cards.length) { setScreen('results') } else { setCardsIndex(cardsIndex + 1) }

                            }}>Submit</button>
                        </div>
                    </div>)
            }
            {
                screen == 'results' && <div className='results-page'>
                    <p>Score:
                        {score}</p>

                </div>}
        </div>
    )
}

export default RecallMode
