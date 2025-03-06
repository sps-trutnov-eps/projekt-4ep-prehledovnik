const indexRouter = require('express').Router();
const indexController = require('../controllers/indexController');

indexRouter.get('/', indexController.showModulesHome);

indexRouter.get('/kalendar', indexController.showKalendar);
indexRouter.get('/rozvrh', indexController.showRozvrh);
indexRouter.get('/projekty', indexController.showProjekty);
indexRouter.get('/udalosti', indexController.showUdalosti);
indexRouter.get('/osnovy',indexController.showOsnovy);
indexRouter.get('/maturita', indexController.showMaturita);

module.exports = indexRouter;