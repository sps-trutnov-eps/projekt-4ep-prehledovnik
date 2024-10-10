const express = require('express');
const app = express();

app.use(express.static('www'));

app.get('/', (req, res) => res.sendFile('html/index.html', {root: __dirname }));
app.get('/test', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('App listening on port 3000!'));

app.use(express.urlencoded({ extended: true }));

// app.use, NIKOLI app.get!
app.use('/', require("./routers/defaultRouter.js"));

// defautl value if undefined
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}!`));
