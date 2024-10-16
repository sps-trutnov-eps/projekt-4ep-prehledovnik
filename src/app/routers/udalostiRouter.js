const udalostiRouter = require('express').Router();
const udalostiController = require('../controllers/udalostiController.js');

udalostiRouter.get('/seznam', udalostiController.seznam);
udalostiRouter.post('/pridatUdalost', udalostiController.pridat);
udalostiRouter.get('/', (req, res) => res.render('udalosti/index.ejs', {}));

module.exports = udalostiRouter;
