require('dotenv').config();

var express = require('express');
var app = express();
var user = require('./controllers/usercontroller');
var log = require('./controllers/logcontroller');


var sequelize = require('./db');

sequelize.sync();

app.use(express.json());

app.use(require('./middleware/headers'));

app.use('/api/user', user);


app.use(require('./middleware/validate-session'));

app.use('/api/log', log);


app.use('/api/test', function(req, res){
    res.send("This is data from the /api/test endpoint. It's from the server.");
});

app.listen(3000, function() {
    console.log('App is listening on 3000.')
})

