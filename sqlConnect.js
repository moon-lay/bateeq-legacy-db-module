var sql = require('mssql');

function SqlConnect(config) {
    configuration = {
        user: config.user,
        password: config.password,
        server: config.server,
        port: config.port,
        database: config.database,
        options: {
            encrypt: config.options.encrypt
        }
    };
}

SqlConnect.prototype.getConnection = function getConnection() {
    return new sql.Connection(configuration);
}

SqlConnect.prototype.query = function getQueryResult(sqlString, connection) {
    return new Promise(function (fulfill, reject) {
        if (connection) {
            // try to connect using specified connection
            connection.connect().then(function () {
                // create a new request
                var request = new sql.Request(connection);
                request.query(sqlString, function (err, recordset) {
                    if (err)
                        reject({
                            code: err.code,
                            message: err.message
                        });
                    else
                        fulfill({
                            query: sqlString,
                            result: recordset
                        });
                });
            }).catch(err => reject({
                code: err.code,
                message: err.message
            }));
        }
        else
            reject('SQL Connection is not available.');
    })

}
module.exports = SqlConnect;
