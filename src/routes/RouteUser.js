const express = require('express')
const route = express.Router()
const User = require('../controllers/UserController')
const { messages } = require('../../configs/PrismaConfig')
const UserController = new User()


route.post('/create', async (req, res) => {
    try {
        const newUser = await UserController.createUser(req.body)
        res.status(201).json(newUser)

    }
    catch (e) {
        if (e.code === 'P2002') {
            return res.status(400).json({error: "email já esta em uso"})
        }
        console.error(e)
        res.status(500).json({error: "Erro do servidor"})
    }
})

module.exports = route