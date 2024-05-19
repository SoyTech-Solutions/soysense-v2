var testeModel = require('../models/testeModel');

function validarCadastro(req,res){
    var representante = req.body.representante;
    var email = req.body.email;
    var senha = req.body.senha;
    
    console.log(`
        Representante: ${representante}   \n
        Email: ${email} \n
        Senha: ${senha}      
    `)

    testeModel.cadastrar(representante, email, senha).then(function(resultado){
        console.log(resultado);

        if(resultado.success){
            req.session.foiCadastrado = true
            res.redirect('/teste')
        }else{
            req.session.foiCadastrado = false
            console.log('Algum erro ocorreu ao cadastrar teste')
            res.redirect('/teste')
        }

    })
}
module.exports = {
    validarCadastro
}