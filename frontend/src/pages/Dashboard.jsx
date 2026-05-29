import React, { useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import './Dashboard.css'
import { X, SidebarOpenIcon } from 'lucide-react'
import StudyMode from '../components/StudyMode'
import RecallMode from '../components/RecallMode'

const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" })

function Dashboard() {
    const [usingSidebar, setSidebar] = useState(true)
    const [sessionActive, setSession] = useState(false)
    const [activeTab, setActiveTab] = useState('study')
    const [files, setFileState] = useState('input')
    const [flashcards, setFlashcards] = useState([])
    const [textInput, setTextInput] = useState('')


    async function generateFlashcards(text) {
        const prompt = `Generate flashcards from the following text. Return ONLY a JSON array, no markdown, no explanation. Each object must have a "front" and "back" field. Example: [{"front": "question", "back": "answer"}]
Text: ${text}`
        let response = await model.generateContent(prompt)
        let flashcards = response.response.text()
        flashcards = flashcards.replace(/```json|```/g, '').trim()
        setFlashcards(JSON.parse(flashcards))
        setFileState('ready')
    }

    function sessionStart() {
        setSession(true)
    }
    function closeSideBar() {
        setSidebar(false)
    }
    function openSidebar() {
        setSidebar(true)
    }

    return (
        <>
            <div className='container'>
                {usingSidebar && <div className='sidebar'>
                    <div className='top'>
                        <h2>Cerebra</h2>
                        <X size={20} onClick={closeSideBar} />
                    </div>

                    <button onClick={() => {
                        setSession(false)
                        setActiveTab('study')
                        setFileState('input')
                    }}>New Session</button>
                    <ul>
                        <li>Calculus Spherical Integration</li>
                        <li>Physics Heisenberg Principle</li>
                        <li>Theory of Computation DFA</li>
                    </ul>
                </div>
                }
                {
                    !usingSidebar && <div className='sidebar-closed'>
                        <SidebarOpenIcon size={20} onClick={openSidebar} />
                    </div>
                }
                {
                    !sessionActive && <div className='main-content'>
                        <p>Welcome to Cerebra</p>
                        <button onClick={sessionStart}>Start a Study Session</button>
                    </div>
                }
                {
                    sessionActive && <div className='main-content'>
                        {
                            files == 'input' && <div className='input-page'>
                                <input type='file' />
                                <h1>Input Your File</h1>
                                <h2>Or</h2>
                                <h1>Paste Your Text</h1>
                                <input type='text' value={textInput} placeholder='paste your notes here...' onChange={(e) => {
                                    setTextInput(e.target.value)
                                }} />
                                <button onClick={() => {
                                    generateFlashcards(textInput)

                                }
                                }>Submit</button>
                            </div>
                        }
                        {
                            files == 'ready' && <div className='tabs'>
                                <button
                                    className={activeTab === 'study' ? 'active' : ''}
                                    onClick={() => setActiveTab('study')}>Study Mode</button>
                                <button
                                    className={activeTab === 'recall' ? 'active' : ''}
                                    onClick={() => setActiveTab('recall')}>Recall Mode</button>
                            </div>
                        }
                        {files == 'ready' && activeTab == 'study' && <StudyMode flashcardsArray={flashcards} />}
                        {files == 'ready' && activeTab != 'study' && <RecallMode flashcardsArray={flashcards} />}
                    </div>
                }
            </div>
        </>
    )
}

export default Dashboard