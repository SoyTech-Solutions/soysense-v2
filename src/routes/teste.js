// ======== TESTE ==========
const express = require('express');
const router = express.Router();
var testeController = require("../controllers/testeController");

// rota GET, pra renderizar a tela de cadastro chamada teste
router.get('/',function(req,res){

    let foiCadastrado = false;

    if(req.session.foiCadastrado){
        foiCadastrado = req.session.foiCadastrado;
    }

    res.render('teste', { 
        estaCadastrado: foiCadastrado
     });
     
})

// rota POST, que ficara escutando caso requisição chegue aqui enviando algum dado de formulário
router.post('/cadastrar', function(req,res){
    testeController.validarCadastro(req, res);
})


module.exports = router;