var sql = require('mssql'); 

function SqlConnect(config){
    configuration = {
        user: config.user,
        password: config.password,
        server: config.server,
        port: config.port,
        database: config.database,
        options: {
            encrypt: config.encrypt
        }
    };
}

SqlConnect.prototype.query = function getQueryResult(sqlString){
    
    return new Promise(function(fulfill, reject){
       var connection = new sql.Connection(configuration, function(err){
           if (err) {
               reject(err);
           } 
           else {
               var request = new sql.Request(connection);
               request.query(sqlString).then(result => fulfill(result)).catch( error => reject(error));
           }  
       });
    });
}


module.exports = SqlConnect;


