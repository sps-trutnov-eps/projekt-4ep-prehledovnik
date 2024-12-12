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
	
	if (data["teorie"] == 'on'){
		data["predmet"] = `${data["predmet"]}-t`;
	} else {
		data["predmet"] = `${data["predmet"]}-c`;
	}
	
	data["trida"] = `${data["rocnik"]}.${data["obor"]}`
	
	//console.log(data);
	
	databaze.osnovy.upravitOsnovu(curID, data);
	return true;
}

exports.getCur = () => {
	return databaze.osnovy.ziskatVsechnyOsnovy();
}

exports.subjects = () => {
	return databaze.ziskatPredmety();
}

exports.classes = () => {
	return databaze.ziskatUcebny();
}

exports.fields = () => {
	return databaze.ziskatObory();
}