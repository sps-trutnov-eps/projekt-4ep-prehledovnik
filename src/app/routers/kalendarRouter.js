const kalendarRouter = require('express').Router();
const kalendarController = require("../controllers/kalendarController");

kalendarRouter.get('/', (req, res) => res.render('kalendar/index.ejs', {date_udalost: kalendarController.date_udalost()}));
kalendarRouter.get('/tydenni', (req, res) => res.render('kalendar/tydenni.ejs', {rozvrh: kalendarController.rozvrh()}));

module.exports = kalendarRouter;