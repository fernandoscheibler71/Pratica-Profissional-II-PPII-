const express = require('express')
const route = express.Router()
const AuthController = require('../controllers/authController')

const auth = new AuthController()

route.post('/login', async (req, res) => {
    try {
        const response = await auth.login(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(400).json({ error: e.message })
    }
})

module.exports = route