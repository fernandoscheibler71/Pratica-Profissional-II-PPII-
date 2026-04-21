const express = require('express')
const route = express.Router()
const ControllerComunnity = require('../controllers/CommunityController')
const { messages } = require('../../configs/PrismaConfig')
const community = new ControllerComunnity()

route.post('/', async (req, res) => {
    try {
        const create = await community.createCommunity(req.body)
        return res.status(201).json({
            idCommunity: create.id,
            nameCommunity: create.nameCommunity

        })
    }
    catch (e) {
        if (e.code === 'P2002') {
            res.status(400).json({ message: 'Já existe uma comunidade com esse nome' })
        }
        console.log(e)
        return res.status(500).json({ message: 'erro do servidor' })
    }

})

route.delete('/:id', async (req, res) => {
    try {
        const delet = await community.deletCommunity(req.params.id)

        return res.status(200).json({ deleted: delet.nameCommunity })
    }
    catch (e) {
        if (e.code === 'P2025') {
            return res.status(404).json({ message: 'Id não encontrado' })
        }
        console.log(e)
        return res.status(500).json({ message: "Erro servidor" })
    }
})

route.get('/:id', async (req, res) => {
    try {
        const get = await community.getById(req.params.id)
        if (!get) {
            return res.status(404).json({ message: 'Comunidade não encontrada' })
        }
        return res.status(200).json(get)
    }
    catch (e) {
        if (e.code === 'P2025') {
            return res.status(404).json({ message: 'Id não encontrado' })
        }
        return res.status(500).json({ message: "Errodo servidor" })
    }
})

route.get('/', async (req, res) => {
    try {
        const get = await community.getMany()

        if (get == null) {
            return res.status(404).json({ message: 'Nenhum registro encontrado' })
        }

        return res.status(200).json(get)
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ message: "Erro do servidor" })

    }
})

route.put('/', async (req, res) => {
    try {
        const put = await community.putCommunity(req.body)
        if (put === null) {
            return res.status(400).json({ message: 'campos necessários não fornecidos' })
        }
        return res.status(200).json(put)

    }
    catch(e){
        if (e.code === 'P2002') {
            return res.status(400).json({ message: 'Já xiste uma comunidade com esse nome' })
        }
         console.log(e)
         return res.status(500).json({message: 'Erro servidor'})
    }

})
module.exports = route