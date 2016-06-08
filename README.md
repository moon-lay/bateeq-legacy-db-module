# sql-driver
Module to retrieve data from SQL databases (on-premise or Azure).

# Usage example :
Normal select queries :
```javascript
var db = require('sql-driver');
var db_config = {
    user: '<username>',  
    password: '<password>',
    server: '<sql_server>', // You can use 'localhost\\instance' to connect to named instance
    port: <sql_port>,
    database: '<sql_db_name>',
    debug: false,
    options: {
        encrypt: false // Set this to <true> if you're on Windows Azure
    }
}
var conn = new db.SqlConnection(db_config);
conn.query('SELECT TOP 1 * FROM <your_table_name>').then(result => console.log(result)).catch(error => console.log(error));
```
Executing stored procedure :
```javascript
var db = require('sql-driver');
var db_config = {
    user: '<username>',  
    password: '<password>',
    server: '<sql_server>', // You can use 'localhost\\instance' to connect to named instance
    port: <sql_port>,
    database: '<sql_db_name>',
    debug: false,
    options: {
        encrypt: false // Set this to <true> if you're on Windows Azure
    }
}

var conn = new db.SqlConnection(db_config);
var options = {
    sp_name: '<your_sp_name>',
    params:{
        dateFrom: '',
        dateTo: '',
        branch: ''
    }
}
conn.execSP(options).then(res => console.log(res.data)).catch(err => console.log(err));
```
You can use Stored Procedure if you want to query cross databases.
