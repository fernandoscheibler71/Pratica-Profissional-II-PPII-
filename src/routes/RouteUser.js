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
            return res.status(400).json({ error: "email já esta em uso" })
        }
        console.error(e)
        res.status(500).json({ error: "Erro do servidor" })
    }
})

route.delete('/delet/:id', async (req, res) => {
    try {
        const delet = await UserController.deletUser(req.params.id)
        console.log(delet.email)

        return res.status(200).json({message: `Usuário ${delet.email} deletado com sucesso`})
    }
    catch (e) {
        if (e.code === 'P2025'){
            return res.status(404).json({message: 'Id não encontrado'})
        }
        console.log(e)
        res.status(500).json({ error: "Erro do servidor" })

    }
})

module.exports = route