const maturityRouter = require('express').Router();
const maturityController = require("../controllers/maturityController.js")
maturityRouter.get('/', (req, res) => res.render('maturity/index.ejs', {}));
maturityRouter.get("/pcmz", maturityController.pcmz)
maturityRouter.get("/scmz", maturityController.scmz)
maturityRouter.get("/sloh", maturityController.sloh)

maturityRouter.post("/ukladanipzop", maturityController.ukladanipzop)

module.exports = maturityRouter;


