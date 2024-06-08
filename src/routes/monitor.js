const express = require('express');
const router = express.Router();
var userController = require("../controllers/userController");

// Rota raiz dentro do grupo /dashboard
router.get('/', function(req, res) {
    if (req.session.authenticated) {

        // dados do usuário
        const user = req.session.user;

        
        res.render('monitor', {
            userId: user.session_userId,
            userName: user.session_userName,
            userEmail: user.session_userEmail,
        });

    }else{
        req.session.hasError = true;
        req.session.errorMessage = 'Faça login antes de acessar a aba de monitores!'
        res.redirect('/');
    }
});
router.get('/iframe', function(req, res) {
    if (req.session.authenticated) {

        // dados do usuário
        const user = req.session.user;

        
        res.render('monitorIframe', {
            userId: user.session_userId,
            userName: user.session_userName,
            userEmail: user.session_userEmail,
        });

    }else{
        req.session.hasError = true;
        req.session.errorMessage = 'Faça login antes de acessar a aba de monitores!'
        res.redirect('/');
    }
});



module.exports = router;