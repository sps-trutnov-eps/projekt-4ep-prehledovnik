const defaultRouter = require('express').Router();
const markdown = require( "markdown" ).markdown;
const fs = require('node:fs');

defaultRouter.get('/',(req, res) => res.redirect('/index'));

defaultRouter.get('/test', (req, res) => res.send('Hello World!'));

defaultRouter.use('/index', require('./indexRouter.js'));
defaultRouter.use('/kalendar', require('./kalendarRouter.js'));
defaultRouter.use('/maturity', require('./maturityRouter.js'));
defaultRouter.use('/osnovy',   require('./osnovyRouter.js'));
defaultRouter.use('/projekty', require('./projektyRouter.js'));
defaultRouter.use('/rozvrhy',  require('./rozvrhyRouter.js'));
defaultRouter.use('/udalosti', require('./udalostiRouter.js'));

defaultRouter.get('*', (req, res) => res.send('EREOR 404!!'));

module.exports = defaultRouter;