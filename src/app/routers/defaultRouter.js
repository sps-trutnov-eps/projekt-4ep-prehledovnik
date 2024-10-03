const defaultRouter = require('express').Router();

defaultRouter.get('/', (req, res) => res.render('index', {}));
defaultRouter.get('/test', (req, res) => res.send('Hello World!'));

defaultRouter.get('*', (req, res) => res.send('EREOR 404!!'));

module.exports = defaultRouter;