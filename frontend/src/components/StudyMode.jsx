import React, { useState } from 'react'
import './Studymode.css'

function StudyMode() {
    const [front, setFront] = useState(true)
    const [cardsIndex, setCardsIndex] = useState(1)
    const cards = [
        { front: "What is a derivative?", back: "Rate of change of a function" },
        { front: "What is an integral?", back: "Area under a curve" },
        { front: "What is the chain rule?", back: "d/dx[f(g(x))] = f'(g(x)) · g'(x)" },
    ]
    return (
        <div className='study-container'>
            <div className='study-card'>
                <div className={`card-inner ${front ? '' : 'flipped'}`}>
                    <div className='front'>
                        <p>{cards[cardsIndex - 1].front}</p>
                        <button onClick={() => setFront(false)}>Show Answer</button>
                    </div>
                    <div className='back'>
                        <p>{cards[cardsIndex - 1].back}</p>
                        <button onClick={() => setFront(true)}>See Front</button>
                    </div>
                </div>
                <button className="prev" onClick={() => {
                    setCardsIndex(cardsIndex > 1 ? cardsIndex - 1 : cards.length)
                    setFront(true)
                }}>PREVIOUS</button>
                <button className="next" onClick={() => {
                    setCardsIndex((cardsIndex % cards.length) + 1)
                    console.log(cardsIndex)
                    setFront(true)
                }}>NEXT</button>
            </div>
        </div>
    )
}

export default StudyMode
// setCardsIndex((cardsIndex % cards.length) + 1)
// console.log(cardsIndex)
// setFront(true)
// setCardsIndex(cardsIndex > 1 ? cardsIndex - 1 : cards.length)
// setFront(true)