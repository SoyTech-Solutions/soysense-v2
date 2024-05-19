// requisitando a conexão com banco de dados
var database = require('../configs/database/connection');


// função de cadastrar, que precisa de 3 parametros pra executar
function cadastrar(representante, email, senha) {

    // cria uma STRING (texto), que contem a instrução SQL
    var comandoSql = `
       INSERT INTO teste VALUE
        (DEFAULT, "${representante}", "${email}", "${senha}");
    `;

    // apresentando a instrução no console
    console.log("Executando o comando SQL: \n" + comandoSql);


    // usando a conexão com o banco, passa a instrução criada
    //  como parametro na função de executar
    return database.execute(comandoSql).then(() => { // ENTÃO(then),
        // retorna um "JSON"
        return { 
            success: true,
            message: 'Cadastrado com sucesso!' 
        
        };
    }) // se capturado algum erro no processo, joga esse erro no console e retorna success como falso
    .catch(error => {
        // Se ocorrer um erro durante a execução da consulta SQL, capture e manipule-o aqui
        console.error('Erro ao cadastrar:', error);
        return { 
            success: false,
            message: 'Ocorreu um erro durante o cadastro, verifique a intrução SQL' 
        
        };
    });;
}

module.exports = {
    cadastrar,
};