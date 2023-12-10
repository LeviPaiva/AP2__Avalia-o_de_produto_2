const mongoose = require('mongoose')

const Conta = mongoose.model('Conta', {
    cpf: Number,
    nomeCompleto: String,
    anoNascimento: Number,
    telefone: Number,
    logradouro: String,
    numeroConta: Number,
})

module.exports = Conta