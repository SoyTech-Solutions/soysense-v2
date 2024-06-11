var database = require('../configs/database/connection');

async function registerFazenda(idAdmin, username, email, password){
    console.log('cheguei aqui')
    // console.log('User Model accessed > function registerMonitor');

    // const empresaResponse = await getEmpresaByUsuario(idAdmin);

    // if(empresaResponse.success) {
    //     const sqlCommand = `
    //         INSERT INTO usuario VALUE (DEFAULT, ?, ?, ?, FALSE, ?, NULL)
    //     `;

    //     console.log('Running SQL command: \n' + sqlCommand);

    //     return await database.execute(sqlCommand, [username, email, password, empresaResponse.bd_idEmpresa]);

    // }else {
    //     return {
    //         success: false,
    //         message: 'Error to get monitors registered',
    //     };
    // }
}

module.exports = {
    registerFazenda,
};