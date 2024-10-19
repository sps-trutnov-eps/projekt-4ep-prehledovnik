const express = require('express');
const app = express();
const databaze = require("../models/databaseEngine");

app.set('view engine', 'ejs');

app.get('/your-route', (req, res) => {
    const predmety = databaseEngine.ziskatPredmety();
    res.render('your-template', { predmety });
});
