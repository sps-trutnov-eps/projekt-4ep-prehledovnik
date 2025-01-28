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
	
	data["predmet"] = data["predmet"].replace(/-/gi, '');
	console.log(data["predmet"]);
	
   const trida = `${data["rocnik"]}.${data["obor"]}`;
   const predmet = `${data["predmet"]}${predmetTeorie}`;
	
	processedData = {"trida": trida, "predmet": predmet, "temata": data["temata"]};
	databaze.osnovy.upravitOsnovu(curID, processedData);
	
	// Just create the new "Predmety", it gets rid of all of the excess and duplicate values
	// Not the best, but we don't expect this function to run 10000 times a second on an array of length 100
	const osnovy = databaze.osnovy.ziskatVsechnyOsnovy();
	let necessary = [];
	for (let oi = 1; oi < osnovy["nextID"]; oi++){
		//console.log(`${osnovy[oi].predmet}	${predmety[pi]}`);
		if (necessary.length > 0){
			let foundDuplicate = false;
			for (let ni = 0; ni < necessary.length; ni++){
				if (necessary[ni] == osnovy[oi].predmet){
					foundDuplicate = true;
					break;
				}
			}
			if (!foundDuplicate){ necessary.push(osnovy[oi].predmet); }
		} else {
			necessary.push(osnovy[oi].predmet);
		}
	}
	
	databaze.nastavitPredmety(necessary);
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
