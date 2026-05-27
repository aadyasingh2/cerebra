import React from 'react'
import './Landing.css'

function Landing() {
    return (
        <div className="landing-root">
            <div className="noise-overlay" />

            {/* Nav */}
            <nav className="landing-nav">
                <div className="nav-logo">Cerebr<span>a</span></div>
                <div className="nav-actions">
                    <button className="btn-ghost">Login</button>
                    <button className="btn-primary">Get started</button>
                </div>
            </nav>

            {/* Hero */}
            <section className="landing-hero">
                <div className="hero-badge">
                    <span className="hero-badge-dot" />
                    AI-powered flashcards
                </div>

                <h1 className="hero-title">
                    remember<br />
                    <span className="accent-word">everything.</span>
                </h1>

                <p className="hero-tagline">
                    paste your notes, get flashcards instantly. study, recall, and actually retain what you learn.
                </p>

                <div className="hero-cta">
                    <button className="btn-hero-primary">Start studying →</button>
                    <button className="btn-hero-ghost">Login</button>
                </div>

                <div className="features-grid">
                    <div className="feature-card">
                        <span className="feature-icon">⚡</span>
                        <h3>AI flashcards</h3>
                        <p>paste any text, get cards in seconds</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">🃏</span>
                        <h3>Study mode</h3>
                        <p>flip through cards at your own pace</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">🧠</span>
                        <h3>Recall mode</h3>
                        <p>test yourself and track your score</p>
                    </div>
                </div>

                <div className="scroll-hint">
                    <div className="scroll-line" />
                    scroll
                </div>
            </section>
        </div>
    )
}

export default Landing