const prisma = require('../../configs/PrismaConfig');


class MessageController{
        sendMessage = async (body) => {
            try {
                const content_ = body.content
                const chatId_ = body.chatId
                const userId = body.userId
                
    
                 const message = await prisma.Messages.create({
                    data:{
                        content: content_,
                        chatId: chatId_,
                        userId: userId
                    }
                })
                return message
            }catch (e){
            throw e
            }
        }

        editMessage = async (content)=> {
            try{
                const editMessage = await prisma.messages.edit({
                    data:{
                        content
                    }
                })
                return editMessage

            }catch (e){
                throw e
            }
        }
       
        DeleteMessage = async (id) => {
            try{
                const delmessage = await prisma.messages.finbUnique({
                    where:{
                        id: Number(id)
                    }
                })
                    return delmessage
            }catch (a){
                throw a
            }
        }  
    
        listMessageByChat = async (chatId) => {
            try{
                const messages = await prisma.messages.findMany({
                    where:{
                        chatId: Number(chatId)
                    },
                    orderBy:{
                        id: "asc"
                    }
                }) 
                return ListMessageByChat
            }catch(e){
                throw e
            }
        
        }
}

module.exports = MessageController