const fazendaModel = require('../models/fazendaModel')


async function registerFazenda(req, res){
    const localidade = req.body.localidade;
    const cepRural = req.body.cepRural;
    const qtdHec = req.body.qtdHec;
    const idAdmin = req.body.idAdmin;

    if(localidade != '' && cepRural != '' && qtdHec != ''){
        if(Number(qtdHec) > 0){
            req.session.hasBeenRegistered = true;
            fazendaModel.registerFazenda(idAdmin, localidade, cepRural, qtdHec);
            return true
        }else{
            req.session.hasError = true;
            req.session.errorMessage = 'É necessário que a quantidade de hectares sejam acima de zero!'
            return false
        }
    }else{
        req.session.hasError = true;
        req.session.errorMessage = 'Preencha todos os campos!'
        return false
    }

}

 
module.exports = {
    registerFazenda
}