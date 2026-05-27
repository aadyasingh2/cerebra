import React, { useState } from 'react'
import './Login.css'

function Login() {
    const [formTab, setFormTab] = useState('login')

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
                        <input type="text" placeholder="your name" />
                    </div>
                )}

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="you@example.com" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" placeholder="••••••••" />
                </div>

                <button className="form-submit">
                    {formTab === 'login' ? 'Login →' : 'Create account →'}
                </button>

                <p className="form-footer">
                    {formTab === 'login'
                        ? <>don't have an account? <span onClick={() => setFormTab('signup')}>sign up</span></>
                        : <>already have an account? <span onClick={() => setFormTab('login')}>login</span></>
                    }
                </p>
            </div>
        </div>
    )
}

export default Login