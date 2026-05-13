const prisma = require('../../configs/PrismaConfig');

class SubCommunityController { 
    createSubCommunity = async (body) => {
        try {
            const SubCommunity = body  
            const create = await prisma.SubCommunity.create({
                data: {
                    name :  SubCommunity.name
                }
            })
            return create 
        }
        catch (e) {
            throw e
        }
    }

    deleteSubComunity = async (id) => {
        const num = parseInt(id)
        try {
        const delet = await prisma.SubCommunity.delete ({
            where : {
                num: id 
            }
        })
        return delet
        } 
        catch (e) {
            throw e 
        }

    }

    getById = async (id) => {
        try {
            const num = parseInt(id)
            const find = await prisma.SubCommunity.findUnique ({
                where : {
                    num: id 
                }
            })
            return find
        }
        catch (e) {
            throw e 
        }
    }

    getMany = async () => {
        try {
            const findAll = await prisma.SubCommunity.findMany ()

            if (findAll.lenght === 0) {
                console.log('nenhuma subcomunidade existente')
                return null

            }

            return findAll
        }
        catch (e) {
            throw e 
        }
    

    }
    putCommunity = async (body) => {
        if (!body.name || !body.is){
            console.log ('subcomunidade inexistente')
            return null
        }

        try {
            const edit = await prisma.SubCommunity.update ({
                where: {
                    id: body.id
                },
                data: {
                    name: body.name 
                }
            })
            return edit 
        }
        catch (e){
            throw e
        }
    }

}
module.exports = SubCommunityController;