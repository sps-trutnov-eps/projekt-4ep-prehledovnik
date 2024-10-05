const kalendarRouter = require('express').Router();
const kalendarController = require("../controllers/kalendarController");

kalendarRouter.get('/', (req, res) => res.render('kalendar/index.ejs', {day: kalendarController.day(), month: kalendarController.month()}));
kalendarRouter.get('/tydenni', (req, res) => res.render('kalendar/tydenni.ejs', {}));

module.exports = kalendarRouter;