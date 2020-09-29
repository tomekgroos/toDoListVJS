const express = require('express');
const app = express();
const PORT = 4000;
const path = require('path');
const bodyParser = require('body-parser');

app.use(BodyParser.urlencoded({ extended: true }));

app.use('/static', express.static(path.join('C:/Programowanie/todoVJSApp', 'frontend')));

app.listen(PORT, () =>{
    console.log('listening on port 4000');
});

app.get('/', (req, res) =>{
    res.sendFile('C:/Programowanie/todoVJSApp/frontend' + '/index.html');
});

