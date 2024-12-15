const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer();

require('dotenv').config();

app.use(express.static('./www'));
app.use(express.json());

// ejs init
app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.urlencoded({ extended: true }));

// app.use, NIKOLI app.get!
app.use('/', require("./routers/defaultRouter.js"));

// defautl value if undefined
const port = process.env.PORT || 3000;
app.listen(port, () => //console.log(`App listening on port ${port}!`));
