const express = require('express');
const router = express.Router();
var userController = require("../controllers/userController");

// Rota raiz dentro do grupo /
router.get('/', function(req, res) {
    if (!req.session.authenticated) {
        res.render('login'); // Defina o valor de userId conforme necessário
    }else{
        res.redirect('/dashboard');
    }
});

router.post('/', function(req,res){
    // A solicitação é do tipo POST, então você pode continuar com o processamento
    userController.login(req,res);
});

module.exports = router;