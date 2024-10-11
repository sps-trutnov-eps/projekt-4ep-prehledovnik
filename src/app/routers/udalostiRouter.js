const udalostiRouter = require('express').Router();

udalostiRouter.get('/', (req, res) => res.render('udalosti/seznamUdalosti.ejs', {}));

module.exports = udalostiRouter;