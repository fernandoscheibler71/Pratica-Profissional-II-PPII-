const express = require('express')
const route = express.Router()

const ChatController = require('../controllers/ChatController')
const chat = new ChatController()

route.post('/chat', async (req, res) => {
    try {
        const body = req.body

        const { subComunnityId } = body

        // validação do body
        if (!body) {
            return res.status(400).json({ error: "Body é necessário" })
        }

        // validação do ID
        if (!subComunnityId || isNaN(Number(subComunnityId))) {
            return res.status(400).json({ error: "subComunnityId deve ser válido" })
        }

        const response = await chat.createChat({
            subComunnityId
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

module.exports = route