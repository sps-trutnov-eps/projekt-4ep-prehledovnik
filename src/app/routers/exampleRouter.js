const exampleRouter = require('express').Router();

// Musíme nějak ukazovat na controller
const exampleController = require('../controllers/exampleController');
// Tady se zachytává vše co pošlete na url: /example
// např: /example/writeOutIntoConsole

// get vrací stránky
// v res.render() je naše stránka (to v '')
// a nějaká proměnná v: {}
// {} je json takže můžeme posílat více proměnných
// např: {number: 10, txt: 'hi'}
//exampleRouter.get('/', (req, res) => res.render('example/index.ejs', {number: 10}));
// či můžete použít controller na to aby vám vracel nějaké hodnoty
exampleRouter.get('/', (req, res) => res.render('example/index.ejs', {number: exampleController.getAmountOfWriteOut(),
																	  seenPage: exampleController.seenPage()}));

// protože nám klient pošle něco pomocí POST tak musíme použít exampleRouter.post
exampleRouter.post('/writeOutIntoConsole', (req, res) => {
	// Voláme funkci a předáváme ji req
	exampleController.writeIntoConsole(req);
	
	// Odpověď klientu
	res.send('Recieved data.');
});

exampleRouter.post('/writeOutIntoConsoleFORM', (req, res) => {
	// Voláme funkci a předáváme ji req
	exampleController.writeIntoConsoleFORM(req);
	
	// Odpověď klientu
	// Tady upravíš co to vrací, například stránku jako je hore (exampleRouter.get)
	res.render('example/boop.ejs', {imgNumber: exampleController.randomImg()});
	//res.send('Recieved data.');
});


module.exports = exampleRouter;