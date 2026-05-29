import React, { useState } from 'react'
import './recall.css'

function RecallMode(props) {
    if (!props.flashcardsArray || props.flashcardsArray.length === 0) {
        return <div>Loading...</div>
    }
    const [screen, setScreen] = useState('idle')
    const [score, setScore] = useState(0)
    const [cardsIndex, setCardsIndex] = useState(1)
    const [currentInput, setInput] = useState("")


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
                            <p>{props.flashcardsArray[cardsIndex - 1].front}</p>
                            <input type='text' onChange={(event) =>
                                setInput(event.target.value)

                            } value={currentInput}></input>

                            <button onClick={() => {
                                setInput("")
                                if (currentInput == props.flashcardsArray[cardsIndex - 1].back) {
                                    setScore(score + 1)

                                } if (cardsIndex === props.flashcardsArray.length) { setScreen('results') } else { setCardsIndex(cardsIndex + 1) }

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
