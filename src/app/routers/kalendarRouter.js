const kalendarRouter = require('express').Router();

kalendarRouter.get('/', (req, res) => res.render('kalendar/index.ejs', {}));

module.exports = kalendarRouter;