# bateeq-legacy-db-module
Module to retrieve data from Bateeq legacy database.

# Usage example :
```javascript
var db = require('bateeq-legacy-db-module');
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
