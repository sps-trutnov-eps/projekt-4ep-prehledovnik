const databaze = require("../models/databaseEngine");
const exampleModel = require('../models/example/exampleModel.js');

exports.seenPage = () => {
	return exampleModel.seenPage();
}

exports.randomImg = () => {
	return exampleModel.randomImg();
}

// Aby cokoliv bylo přístupné z vnějšku tak musíte napsat exports.něco
// či můžete použít module.exports = něco;
// např:
exports.writeIntoConsole = (req) => {
	console.log('Data from client: ' + req.body.textToWriteOut);
	console.log('along with: ' + req.body.anotherOne);
}

exports.getAmountOfWriteOut = () => {
	return exampleModel.getAmountOfWriteOut();
}

/*function getAmountOfWriteOut() {
	return exampleModel.getAmountOfWriteOut();
}*/

/*module.exports = {
    getAmountOfWriteOut
};*/
// Na pořadí nezáleží, ale je lepší když je module.exports na konci souboru
// Pokud se rozhodnete používat tento způsob

exports.writeIntoConsoleFORM = (req) => {
	
	const { username } = req.body;
	console.log('Data from client: ' + username);
}