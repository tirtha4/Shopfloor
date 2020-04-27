const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Set templating engine
app.set('view engine','ejs');
//Affirm where to find the template views
app.set('views','views');
const errorController = require('./controllers/error.js')
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//set bodyparser as requesthandler and parse the data
app.use(bodyParser.urlencoded({extended: false}));
//tell express where to find static files 
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
