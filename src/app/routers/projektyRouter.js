const projektyRouter = require('express').Router();
const projektyController = require('../controllers/projektyController');

projektyRouter.get('/', (req, res) => res.render('projekty/index.ejs', {}));
projektyRouter.get('/tymy', (req, res) => res.render('projekty/tymy.ejs', {tymy: projektyController.zobrazTymy()}));
projektyRouter.get('/tymy/tym', (req, res) => res.render('projekty/detailTymu.ejs', {detailTymu: projektyController.zobrazDetailyTymu()}));
projektyRouter.get('/tymy/pitche', (req, res) => res.render('projekty/pitch.ejs', {pitche: projektyController.zobrazPitche()}));
projektyRouter.get('/tymy/prezentace', (req, res) => res.render('projekty/prezentace.ejs', {prezentace: projektyController.zobrazPrezentace()}));
module.exports = projektyRouter;