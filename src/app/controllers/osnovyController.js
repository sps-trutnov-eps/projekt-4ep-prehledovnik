const databaze = require("../models/databaseEngine");

exports.create = () => {
	let createdCurID = databaze.osnovy.pridatOsnovu('','','');
	console.log(`Creating new curriculum. ID: ${createdCurID}`);
	return createdCurID;
}

exports.getCur = (id) => {
	databaze.osnovy.ziskatOsnovu(id);
	return 0;
}