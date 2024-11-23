const udalostiRouter = require('express').Router();
const udalostiController = require('../controllers/udalostiController.js');

// udalostiRouter.get('/seznam', udalostiController.seznam);
udalostiRouter.post('/pridatUdalost', udalostiController.pridat);
udalostiRouter.get('/', udalostiController.index);
udalostiRouter.get('/smazat/:data(*)', udalostiController.smazat);

module.exports = udalostiRouter;
