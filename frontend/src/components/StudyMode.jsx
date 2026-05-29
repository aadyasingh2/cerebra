import React, { useState } from 'react'
import './Studymode.css'

function StudyMode(props) {
    if (!props.flashcardsArray || props.flashcardsArray.length === 0) {
        return <div>Loading...</div>
    }
    const [front, setFront] = useState(true)
    const [cardsIndex, setCardsIndex] = useState(1)
    return (
        <div className='study-container'>
            <div className='study-card'>
                <div className={`card-inner ${front ? '' : 'flipped'}`}>
                    <div className='front'>
                        <p>{props.flashcardsArray[cardsIndex - 1].front}</p>
                        <button onClick={() => setFront(false)}>Show Answer</button>
                    </div>
                    <div className='back'>
                        <p>{props.flashcardsArray[cardsIndex - 1].back}</p>
                        <button onClick={() => setFront(true)}>See Front</button>
                    </div>
                </div>
                <button className="prev" onClick={() => {
                    setCardsIndex(cardsIndex > 1 ? cardsIndex - 1 : props.flashcardsArray.length)
                    setFront(true)
                }}>PREVIOUS</button>
                <button className="next" onClick={() => {
                    setCardsIndex((cardsIndex % props.flashcardsArray.length) + 1)
                    console.log(cardsIndex)
                    setFront(true)
                }}>NEXT</button>
            </div>
        </div>
    )
}

export default StudyMode
