const prisma = require('../../configs/PrismaConfig');

class UserController {
    createUser = async (body) => {

        console.log(body)
        if (!body.name || !body.email || !body.senha) {
            return { error: "Campos obrigatórios faltando" };
        }

        try {
            const user = await prisma.user.create({
                data: {
                    name: body.name,
                    email: body.email,
                    senha: body.senha
                }

            })
            return user

        }
    catch(e){
        throw e
    }
    
            
    
    }

}
module.exports = UserController;