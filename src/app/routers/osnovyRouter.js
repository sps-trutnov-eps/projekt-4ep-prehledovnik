const osnovyRouter = require('express').Router();
const osnovyController = require('../controllers/osnovyController');

osnovyRouter.post('/create', (req, res) => {
	let curID = osnovyController.create();
	
	// Odpověď klientu
	// Tady upravíš co to vrací, například stránku jako je hore (exampleRouter.get)
	res.json({'id': curID});
	//res.send('Recieved data.');
});

osnovyRouter.post('/save/*', (req, res) => {
	let curID = decodeURIComponent(req.url);
	if (curID.includes('/')){
		curID = curID.split('/');
		curID = curID[curID.length-1];
	} else {
		//console.log('ERROR: Incorrect URL (save curriculum)');
		res.json({'id': undefined});
	}
	
	//console.log(req.body);
	
	osnovyController.edit(curID, req.body);
	
	// Odpověď klientu
	// Tady upravíš co to vrací, například stránku jako je hore (exampleRouter.get)
	res.json({'id': curID});
	//res.send('Recieved data.');
});

osnovyRouter.post('/remove/*', (req, res) => {
	let curID = decodeURIComponent(req.url);
	if (curID.includes('/')){
		curID = curID.split('/');
		curID = curID[curID.length-1];
	} else {
		//console.log('ERROR: Incorrect URL (remove curriculum)');
		res.json({'id': undefined});
	}
	
	//console.log(req.body);
	
	osnovyController.remove(curID);
	
	// Odpověď klientu
	// Tady upravíš co to vrací, například stránku jako je hore (exampleRouter.get)
	res.json({'id': curID});
	//res.send('Recieved data.');
});

osnovyRouter.get('*', (req, res) => {
    let id = decodeURIComponent(req.url).slice(1);
    
    let cur = osnovyController.getCur();
    let subjects = osnovyController.subjects();
	let classes = osnovyController.classes();

    res.render('osnovy/index.ejs', {"cur": cur, "id": id, "subjects": subjects, "classes": classes});
});

module.exports = osnovyRouter;