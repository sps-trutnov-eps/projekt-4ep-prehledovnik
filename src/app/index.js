const express = require('express');
const app = express();

require('dotenv').config();

app.use(express.static('www'));
app.use(express.json());

// ejs init
app.set('view engine', 'ejs');
app.set('views', './app/views');

// app.use, NIKOLI app.get!
app.use('/', require("./routers/defaultRouter.js"));

app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}!`));
