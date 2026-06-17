const express = require('express')
const route = express.Router()
const User = require('../controllers/UserController')
const UserController = new User()


route.post('/', async (req, res) => {
    try {
        if (!req.body.name || !req.body.email || !req.body.senha) {
            return res.status(400).json({ error: "Campos obrigatórios faltando" })
        }

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

route.post('/route/login', async (req, res) => {
    try{
        const verify = await UserController.verifyUser(req.body)

        if(verify === null){
            return res.status(404).json({ok: false})
        } else if (verify === false) {
            return res.status(401).json({message: 'Credenciais inválidas'})
        }
        
        return res.status(200).json({ok: true})
}

    catch(e){
        console.log(e)
        res.status(500).json({erro: 'Falha na verificação'})
    }
})
route.get('/:id', async (req, res) => {
    try {
        const info = await UserController.getInfo(req.params.id)
        if (!info) {
            return res.status(400).json({ message: 'usuário não encontrado' })
        }

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
        return res.status(200).json({ id: put.id, newName: put.name })
    }
    catch (e) {
        if (e.code === 'P2025') {
            return res.status(404).json({ message: 'Id não encontrado' })
        }
        console.log(e)
        return res.status(500).json({ message: 'erro do servidor' })
    }
})
module.exports = route