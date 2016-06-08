var sql = require('mssql');

function SqlConnect(config) {
    this.configuration = {
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

SqlConnect.prototype.query = function getQueryResult(sqlString) {
    var connection = new sql.Connection(this.configuration);
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
                        fulfill(recordset);
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

SqlConnect.prototype.execSP = function getResult(options) {
    var connection = new sql.Connection(this.configuration);
    return new Promise(function (fulfill, reject) {
        if (connection) {
            connection.connect().then(function () {
                if (!options.hasOwnProperty('sp_name'))
                    reject('sp_name is missing.');

                // create a new request
                var request = new sql.Request(connection);
                request.multiple = false;
                if (options.hasOwnProperty('params')) {
                    Object.keys(options.params).forEach(function (key) {
                        var value = options.params[key];
                        switch (Object.prototype.toString.call(value)) {
                            case "[object String]":
                                request.input(key, sql.NVarChar, value);
                                break;
                            case "[object Number]":
                                request.input(key, sql.Int, value);
                                break;
                            case "[object Date]":
                                request.input(key, sql.DateTime, value);
                                break;
                            default:
                                request.input(key, sql.NVarChar, value);
                                break;
                        }
                    })
                }

                request.execute(options.sp_name, function (err, recordset, returnValue, affected) {
                    if (err)
                        reject({
                            code: err.code,
                            message: err.message
                        })
                    else {
                        fulfill({
                            retVal: returnValue,
                            affected: affected,
                            data: recordset[0]
                        })
                    }
                });
            }).catch(err => reject({
                code: err.code,
                message: err.message
            }));
        }
        else
            reject('SQL Connection is not available');
    });
}

module.exports = SqlConnect;
