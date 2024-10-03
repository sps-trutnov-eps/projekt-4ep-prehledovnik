const udalostiRouter = require('express').Router();

udalostiRouter.get('/', (req, res) => res.render('udalosti/index.ejs', {}));

module.exports = udalostiRouter;