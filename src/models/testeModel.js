var database = require('../configs/database/connection');

function cadastrar(representante, email, senha) {
    console.log("Teste Model accessed > function autenticarLogin");

    var comandoSql = `
       INSERT INTO teste VALUE
        (DEFAULT, "${representante}", "${email}", "${senha}");
    `;
    console.log("Executando o comando SQL: \n" + comandoSql);

    return database.execute(comandoSql).then(() => {
        return { 
            success: true,
            message: 'Cadastrado com sucesso!' 
        
        };
    })
    .catch(error => {
        // Se ocorrer um erro durante a execução da consulta SQL, capture e manipule-o aqui
        console.error('Erro ao autenticar login:', error);
        return { 
            success: false,
            message: 'Ocorreu um erro durante o cadastro, verifique a intrução SQL' 
        
        };
    });;
}

module.exports = {
    cadastrar,
};