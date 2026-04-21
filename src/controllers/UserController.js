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
                id: user.id,
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

    getInfo = async (id) => {
     try{
        const num = await parseInt(id)
        const info = await prisma.user.findUnique({
            where: {
                id: num
            }
        })
        return {
            id: info.id,
            name: info.name,
            email: info.email
        } 
     }
     
     catch(e){
        throw e
     }
    }
    
    putInfo = async (body) => {
        if (!body.id){
            return {message: 'id não fornecido'}
        }
        const id = parseInt(body.id)
        const put = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                name: body.name
            }
        })
        return put 
    } 

}
module.exports = UserController;