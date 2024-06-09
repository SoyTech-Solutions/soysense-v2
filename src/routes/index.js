const express = require('express');
const router = express.Router();
var userController = require("../controllers/userController");

// Rota raiz dentro do grupo /
router.get('/', function(req, res) {
    if (!req.session.authenticated) {

        let errorMessage = '';
        let hasError = false;

        if(req.session.hasError){
            errorMessage = req.session.errorMessage;
            hasError = req.session.hasError;

            delete req.session.hasError;
            delete req.session.errorMessage;
            
            console.log(errorMessage);
        }

        res.render('login', { 
            hasError: hasError,
            errorMessage: errorMessage
         });

    }else{
        res.redirect('/dashboard');
    }
});

router.post('/', function(req,res){
    // A solicitação é do tipo POST, então você pode continuar com o processamento
    userController.login(req,res);
});



module.exports = router;