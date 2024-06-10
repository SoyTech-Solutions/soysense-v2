const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota raiz dentro do grupo /dashboard
router.get('/', async function(req, res) {
    if (req.session.authenticated) {

        // dados do usuário
        const user = req.session.user;

        let fazendasResponse;
        let fazendas;
         
        console.log(user.session_userAdmin);

        fazendasResponse = await userController.getFazendas(user.session_userId);
        fazendas = fazendasResponse.bd_fazendas;

        
 
        res.render('dashboard', {
            userId: user.session_userId,
            userName: user.session_userName,
            userEmail: user.session_userEmail,
            userAdmin: user.session_userAdmin,
            userCompany: user.session_userCompany,
            fazendas: fazendas
        });

    }else{
        req.session.hasError = true;
        req.session.errorMessage = 'Faça login antes de acessar a dashboard!'
        res.redirect('/');
    }
});

router.get('/fazenda/:fazendaId', function(req, res){
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
module.exports = router;