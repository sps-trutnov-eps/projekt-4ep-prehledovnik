const express = require('express');
const app = express();
const databaze = require("../models/databaseEngine");

app.set('view engine', 'ejs');

app.get('/ziskat-predmety', (req, res) => {
    const predmety = databaseEngine.ziskatPredmety();
    res.render('predmety', { predmety });
});
