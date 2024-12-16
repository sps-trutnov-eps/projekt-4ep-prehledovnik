const databaze = require("../models/databaseEngine");

exports.create = () => {
	let createdCurID = databaze.osnovy.pridatOsnovu('','','');
	//console.log(`Creating new curriculum. ID: ${createdCurID}`);
	return createdCurID;
}

exports.remove = (curID) => {
	databaze.osnovy.odebratOsnovu(curID);
	return true;
}

exports.edit = (curID, data) => {
	
	data["temata"] = JSON.parse(data.temata);
	//console.log(data);
	
	let predmetTeorie = `-t`;
	if (data["teorie"] == undefined){
		predmetTeorie = `-c`;
	}
	
	let trida = `${data["obor"]}${data["rocnik"]}`;
	let predmet = `${data["predmet"]}${predmetTeorie}`;
	
	processedData = {"trida": trida, "predmet": predmet, "temata": data["temata"]};
	//console.log(processedData);
	
	databaze.osnovy.upravitOsnovu(curID, processedData);
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