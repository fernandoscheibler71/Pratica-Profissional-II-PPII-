const prisma = require('../../configs/PrismaConfig');

class SubCommunityController { 
    createSubCommunity = async (body) => {
        try {
            const SubCommunity = body  
            const create = await prisma.subCommunity.create({
                data: {
                    name:  SubCommunity.name,
                    communityId: SubCommunity.communityId
                }
            })
            return create 
        }
        catch (e) {
            throw e
        }
    }

    deleteSubCommunity = async (id) => {
        const num = parseInt(id)
        try {
        const delet = await prisma.subCommunity.delete ({
            where : {
                SubCommunityId: num 
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
            const find = await prisma.subCommunity.findUnique ({
                where : {
                    SubCommunityId: num
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
            const findAll = await prisma.subCommunity.findMany ()

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
    putSubCommunity = async (body) => {
        if (!body.name || !body.is){
            console.log ('dados faltando')
            return null
        }

        try {
            const edit = await prisma.subCommunity.update ({
                where: {
                    SubCommunityId: body.SubCommunityId
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