const express = require('express');
const sql = require('mssql');
const path = require('path');
const app = express();

const {getHomePage} = require('./routes/index');
var dbConfig = {
    server: 'localhost',
    database: 'TestDB',
    user: 'SA',
    password: 'EverymanAKing1.',
    port: 1433
};
const port = 5000;
global.db = sql.connect(dbConfig, function (err) {
    
        if (err) console.log(err)
        
        // create Request object
    console.log('Connected to DB')
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from Test', function (err, recordset) {
            
            if (err) console.log(err)

            console.log('fetched results')
            
        });
    });

app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder

// routes for the app

app.get('/', getHomePage);
/*
app.get('/add', addPlayerPage);
app.get('/edit/:id', editPlayerPage);
app.get('/delete/:id', deletePlayer);
app.post('/add', addPlayer);
app.post('/edit/:id', editPlayer);
*/

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});