const express = require('express');
const app = express();

app.use(express.static('www'));
app.use(express.json());

// ejs init
app.set('view engine', 'ejs');
app.set('views', './app/views');

// app.use, NIKOLI app.get!
app.use('/', require("./routers/defaultRouter.js"));

app.listen(3000, () => console.log('App listening on port 3000!'));
