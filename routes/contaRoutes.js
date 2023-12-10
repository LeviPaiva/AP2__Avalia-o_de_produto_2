const router = require('express').Router()

const Conta = require('../models/Conta')


//Criando dado
router.post('/', async (req, res) => {

    //req.body
    const { cpf,
            nomeCompleto,
            anoNascimento,
            telefone,
            logradouro,
            numeroConta,
                            } = req.body

    if (!cpf || !numeroConta){
        res.status(422).json({ erro: 'CPF o numero da conta são obrigatórios!' })
        return

        
    }

    const conta = {
        cpf,
        nomeCompleto,
        anoNascimento,
        telefone,
        logradouro,
        numeroConta,
    }

    try {
        //criando dados
        await Conta.create(conta)

        res.status(201).json({ message: 'Dados adicionados com sucesso!' })
    } catch (error) {
        res.status(500).json({ error: error })
    }

})


//Resgatando dados

router.get('/', async (req, res) => {
    try {

        const conta = await Conta.find()

        res.status(200).json(conta)
    } catch {
        res.status(500).json({ error: erro })
    }
})

router.get('/:cpf', async (req, res) => {
    // console.log(req)
    //extraindo dado da requisição

    const cpf = req.params.cpf

    try {
        const conta = await Conta.findOne({ cpf: cpf })

        if (!conta) {
            res.status(442).json({ message: 'Usuário não foi encontrado.' })
            return
        }

        res.status(200).json(conta)

    } catch (error) {
        res.status(500).json({ error: error })
    }


})

// Update - atualização de dados (put, patch)
//put atualização total, patch é parcial.

router.patch('/:cpf', async (req, res) => {

    const _cpf = req.params.cpf

    const {cpf, 
        nomeCompleto,
        anoNascimento,
        telefone,
        logradouro,
        numeroConta, } = req.body

    const conta = {
        cpf,
        nomeCompleto,
        anoNascimento,
        telefone,
        logradouro,
        numeroConta,
    }

    try {

        const updatedConta = await Conta.updateOne({ cpf: _cpf }, conta)

        if (updatedConta.matchedCount === 0) {
            res.status(442).json({ message: 'Usuário não foi encontrado.' })
            return
        }

        res.status(200).json(conta)

    } catch (error) {
        res.status(500).json({ error: error })
    }

})

//Deletar dados

router.delete('/:cpf', async (req, res) => {

    const cpf = req.params.cpf

    const conta = await Conta.findOne({ cpf: cpf })

    if (!conta) {
        res.status(442).json({ message: 'Usuário não foi encontrado.' })
        return
    }

    try {

        await Conta.deleteOne({ cpf: cpf })

        res.status(200).json({ message: 'Usuário removido com sucesso!' })

    } catch (error) {
        res.status(500).json({ error: error })
    }

})

module.exports = router