require('dotenv').config()

console.log("ENV:", process.env.DATABASE_URL)

const express = require('express')
const app = express()
const port = 3000
app.use(express.json())
const cors = require ('cors')

app.use(cors({
  origin: "https://nextweb-front.vercel.app"
}));

const user = require('./routes/RouteUser')
const community = require('./routes/RouteCommunity')
const communityUser = require('./routes/RouteCommunityUser')
<<<<<<< Updated upstream


=======
const chat = require('./routes/RouteChat')
const message = require('/routes/RouteMessage')
>>>>>>> Stashed changes
app.use('/user', user)
app.use('/community', community)
app.use('/CommunityUser', communityUser)
app.use('/chat', chat)
app.use('/message',message)
app.get('/', (req, res) => {
    console.log('Server Rodando')
    res.send('Rota / rodando')
})

app.listen(port, () => {
    console.log(`Server rodando na porta: ` + port)
})

