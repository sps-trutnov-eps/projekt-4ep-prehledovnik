const osnovyRouter = require('express').Router();

osnovyRouter.get('/', (req, res) => res.render('osnovy/index.ejs', {}));

module.exports = osnovyRouter;