const mongoose = require('mongoose')
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('App works')
})

const uri = process.env.MONGO_URI
mongoose.connect(uri)

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const session = new mongoose.Schema({
    createdOn: {
        type: Date,
        required: true,
        default: Date.now
    },
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        default: 'untitled session'
    },
    flashcards: [
        {
            front: String,
            back: String
        }
    ]
})
const User = mongoose.model('User', user)
const Session = mongoose.model('Session', session)

app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ name, email, password: hashedPassword })
    await newUser.save()
    res.json({ message: 'user created' })
})


app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const LoggedInUser = await User.findOne({ email: email })
    if (!LoggedInUser) {
        return res.status(404).json({ message: 'user not found' })
    }
    const pass = await bcrypt.compare(password, LoggedInUser.password)
    if (!pass) {
        return res.status(401).json({ message: 'incorrect password' })
    }
    const token = jwt.sign({ userId: LoggedInUser._id }, process.env.JWT_SECRET)
    res.json({ token })
})

function authMiddleware(req, res, next) {
    let token = req.headers.authorization
    try {
        let valid = jwt.verify(token, process.env.JWT_SECRET)
        req.user = valid
        next()
    }
    catch {
        res.status(401).json({
            message: 'unauthorized'
        })
    }
}
app.get('/api/sessions', authMiddleware, async (req, res) => {
    let currentUser = req.user.userId
    try {
        match = await Session.find({ userId: currentUser })
        res.json(match)
    }
    catch {
        res.status(404).json({ message: 'no session found' })
    }
})
app.post('/api/sessions', authMiddleware, async (req, res) => {
    const { date, title, cards } = req.body;
    let id = req.user.userId
    const newSession = new Session({ createdOn: date, userId: id, title: title, flashcards: cards })
    await newSession.save()
    res.json({ message: 'session created' })
})
app.listen(process.env.PORT)
