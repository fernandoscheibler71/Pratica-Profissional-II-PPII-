const express = require('express')
const routes = express.Router()
const MessageController = require('../controllers/MessageController')
const message = new MessageController()

routes.post('/', async (req, res)=>{
    try{
        const { content, chatId } = req.body

        if(!content || !content.trim() || !chatId){
            return res.status(400).json({
                error: "content e chatId são obrigatórios"
            })
        }

        if(isNaN(   chatId)){
            return res.status(400).json({
                error: "O id do chat deve ser válido"
            })
        }

          const result = await message.sendMessage(req.body)

            return res.status(201).json(result)

    } catch (e){

        if(e.code === "P2002"){
            return res.status(400).json({
                message: "Essa relação já existe"
            })
        }

        if(e.code === "P2003"){
            return res.status(400).json({
                message: "chat não existe"
            })
        }

        console.error(e)

        return res.status(500).json({
            message: "erro não encontrado"
        })
    }
})

routes.get('/:chatId', async (req, res) => {
    try {
        const { chatId } = req.params

        const messages = await message.listMessagesByChat(chatId)

        if (!messages || messages.length === 0) {
            return res.status(404).json({
                message: 'Mensagem não encontrada'
            })
        }

        return res.status(200).json(messages)

    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: "Erro do servidor"
        })
    }
})

module.exports = routes