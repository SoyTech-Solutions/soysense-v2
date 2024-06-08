// ======== TESTE ==========
const express = require('express'); // configurador do servidor web
const router = express.Router(); // middleware que gerencia as rotas
var testeController = require("../controllers/testeController"); // controlador


// Rota raiz dentro do grupo /dashboard
router.get('/', function(req, res) {
    if (req.session.authenticated) {

        // dados do usuário
        const user = req.session.user;

        
        res.render('fazenda-teste', {
            userId: user.session_userId,
            userName: user.session_userName,
            userEmail: user.session_userEmail,
        });

    }else{
        req.session.hasError = true;
        req.session.errorMessage = 'Faça login antes de acessar a dashboard!'
        res.redirect('/');
    }
});

// // rota POST, que ficara escutando caso requisição chegue aqui enviando algum dado de formulário
// // rota dentro do grupo /teste, ou seja /teste/cadastrar
// router.post('/cadastrar', function(req,res){
//     // pós chegar a requisição POST
//     // usa um controlador para validar os dados enviados
//     testeController.validarCadastro(req, res);
// })



// exportando esse grupo de rotas
module.exports = router;