const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mustacheExpress = require('mustache-express');
const routes = require('./routes/routes');


// connecting to mongo
require('dotenv').config();
const PORT = process.env.PORT || 4000;
const URI = process.env.ATLAS_URI;
mongoose.connect(URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Connected to MongoDB");
})

// include body parser and remain files

app.use(express.static(path.join('C:/Programowanie/todoVJSApp', "public")));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// include mustache templates
const mustacheExpressInstance = mustacheExpress();
mustacheExpressInstance.cache = null;
app.engine('mustache', mustacheExpressInstance);
app.set('view engine', 'mustache');
app.set('views','C:/Programowanie/todoVJSApp/backend' + '/views');

// confirmation of port connected

app.listen(PORT, () =>{
    console.log('listening on port 4000');
});

app.use('/', routes);


