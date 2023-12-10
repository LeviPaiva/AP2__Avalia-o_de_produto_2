const router = require('express').Router()

const Cliente = require('../models/Cliente')


//Criando dado
router.post('/', async (req, res) => {

    //req.body
    const { cpf,
        nomeDono,
        numeroConta,
        saldoReal,
        saldoTemporario,
        agencia,
        instituicao,        
                            } = req.body

    if (!cpf || !numeroConta){
        res.status(422).json({ erro: 'CPF o numero da conta são obrigatórios!' })
        return
    }

    const cliente = {
        cpf,
        nomeDono,
        numeroConta,
        saldoReal,
        saldoTemporario,
        agencia,
        instituicao,     
    }

    try {
        //criando dados
        await Cliente.create(cliente)

        res.status(201).json({ message: 'Dados adicionados com sucesso!' })
    } catch (error) {
        res.status(500).json({ error: error })
    }

})


//Resgatando dados

router.get('/', async (req, res) => {
    try {

        const cliente = await Cliente.find()

        res.status(200).json(cliente)
    } catch {
        res.status(500).json({ error: erro })
    }
})

router.get('/:cpf', async (req, res) => {
    // console.log(req)
    //extraindo dado da requisição

    const cpf = req.params.cpf

    try {
        const cliente = await Cliente.findOne({ cpf: cpf })

        if (!cliente) {
            res.status(442).json({ message: 'Usuário não foi encontrado.' })
            return
        }

        res.status(200).json(cliente)

    } catch (error) {
        res.status(500).json({ error: error })
    }


})

// Update - atualização de dados (put, patch)
//put atualização total, patch é parcial.

router.patch('/:cpf', async (req, res) => {

    const _cpf = req.params.cpf

    const {cpf,
        nomeDono,
        numeroConta,
        saldoReal,
        saldoTemporario,
        agencia,
        instituicao,      } = req.body

    const cliente = {
        cpf,
        nomeDono,
        numeroConta,
        saldoReal,
        saldoTemporario,
        agencia,
        instituicao,     
    }

    try {

        const updatedConta = await Cliente.updateOne({ cpf: _cpf }, cliente)

        if (updatedConta.matchedCount === 0) {
            res.status(442).json({ message: 'Usuário não foi encontrado.' })
            return
        }

        res.status(200).json(cliente)

    } catch (error) {
        res.status(500).json({ error: error })
    }

})

//Deletar dados

router.delete('/:cpf', async (req, res) => {

    const cpf = req.params.cpf

    const cliente = await Cliente.findOne({ cpf: cpf })

    if (!cliente) {
        res.status(442).json({ message: 'Usuário não foi encontrado.' })
        return
    }

    try {

        await Cliente.deleteOne({ cpf: cpf })

        res.status(200).json({ message: 'Usuário removido com sucesso!' })

    } catch (error) {
        res.status(500).json({ error: error })
    }

})

module.exports = router