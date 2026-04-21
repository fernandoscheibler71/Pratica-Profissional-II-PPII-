const prisma = require('../../configs/PrismaConfig');

class CommunityController {
    createCommunity = async (body) => {
        try {
            const community = body
            const create = await prisma.community.create({
                data: {
                    nameCommunity: community.nameCommunity
                }
            })
            return create

        }
        catch (e) {
            throw e
        }
    }

    deletCommunity = async (id) => {
        const num = parseInt(id)
        try {
            const delet = prisma.community.delete({
                where: {
                    id: num
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
            const community = await prisma.community.findUnique({
                where: {
                    id: num
                }
            })

            return community

        }
        catch(e){
            throw e
        }
    }

    getMany = async () => {
        try {
            const all = await prisma.community.findMany()

            if (all.length === 0) {
                console.log('if all')
                return null
            }
            return all
        }
        catch (e) {
            throw e
        }
    }
    
    putCommunity = async (body) => {
        
        try {
            if(!body.nameCommunity || !body.is){
                return null
            }
            const put = prisma.community.update({
                where: {
                    id: body.id
                },
                data: {
                    nameCommunity: body.nameCommunity
                }
            })

            return put
            
        }
        catch(e){
            throw e
        }
        
        
    }

}

module.exports = CommunityController