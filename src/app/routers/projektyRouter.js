const projektyRouter = require('express').Router();
const projektyController = require('../controllers/projektyController');

projektyRouter.get('/', (req, res) => res.render('projekty/index.ejs', {}));

module.exports = projektyRouter;