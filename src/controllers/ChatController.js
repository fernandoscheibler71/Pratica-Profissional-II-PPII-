const prisma = require('../../configs/PrismaConfig');

class ChatController{
    createChat = async (body) => {
       try{ const { subCommunityId } = body

        const chat = await prisma.chat.create({
            data:{
                subCommunityId: Number(subCommunityId)
            }
        }) 
            
        return chat
    }catch (e){
        throw e
        }
    }    
    
    getChatBySubCommunity = async (subCommunityId) => {
        try{
            const chats = await prisma.chat.findMany({
                where:{
                    subCommunityId: Number(subCommunityId)
                }
            })
                return chats
        }catch (a){
            throw a
        }
    }

    getChatByid = async (id) => {
        try{
            const ChatByid = await prisma.chat.findUnique({
            where:{
                id: Number(id)
            }
        }) 
        return ChatByid

        }catch (a){
            throw a
        }
    }

    deleteChat = async (id) => {
        try{
            const delchat = await prisma.chat.delete({
            where:{
                id: Number(id)
            }
        }) 
        return delchat
        }catch(a){
            throw a
        }
    } 
}


module.exports = ChatController