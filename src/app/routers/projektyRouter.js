const express = require('express');
const multer = require('multer');
const upload = multer();

const projektyController = require('../controllers/projektyController');
const projektyRouter = express.Router();

projektyRouter.post('/upload/:id', upload.single('file'),
                    projektyController.upload);

projektyRouter.get('/:id', projektyController.view);
projektyRouter.get('/', projektyController.view);
module.exports = projektyRouter;
