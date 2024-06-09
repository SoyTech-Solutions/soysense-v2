var userModel = require('../models/userModel');

function login(req,res){
    var email = req.body.email;
    var senha = req.body.senha;
    
    userModel.authLogin(email,senha).then((resultadoQuery)=>{
            console.log(resultadoQuery.success);
            if(resultadoQuery.success){
                req.session.authenticated = true

                // criando na sessão um "json", com os dados que foi pego do banco 
                req.session.user = {
                    session_userId: resultadoQuery.bd_userId,
                    session_userName: resultadoQuery.bd_userName,
                    session_userEmail: resultadoQuery.bd_userEmail
                };
                res.redirect('/dashboard')
            }else{
                console.log('eu vim pra aqui')
                req.session.authenticated = false
                req.session.hasError = true;
                req.session.errorMessage = 'Usuário ou senha incorreta. Tente novamente!'
                res.redirect('/')
            }

        }
    );
}

async function getMonitorsRegistered(userId){
    return await userModel.getMonitorsRegistered(userId)
}

async function registerMonitor(req, res){
    const usuario = req.body.usuario;
    const email = req.body.email;
    const senha = req.body.senha;
    const senhaConfirmacao = req.body.senhaConfirmacao;

    if(usuario != '' && email != '' && senha != '' && senhaConfirmacao != ''){
        if(email.includes('@') && email.includes('.')){
            if(senha == senhaConfirmacao){
                req.session.hasBeenRegistered = true;
                // userModel.registerMonitor(usuario, email, senha, );
                return 
            }else{
                req.session.hasError = true;
                req.session.errorMessage = 'As senhas não combinam! Tente novamente.'
                return 
            }
        }else{
            req.session.hasError = true;
            req.session.errorMessage = 'Email inválido! Tente outro.'
            return 
        }
    }else{
        req.session.hasError = true;
        req.session.errorMessage = 'Preencha todos os campos!'
        return 
    }

}

 
module.exports = {
    login,
    getMonitorsRegistered,
    registerMonitor
}