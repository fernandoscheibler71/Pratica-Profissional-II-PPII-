const prisma = require('../../configs/PrismaConfig');

class ChatController{
    createChat = async (body) => {
       try{ const { subComunnityId } = body

        const chat = await prisma.chat.create({
            data:{
                subComunnityId
            }
        }) 
            
        return chat
    }catch (e){
        throw e
    }
}      
}

module.exports = MessageController