const mongoose = require('mongoose')

const Cliente = mongoose.model('Cliente', {
    cpf: Number,
    nomeDono: String,
    numeroConta: Number,
    saldoReal: Number,
    saldoTemporario: Number,
    agencia: Number,
    instituicao: String,
    
})

module.exports = Cliente