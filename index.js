//config inicial    
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const cors = require("cors")


//lendo json

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())
app.use(cors())


//Rotas da API

const contaRouters = require('./routes/contaRoutes')
const clienteRouters = require('./routes/clienteRouter')
const transacaoRouters = require('./routes/transacaoRouter')

app.use('/contas', contaRouters)
app.use( '/clientes', clienteRouters)
app.use( '/transacao', transacaoRouters)


//rota inicial /endpoint
app.get('/', (req, res) => {
     
    //mostrar req

    res.json({msg: 'Api funcionando!'})
})

const DB_USER = 'levicpg'
const DB_PASSWORD = 'jvFByZkim8GKegTJ'
const DB_collections = 'banco'
//entregar uma porta
mongoose.connect(
    // mongodb+srv://levicpg:<password>@bancobd.bvwumz6.mongodb.net/?retryWrites=true&w=majority
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@bancobd.bvwumz6.mongodb.net/${DB_collections}?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log('Conectado com sucesso!')
        app.listen(3000)

    })
    .catch((err) => console.log(err))