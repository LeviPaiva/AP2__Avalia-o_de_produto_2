const router = require('express').Router()

const Transacao = require('../models/Transacao')


//Criando dado
router.post('/', async (req, res) => {

    //req.body
    const { cpf, 
        numeroConta,
        descricao,
        contaOrigem,
        contaDestino,
        montante,
        juros,
        formaPagamento,
        tipoTransacao,
        dataEfetuada,
        dataVencimento,        
                            } = req.body

    if (!cpf || !numeroConta){
        res.status(422).json({ erro: 'CPF o numero da conta são obrigatórios!' })
        return

        
    }

    const transacao = {
        cpf, 
        numeroConta,
        descricao,
        contaOrigem,
        contaDestino,
        montante,
        juros,
        formaPagamento,
        tipoTransacao,
        dataEfetuada,
        dataVencimento, 
    }

    try {
        //criando dados
        await Transacao.create(transacao)

        res.status(201).json({ message: 'Dados adicionados com sucesso!' })
    } catch (error) {
        res.status(500).json({ error: error })
    }

})


//Resgatando dados

router.get('/', async (req, res) => {
    try {

        const transacao = await Transacao.find()

        res.status(200).json(transacao)
    } catch {
        res.status(500).json({ error: erro })
    }
})

router.get('/:cpf', async (req, res) => {
    // console.log(req)
    //extraindo dado da requisição

    const cpf = req.params.cpf

    try {
        const transacao = await Transacao.findOne({ cpf: cpf })

        if (!transacao) {
            res.status(442).json({ message: 'Usuário não foi encontrado.' })
            return
        }

        res.status(200).json(transacao)

    } catch (error) {
        res.status(500).json({ error: error })
    }


})

// Update - atualização de dados (put, patch)
//put atualização total, patch é parcial.

router.patch('/:cpf', async (req, res) => {

    const _cpf = req.params.cpf

    const {cpf, 
        numeroConta,
        descricao,
        contaOrigem,
        contaDestino,
        montante,
        juros,
        formaPagamento,
        tipoTransacao,
        dataEfetuada,
        dataVencimento,  } = req.body

    const transacao = {
        cpf, 
        numeroConta,
        descricao,
        contaOrigem,
        contaDestino,
        montante,
        juros,
        formaPagamento,
        tipoTransacao,
        dataEfetuada,
        dataVencimento, 
    }

    try {

        const updatedConta = await Transacao.updateOne({ cpf: _cpf }, transacao)

        if (updatedConta.matchedCount === 0) {
            res.status(442).json({ message: 'Usuário não foi encontrado.' })
            return
        }

        res.status(200).json(transacao)

    } catch (error) {
        res.status(500).json({ error: error })
    }

})

//Deletar dados

router.delete('/:cpf', async (req, res) => {

    const cpf = req.params.cpf

    const transacao = await Transacao.findOne({ cpf: cpf })

    if (!transacao) {
        res.status(442).json({ message: 'Usuário não foi encontrado.' })
        return
    }

    try {

        await Transacao.deleteOne({ cpf: cpf })

        res.status(200).json({ message: 'Usuário removido com sucesso!' })

    } catch (error) {
        res.status(500).json({ error: error })
    }

})

module.exports = router