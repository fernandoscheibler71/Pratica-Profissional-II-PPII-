const express = require('express')
const route = express.Router()

const ChatController = require('../controllers/ChatController')
const chat = new ChatController()

route.post('/message', async (req, res) => {
    try {
        const body = req.body

        // validação
        if (!body) {
            return res.status(400).json({ error: "Body é necessário" })
        }

        if (!body.chatId || isNaN(body.chatId)) {
            return res.status(400).json({ error: "chatId deve ser válido" })
        }

        if (!body.content) {
            return res.status(400).json({ error: "content é obrigatório" })
        }

        const response = await chat.sendMessage(body)

        return res.status(201).json(response)

    } catch (e) {

        if (e.code === "P2002") {
            return res.status(400).json({
                message: "Essa relação já existe"
            })
        }

        if (e.code === "P2003") {
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

module.exports = route