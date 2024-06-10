const express = require('express');
const router = express.Router();

// Rota raiz dentro do grupo /dashboard
router.get('/', function(req, res) {
    if (req.session.authenticated) {

        // dados do usuário
        const user = req.session.user;

        
        res.render('dashboard', {
            userId: user.session_userId,
            userName: user.session_userName,
            userEmail: user.session_userEmail,
            userAdmin: user.session_userAdmin
        });

    }else{
        req.session.hasError = true;
        req.session.errorMessage = 'Faça login antes de acessar a dashboard!'
        res.redirect('/');
    }
});

router.get('/:fazendaId', function(req, res){
    if (req.session.authenticated) {

        // dados do usuário
        const user = req.session.user;
        const fazendaId = req.params.fazendaId
        
        res.render('fazenda', {
            userId: user.session_userId,
            userName: user.session_userName,
            userEmail: user.session_userEmail,
            fazendaId: fazendaId
        });

    }else{
        req.session.hasError = true;
        req.session.errorMessage = 'Faça login antes de acessar a dashboard!'
        res.redirect('/');
    }
})


// testando um ngc n mexe please
module.exports = router;