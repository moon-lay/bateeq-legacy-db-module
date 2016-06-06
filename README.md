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
        encrypt: false // Use this if you're on Windows Azure
    }
}
var conn = new db.SqlConnection(db_config);
conn.query('SELECT TOP 1 * FROM wfdocument order by createdate desc').then(res => console.log(res)).catch(err => console.log(err));
```
