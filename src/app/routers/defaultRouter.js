const defaultRouter = require('express').Router();

defaultRouter.get('/', (req, res) => res.render('index.ejs', {}));
defaultRouter.get('/test', (req, res) => res.send('Hello World!'));

defaultRouter.use('/kalendar', require('./kalendarRouter.js'));
defaultRouter.use('/maturity', require('./maturityRouter.js'));
defaultRouter.use('/osnovy',   require('./osnovyRouter.js'));
defaultRouter.use('/projekty', require('./projektyRouter.js'));
defaultRouter.use('/rozvrhy',  require('./rozvrhyRouter.js'));
defaultRouter.use('/udalosti', require('./udalostiRouter.js'));

defaultRouter.get('*', (req, res) => res.send('EREOR 404!!'));

module.exports = defaultRouter;