const express = require('express');
const projektyController = require('../controllers/projektyController');
const projektyRouter = express.Router();

// GET požadavky
projektyRouter.get('/', (req, res) => res.render('projekty/index.ejs', {}));
projektyRouter.get('/tymy', projektyController.zobrazTymy);
projektyRouter.get('/tymy/tym', projektyController.zobrazDetailyTymu);
projektyRouter.get('/tymy/pitche', projektyController.zobrazPitche);
projektyRouter.get('/tymy/prezentace', projektyController.zobrazPrezentace);
projektyRouter.get('/vytvoreniProjektu', projektyController.vytvoritProjekt);

// POST požadavky
projektyRouter.post('/ulozitProjekt', projektyController.ulozitProjekt);

module.exports = projektyRouter;
