const prisma = require('../../configs/PrismaConfig');

class CommunityUser {

    userAddCommunity = async (userId, communityId) => {
        const idU = userId
        const idC = communityId
        const addUser = await prisma.members_community.create({
            data: {
                userId: idU,
                communityId: idC
            }
        })
        return addUser
    }

    userHasCommunity = async (id) => {
        try {
            const id_ = id

            const hasComunnity = await prisma.members_community.findMany({
                where: {
                    userId: id_
                }
            })

            if (!hasComunnity) {
                return null
            }

            return hasComunnity
        }
        catch (e) {
            throw e
        }
    }

    deleteUserCommunity = async (userId, communityId) => {

        try {
            const userId_ = userId
            const communityId_ = communityId
            const delet = await prisma.members_community.delete({
                where: {
                    userId_communityId: {
                        userId: userId_,
                        communityId: communityId_
                    }
                }
            })

            return delet
        }
        catch (e) {
            throw e
        }
    }
}

module.exports = CommunityUser