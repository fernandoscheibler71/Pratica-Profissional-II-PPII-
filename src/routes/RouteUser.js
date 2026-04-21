const express = require('express')
const route = express.Router()
const User = require('../controllers/UserController')
const UserController = new User()


route.post('/', async (req, res) => {
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

route.delete('/:id', async (req, res) => {
    try {
        const delet = await UserController.deletUser(req.params.id)

        return res.status(200).json({ message: `Usuário ${delet.email} deletado com sucesso` })
    }
    catch (e) {
        if (e.code === 'P2025') {
            return res.status(404).json({ message: 'Id não encontrado' })
        }
        console.log(e)
        res.status(500).json({ error: "Erro do servidor" })

    }
})

route.get('/:id', async (req, res) => {
    try {
        const info = await UserController.getInfo(req.params.id)
        return res.status(200).json(info)

    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'erro do servidor' })
    }
})


route.put('/', async (req, res) => {
    try {
        const put = await UserController.putInfo(req.body)
        return res.status(200).json({id: put.id, newName: put.name})
    }
    catch(e) {
        if (e.code === 'P2025') {
            return res.status(404).json({ message: 'Id não encontrado' })
        }
        console.log(e)
        return res.status(500).json({ message: 'erro do servidor' })    }
})
module.exports = route