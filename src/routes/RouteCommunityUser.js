const express = require('express')
const route = express.Router()
const CommunityUser = require('../controllers/CommunityUserController')
const comUser = new CommunityUser()

route.post('/', async (req, res) => {
    try {
        if (!req.body.userId || !req.body.communityId) {
            return res.status(404).json({ error: "Campos obrigatórios faltando" })

        }
        const addUserCommunity = await comUser.userAddCommunity(req.body.userId, req.body.communityId)
        console.log(addUserCommunity)


        return res.status(201).json({ message: 'ok' })
    }
    catch (e) {
        if (e.code === "P2002") {
            res.status(400).json({ message: "essa relação já existe" })
        }
        else if (e.code === "P2003"){
            res.status(400).json({message: "Usuário ou comunidade não encontrado"})
        }
        console.log(e)
    }
})

route.get('/', async (req, res) => {
    try {
        if (!req.body.userId) {
            return res.status(400).json({ message: "id não repassado" })
        }

        const hasCommunity = await comUser.userHasCommunity(req.body.userId)

        if (hasCommunity.length === 0) {
            return res.status(404).json({ message: 'usuário não pertence a uma comunidade' })
        }


        return res.status(200).json(hasCommunity)
    }
    catch (e) {
        return res.status(500).json({message: 'erro do servidor'})
    }
})

route.delete('/', async (req, res) => {
    try {
        if (!req.body.userId || !req.body.communityId) {
            return res.status(400).json({ message: "campos faltando" })
        }
        const delet = await comUser.deleteUserCommunity(req.body.userId, req.body.communityId)

        return res.status(200).json({ message: 'deletado' })

    }
    catch (e) {
        if (e.code === 'P2025') {
            return res.status(400).json({ message: 'relação não existe' })
        } else {
            return res.status(500).json({ message: 'Erro do servidor' })
        }
        console.log(e)
    }
})


module.exports = route