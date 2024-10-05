const kalendarRouter = require('express').Router();

kalendarRouter.get('/', (req, res) => res.render('kalendar/index.ejs', {}));
kalendarRouter.get('/tydenni', (req, res) => res.render('kalendar/tydenni.ejs', {}));

module.exports = kalendarRouter;