const prisma = require('../../configs/PrismaConfig');
const jwt = require('jsonwebtoken')

class UserController {
    createUser = async (body) => {

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
        if(info === null){
            return null
        }
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
    
    login = async (body) => {
        const { email, password } = body

        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            throw new Error("Usuário não existe")
        }

        if (user.password !== password) {
            throw new Error("Senha inválida")
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        return { user, token }
    }



}
module.exports = UserController;