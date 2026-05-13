const express = require('express')
const route = express.Router()
const ControllerSubCommunity = require('../controllers/SubComunnityControler');
const { messages } = require('../../configs/PrismaConfig')
const SubCommunity = new ControllerSubCommunity()

route.post ('/', async (req,res) => {
    try {
        const create = await SubCommunity.CreateSubCommunity(req.body)
        return res.status(201).json({
            SubCommunityid: create.SubCommunityid,
            name: create.name
            
        })

        }
    catch (e) {
        if (e.code === 'P2002') {
            res.status(400).json ({message : 'já existe uma subcomunidade com este nome'}) 
        }
        console.log(e)
        res.status(500).json ({message : 'erro no servidor'})
    }

    }
)

route.get('/:id', async (req, res) => {
    try {
        const find = await SubCommunity.getById(req.params.id)
        return res.status(200).json(find)
    }
    catch (e) {
        if (e.code === 'P2025') {
            res.status(404).json ({message: 'ID não encontrado'})
        }
        console.log(e)
        res.status(500).json({message: 'erro no servidor'})
    }
})

route.get ('/', async (req, res) => {
    try {
        const all = await SubCommunity.getMany()
        if (all == null ){
            res.status(404).json ({message: 'Não foi encontrada nenhuma subcomunidade'})
        }
        return res.status (200).json(all)
    }
    catch (e) {
        console.log(e)
        res.status(500).json({message: 'erro no servidor'})
    }
})

route.delete ('/:id', async (req, res) => {
    try {
        const delet = await SubCommunity.deleteSubCommunity(req.params.id)
        return res.status(200).json ({message: 'subcomunidade excluída'})
    }
    catch (e) {
        if (e.code === 'P2025') {
            res.status (404).json ({message: 'ID não encontrado'})
    }
    console.log(e)
    res.status(500).json ({message: 'erro no servidor'})
    }
})

route.put ('/', async (req, res) => {
    try {
        const put = await SubCommunity.putSubCommunity(req.body)
        if (put === null) {
            res.status(400).json ({message: 'não foi possivel editar a subcomunidade pois os campos necessários não foram fornecidos'})
        }
        return res.status(200).json(put)
    }
    catch (e) {
        console.log(e)
        res.status(500).json ({message: 'erro no servidor'})
    }

})
module.exports = route