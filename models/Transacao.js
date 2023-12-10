const mongoose = require('mongoose')

const Transacao = mongoose.model('Transacao', {
    cpf: Number,
    numeroConta: Number,
    descricao: String,
    contaOrigem: Number,
    contaDestino: String,
    montante: Number,
    juros: Number,
    formaPagamento: String,
    tipoTransacao: String,
    dataEfetuada: Number,
    dataVencimento: Number, 
    
    
})

module.exports = Transacao