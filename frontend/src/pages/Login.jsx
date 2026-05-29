import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [formTab, setFormTab] = useState('login')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const navigate = useNavigate()
    return (
        <div className="login-root">
            <div className="login-card">
                <div className="login-logo">Cerebr<span>a</span></div>

                <div className="form-tabs">
                    <button
                        className={`form-tab-btn ${formTab === 'login' ? 'active' : ''}`}
                        onClick={() => setFormTab('login')}
                    >
                        Login
                    </button>
                    <button
                        className={`form-tab-btn ${formTab === 'signup' ? 'active' : ''}`}
                        onClick={() => setFormTab('signup')}
                    >
                        Sign up
                    </button>
                </div>

                <h2 className="form-title">
                    {formTab === 'login' ? 'Welcome back' : 'Create account'}
                </h2>
                <p className="form-subtitle">
                    {formTab === 'login'
                        ? 'Login to access your study sessions'
                        : 'Start remembering everything'}
                </p>

                {formTab === 'signup' && (
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" placeholder="your name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                )}

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" placeholder="••••••••" value={pass} onChange={(e) => setPass(e.target.value)} />
                </div>

                <button className="form-submit" onClick={() => {
                    if (formTab == 'login') {
                        fetch("https://cerebra-de8p.onrender.com/api/login", {
                            method: 'POST',
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                email: email,
                                password: pass
                            })
                        }).then(res => res.json()).then((data) => {
                            localStorage.setItem('token', data.token)
                            navigate('/dashboard')
                        })
                    }
                    else {
                        fetch("https://cerebra-de8p.onrender.com/api/signup", {
                            method: 'POST',
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                name: name,
                                email: email,
                                password: pass
                            }).then(() => setFormTab('login'))
                        })
                    }
                }}>
                    {formTab === 'login' ? 'Login →' : 'Create account →'}
                </button>

                <p className="form-footer">
                    {formTab === 'login'
                        ? <>don't have an account? <span onClick={() => setFormTab('signup')}>sign up</span></>
                        : <>already have an account? <span onClick={() => setFormTab('login')}>login</span></>
                    }
                </p>
            </div>
        </div >
    )
}

export default Login