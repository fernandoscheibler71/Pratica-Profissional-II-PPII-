const prisma = require('../../configs/PrismaConfig')
const jwt = require('jsonwebtoken')

class AuthController {

    login = async (body) => {
        const { email, password } = body

        if (!email || !password) {
            throw new Error("email e password são obrigatórios")
        }

        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            throw new Error("usuário não encontrado")
        }

        if (user.password !== password) {
            throw new Error("senha inválida")
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        return {
            user,
            token
        }
    }
}

module.exports = AuthController