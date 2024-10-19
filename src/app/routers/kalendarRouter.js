const kalendarRouter = require('express').Router();
const kalendarController = require("../controllers/kalendarController");

kalendarRouter.get('/', kalendarController.mesicni);
kalendarRouter.get('/tydenni', kalendarController.tydenni);

module.exports = kalendarRouter;