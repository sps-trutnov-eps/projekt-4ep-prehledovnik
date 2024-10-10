const osnovyRouter = require('express').Router();
const osnovyController = require('../controllers/osnovyController');

osnovyRouter.post('/create', (req, res) => {
	let curID = osnovyController.create();
	
	// Odpověď klientu
	// Tady upravíš co to vrací, například stránku jako je hore (exampleRouter.get)
	res.json({'id': curID});
	//res.send('Recieved data.');
});

osnovyRouter.get('*', (req, res) => {
	let id = decodeURIComponent(req.url).slice(1);
	
	osnovyController.getCur();
	
	console.log(id);
	
	res.render('osnovy/index.ejs', {});
});

module.exports = osnovyRouter;