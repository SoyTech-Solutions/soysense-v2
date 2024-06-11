var database = require('../configs/database/connection');
const userModel = require('../models/userModel');

async function registerFazenda(idAdmin, localidade, cepRural, qtdHec){
    console.log('User Model accessed > function registerFazenda');

    const empresaResponse = await userModel.getEmpresaByUsuario(idAdmin);

    if(empresaResponse.success) {
        const sqlCommand = `
            INSERT INTO fazenda VALUE
                (DEFAULT, ?,?,?,?);
        `;

        console.log('Running SQL command: \n' + sqlCommand);

        return await database.execute(sqlCommand, [localidade, cepRural, qtdHec, empresaResponse.bd_idEmpresa]);

    }else {
        return {
            success: false,
            message: 'Error to get monitors registered',
        };
    }
}

module.exports = {
    registerFazenda,
};