const express = require('express');
const route = express.Router();
const ControllerSubCommunity = require('../controllers/SubCommunityController');
const SubCommunity = new SubCommunityController()

route.post ('/', (req,res) => {
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