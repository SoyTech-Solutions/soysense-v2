var database = require('../configs/database/connection'); 

async function authLogin(email, senha) {
    console.log('User Model accessed > function autenticarLogin');

    var sqlCommand = `
        SELECT idUsuario, usuario, email FROM usuario WHERE email = "${email}" AND senha = "${senha}";
    `;
    console.log("Running SQL command: \n" + sqlCommand);

    return await database.execute(sqlCommand).then(resultQuery => {
    
        if (resultQuery && resultQuery.length > 0) {
            // Se houver pelo menos um resultado, significa que o login foi bem-sucedido
            // Após o login bem-sucedido
            return {
                 success: true, 
                 bd_userId: resultQuery[0].idUsuario,
                 bd_userName: resultQuery[0].usuario,
                 bd_userEmail: resultQuery[0].email
            };
        } else {
            // Se o resultado estiver vazio, significa que o login falhou
            return { 
                success: false,
                 message: 'Credenciais de login inválidas.' 
            };
        }
    })
    .catch(error => {
        // Se ocorrer um erro durante a execução da consulta SQL, capture e manipule-o aqui
        console.error(error);
        return { success: false, message: 'Error to execute auth login' };
    });;
}

async function getEmpresaByUsuario(userId){
    console.log('User Model accessed > function getEmpresaByUsuario');

    var sqlCommand = `
        SELECT empresa.idEmpresa
        FROM empresa
        JOIN usuario ON empresa.idEmpresa = usuario.fkEmpresa
        WHERE usuario.idUsuario = ${userId}; 
    `;

    console.log('Running SQL command: \n' + sqlCommand);

    return await database.execute(sqlCommand).then(resultQuery => {
    
        if (resultQuery && resultQuery.length > 0) {
            // Se houver pelo menos um resultado, significa que o login foi bem-sucedido
            // Após o login bem-sucedido
            return {
                 success: true, 
                 bd_idEmpresa: resultQuery[0].idEmpresa,
            };
        } else {
            // Se o resultado estiver vazio, significa que o login falhou
            return { 
                success: false
            };
        }
    })
    .catch(error => {
        // Se ocorrer um erro durante a execução da consulta SQL, capture e manipule-o aqui
        console.error(error);
        return { success: false };
    });;
}
async function getMonitorsRegistered(userId) {
    console.log('User Model accessed > function getMonitorRegistered');

    const empresaResponse = await getEmpresaByUsuario(userId);
        
    if (empresaResponse.success) {
        const sqlCommand = `
            SELECT idUsuario, usuario, email, administrador
            FROM usuario 
            WHERE fkEmpresa = ${empresaResponse.bd_idEmpresa};
        `;
        
        console.log('Running SQL command: \n' + sqlCommand);

        const resultQuery = await database.execute(sqlCommand);

        if (resultQuery && resultQuery.length > 0) {
            return {
                success: true,
                bd_monitors: resultQuery,
            };
        } else {
            return {
                success: false,
                message: 'Credenciais de login inválidas.',
            };
        }
    } else {
        return {
            success: false,
            message: 'Error to get monitors registered',
        };
    }
}

async function registerMonitor(idAdmin, username, email, password){
    console.log('User Model accessed > function registerMonitor');

    const empresaResponse = await getEmpresaByUsuario(idAdmin);

    if(empresaResponse.success) {
        
        const sqlCommand = `
            INSERT INTO usuario VALUE
            (DEFAULT, '${username}','${email}','${password}', FALSE, ${empresaResponse.bd_idEmpresa}, NULL);
        `;
    
        console.log('Running SQL command: \n' + sqlCommand);

        return await database.execute(sqlCommand);

    }else {
        return {
            success: false,
            message: 'Error to get monitors registered',
        };
    }
}
module.exports = {
    authLogin,
    getEmpresaByUsuario,
    getMonitorsRegistered,
    registerMonitor
};