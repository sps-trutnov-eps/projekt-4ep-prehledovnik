const express = require('express');
const projektyController = require('../controllers/projektyController');
const projektyRouter = express.Router();

// GET požadavky

projektyRouter.get('/tymy', projektyController.zobrazTymy);
projektyRouter.get('/tymy/:projekt', projektyController.zobrazProjekt);
projektyRouter.get('/tymy/:projekt/team/:id', projektyController.zobrazDetailyTymu);
//projektyRouter.get('/tymy/tym', projektyController.zobrazDetailyTymu);
//projektyRouter.get('/tymy/pitche', projektyController.zobrazPitche);
//projektyRouter.get('/tymy/prezentace', projektyController.zobrazPrezentace);
projektyRouter.get('/vytvoreniProjektu', projektyController.vytvoritProjekt);

// POST požadavky
projektyRouter.post('/vytvoreniProjektu', projektyController.ulozitProjekt);
projektyRouter.get('/:id', projektyController.zobrazDetailyProjektu);
projektyRouter.get('/', projektyController.zobrazTlacitka);
module.exports = projektyRouter;
