const projektyRouter = require('express').Router();
const projektyController = require('../controllers/projektyController');

projektyRouter.get('/', (req, res) => res.render('projekty/index.ejs', {}));
projektyRouter.get('/tymy', projektyController.zobrazTymy);
projektyRouter.get('/tymy/tym', projektyController.zobrazDetailyTymu);
projektyRouter.get('/tymy/pitche', projektyController.zobrazPitche);
projektyRouter.get('/tymy/prezentace', projektyController.zobrazPrezentace);
module.exports = projektyRouter;