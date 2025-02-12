const express = require('express');
const multer = require('multer');
const upload = multer();

const projektyController = require('../controllers/projektyController');
const projektyRouter = express.Router();

projektyRouter.post('/upload/:id', upload.single('file'),
                    projektyController.upload);

projektyRouter.post('/save/class', (req, res) => {
   let data = req.body;
   
   
   projektyController.saveClass(data.classID, data.pitchDate);
   
   projektyController.saveTeams(data);
   
	res.json({"saved": true});
});

projektyRouter.post('/save/team', (req, res) => {
   let data = req.body;
   
   projektyController.saveTeam(data);
   
	res.json({"saved": true});
});

projektyRouter.get('/:id', projektyController.view);
projektyRouter.get('/', projektyController.view);
module.exports = projektyRouter;
