const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/:fazendaId', async function(req, res){
    if (req.session.authenticated) {

        const fazendaId = req.params.fazendaId;

        // dados do usuário
        const user = req.session.user;

        let fazendasResponse;
        let fazendas;

        fazendasResponse = await userController.getFazendas(user.session_userId);
        fazendas = fazendasResponse.bd_fazendas;


        res.render('fazenda', {
            userId: user.session_userId,
            userName: user.session_userName,
            userEmail: user.session_userEmail,
            userAdmin: user.session_userAdmin,
            userCompany: user.session_userCompany,
            fazendaId: fazendaId,
            fazendas: fazendas
        });


    }else{
        req.session.hasError = true;
        req.session.errorMessage = 'Faça login antes de acessar a dashboard!'
        res.redirect('/');
    }
})


// testando um ngc n mexe please
module.exports = router;