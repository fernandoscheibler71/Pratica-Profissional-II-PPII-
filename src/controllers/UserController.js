const { json } = require('express');
const prisma = require('../../configs/PrismaConfig');

class UserController {
    createUser = async (body) => {

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
            return {
                email: user.email,
                nome: user.name
            };

        }
        catch (e) {
            throw e
        }

    }

    deletUser = async (id) => {
        try{
            const num = parseInt(id)
            const delet = await prisma.user.delete({
                where: {
                    id: num
                }
            })
            return delet
        }
        catch(e){
            throw e
        }
    }
    

}
module.exports = UserController;