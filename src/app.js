const express = require('express')
const app = express()
const port = 3000
app.use(express.json())

const user = require('./routes/RouteUser')
const community = require('./routes/RouteCommunity')

app.use('/user', user)
app.use('/community', community)

app.get('/', (req, res) => {
    console.log('Server Rodando')
    res.send('Rota / rodando')
})

app.listen(port, () => {
    console.log(`Server rodando na porta: ` + port)
})