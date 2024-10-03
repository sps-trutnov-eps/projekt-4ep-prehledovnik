const maturityRouter = require('express').Router();

maturityRouter.get('/', (req, res) => res.render('maturity/index.ejs', {}));

module.exports = maturityRouter;