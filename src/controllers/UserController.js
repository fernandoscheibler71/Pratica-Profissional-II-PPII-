const prisma = require('../../configs/PrismaConfig');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController {
    createUser = async (body) => {
    const hash = await bcrypt.hash(body.senha, 10) //recebe a senha do body e transforma numa hash, encriptado.
        try {
            const user = await prisma.user.create({
                data: {
                    name: body.name,
                    email: body.email,
                    senha: hash
                }

            })
            return {
                id: user.id,
                email: user.email,
                nome: user.name,
            };

        }
        catch (e) {
            throw e
        }

    }

    deletUser = async (id) => {
        try {
            const num = parseInt(id)
            const delet = await prisma.user.delete({
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

    getInfo = async (id) => {
        try {
            const num = await parseInt(id)
            const info = await prisma.user.findUnique({
                where: {
                    id: num
                }
            })
            if (info === null) {
                return null
            }
            return {
                id: info.id,
                name: info.name,
                email: info.email
            }
        }

        catch (e) {
            throw e
        }
    }

    verifyUser = async (body) => {
        try {
            const data = await prisma.user.findUnique({
                where: {
                    email: body.email
                }
            })
            if (!data) {
                return null
            }
            console.log(data.senha)
            const verify = await bcrypt.compare(body.senha, data.senha) //aqui se encontra um método em que se compara a senha fornecida pelo usuario com a hash armazenada

            if (!verify){
                return false
            }                                                     //no caso de retornar false, será retornada uma mensagem dizendo que a senha está incorreta

            return data.email
        }
        catch (e) {
            throw e
        }
    
        putInfo = async (body) => {
            if (!body.id) {
                return { message: 'id não fornecido' }
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

    
}
module.exports = UserController;