const osnovyRouter = require('express').Router();
const osnovyController = require('../controllers/osnovyController');
const databaze = require("../models/databaseEngine");

osnovyRouter.post('/create', (req, res) => {
	let curID = osnovyController.create();
	
	// Odpověď klientu
	// Tady upravíš co to vrací, například stránku jako je hore (exampleRouter.get)
	databaze.struktury(databaze.maturity.ziskatVsechnyMaturityJakoUdalosti());
	res.json({'id': curID});
	//res.send('Recieved data.');
	
});

osnovyRouter.post('/save/*', (req, res) => {
	let curID = decodeURIComponent(req.url);
	if (curID.includes('/')){
		curID = curID.split('/');
		curID = curID[curID.length-1];
	} else {
		res.json({'id': undefined});
	}
	
	// I still have no idea how the curriculums field gets in here, it just gets
	osnovyController.edit(curID, req.body);
	
	// Odpověď klientu
	// Tady upravíš co to vrací, například stránku jako je hore (exampleRouter.get)
	databaze.struktury(databaze.maturity.ziskatVsechnyMaturityJakoUdalosti());
	res.json({'id': curID});
	//res.send('Recieved data.');
});

osnovyRouter.post('/remove/*', (req, res) => {
	let curID = decodeURIComponent(req.url);
	if (curID.includes('/')){
		curID = curID.split('/');
		curID = curID[curID.length-1];
	} else {
		console.log('ERROR: Incorrect URL (remove curriculum)');
		res.json({'id': undefined});
	}
	
	osnovyController.remove(curID);
	
	// Odpověď klientu
	// Tady upravíš co to vrací, například stránku jako je hore (exampleRouter.get)
	databaze.struktury(databaze.maturity.ziskatVsechnyMaturityJakoUdalosti());
	res.json({'id': curID});
	//res.send('Recieved data.');
});

osnovyRouter.get('*', (req, res) => {
	let id = decodeURIComponent(req.url).slice(1);
	
	// cur contains data about currently selected curriculum
	let cur = osnovyController.getCur();
	let subjects = osnovyController.subjects();
	let classes = osnovyController.classes();
	let fields = osnovyController.fields();
	databaze.struktury(databaze.maturity.ziskatVsechnyMaturityJakoUdalosti());
	res.render('osnovy/index.ejs', {"cur": cur, "id": id, "subjects": subjects, "classes": classes, "fields": fields});
});

module.exports = osnovyRouter;
