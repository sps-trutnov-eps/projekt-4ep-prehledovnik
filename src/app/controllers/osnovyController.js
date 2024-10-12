const databaze = require("../models/databaseEngine");

exports.create = () => {
	let createdCurID = databaze.osnovy.pridatOsnovu('','','');
	console.log(`Creating new curriculum. ID: ${createdCurID}`);
	return createdCurID;
}

exports.edit = (curID, data) => {
	databaze.osnovy.upravitOsnovu(curID, data);
	return true;
}

exports.getCur = () => {
	return databaze.osnovy.ziskatVsechnyOsnovy();
}