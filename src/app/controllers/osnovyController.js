const databaze = require("../models/databaseEngine");

exports.create = () => {
	let createdCurID = databaze.osnovy.pridatOsnovu('','','');
	console.log(`Creating new curriculum. ID: ${createdCurID}`);
	return createdCurID;
}

exports.remove = (curID) => {
	databaze.osnovy.odebratOsnovu(curID);
	return true;
}

exports.edit = (curID, data) => {
	
	data["temata"] = JSON.parse(data.temata);
	console.log(data);
	
	databaze.osnovy.upravitOsnovu(curID, data);
	return true;
}

exports.getCur = () => {
	return databaze.osnovy.ziskatVsechnyOsnovy();
}

exports.subjects = () => {
	return databaze.ziskatPredmety();
}
