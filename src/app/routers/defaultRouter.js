const defaultRouter = require('express').Router();
const markdown = require( "markdown" ).markdown;
const fs = require('node:fs');

defaultRouter.get('/', (req, res) => {
    fs.readFile('../doc/pouziti.md', 'utf8', (err, data) => {
        if (err) console.error(err);

        res.render('index.ejs', {doc: markdown.toHTML(data)});
    });
});

defaultRouter.get('/test', (req, res) => res.send('Hello World!'));

defaultRouter.use('/kalendar', require('./kalendarRouter.js'));
defaultRouter.use('/maturity', require('./maturityRouter.js'));
defaultRouter.use('/osnovy',   require('./osnovyRouter.js'));
defaultRouter.use('/projekty', require('./projektyRouter.js'));
defaultRouter.use('/rozvrhy',  require('./rozvrhyRouter.js'));
defaultRouter.use('/udalosti', require('./udalostiRouter.js'));

defaultRouter.get('*', (req, res) => res.send('EREOR 404!!'));

module.exports = defaultRouter;