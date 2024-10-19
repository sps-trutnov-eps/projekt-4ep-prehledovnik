const projektyRouter = require('express').Router();

projektyRouter.get('/', (req, res) => res.render('projekty/index.ejs', {}));

module.exports = projektyRouter;