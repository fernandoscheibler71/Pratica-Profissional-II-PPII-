require('dotenv').config()
const cors = require ('cors')


const express = require('express')
const app = express()
const port = 3000
app.use(express.json())
app.use(express.json())
const user = require('./routes/RouteUser')
const community = require('./routes/RouteCommunity')
const subCommunity  = require('./routes/RouteSubComunity')
const communityUser = require('./routes/RouteCommunityUser')
const chat = require('./routes/RouteChat')
const message = require('./routes/RouteMessage')
const auth = require('./routes/RouteAuth')

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use('/user', user)
app.use('/community', community)
app.use('/subcommunity', subCommunity)
app.use('/CommunityUser', communityUser)
app.use('/chat', chat)
app.use('/message', message)
app.use('/auth', auth)



app.get('/', (req, res) => {
    console.log('Server Rodando')
    res.send('Rota / rodando')
})

app.listen(port, () => {
    console.log(`Server rodando na porta: ` + port)
})
