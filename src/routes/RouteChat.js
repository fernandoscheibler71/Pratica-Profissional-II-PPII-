const express = require('express')
const route = express.Router()
const prisma = require('../../configs/PrismaConfig')
const ChatController = require('../controllers/ChatController')
const chat = new ChatController()

route.post('/', async (req, res) => {
    try {
        const body = req.body

        const { subCommunityId } = body

        // validação do body
        if (!body) {
            return res.status(400).json({ error: "Body é necessário" })
        }

        // validação do ID
        if (!subCommunityId || isNaN(Number(subCommunityId))) {
            return res.status(400).json({ error: "subCommunityId deve ser válido" })
        }

        const response = await chat.createChat({
            subCommunityId
        })

        return res.status(201).json(response)

    } catch (e) {

        if (e?.code === "P2002") {
            return res.status(400).json({
                message: "Essa relação já existe"
            })
        }

        if (e?.code === "P2003") {
            return res.status(400).json({
                message: "chat não existe"
            })
        }

        console.error(e)

        return res.status(500).json({
            message: "erro interno"
        })
    }
})

route.get('/subcommunity/:id', async (req, res) => {
    try {
        const { id } = req.params
        const response = await chat.getChatBySubCommunity(id)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({ message: "erro interno" })
    }
})

route.get('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const response = await chat.getChatByid(id)
        return res.status(200).json(response)

    } catch (e) {
        return res.status(500).json({ message: "erro interno" })
    }
})

route.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const response = await chat.deleteChat(id)
        return res.status(200).json(response)

    } catch (e) {
        return res.status(500).json({ message: "erro interno" })
    }
})


module.exports = route