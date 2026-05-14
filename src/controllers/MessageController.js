const prisma = require('../../configs/PrismaConfig');
const { route } = require('../routes/RouteUser');

class MessageController{
        sendMessage = async (body) => {
            try {
                const {content, chatId} = body
    
                 const Message = await prisma.Messages.create({
                    data:{
                        content, chatId
                        }
                })
                return message
            }catch (e){
            throw e
            }
        }
}

module.express = MessageController