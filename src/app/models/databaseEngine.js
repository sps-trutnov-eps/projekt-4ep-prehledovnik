const jsondb = require("simple-json-db");
const db = new jsondb("./data/database.json");

// VÝCHOZÍ HODNOTY UČENÍ
predmety = ["VYS-c", "VYS-t", "PVA-c", "PVA-t", "HAE-c", "HAE-t", "CMT-c", "CMT-t", "OPS-c", "OPS-t"];
hodiny = {
    "1": ["7:10", "7:55"],
    "2": ["8:00", "8:45"],
    "3": ["8:50", "9:35"],
    "4": ["9:55", "10:40"],
    "5": ["10:50", "11:35"],
    "6": ["11:40", "12:25"],
    "7": ["12:35", "13:20"],
    "8": ["13:25", "14:10"],
    "9": ["14:15", "15:00"],
    "10": ["15:10", "15:55"]
};
ucebny = {
    "101": ["T1", "T2", "T5"],
    "59" : ["E4", "F14", "G1", "G2"],
    "618": [],
    "374": [],
}

if(!db.has("predmety")){
    db.set("predmety", predmety);
    db.set("hodiny", hodiny);
    db.set("ucebny", ucebny);
    db.set("osnovy", {"nextID": 1});
    db.set("rozvrhy", {"nextID": 1});
    db.set("udalosti", {"nextID": 1});
    db.set("maturity", {});
    db.set("projekty", {"nextID": 1});
}

// OSNOVY
function gO(){return db.get("osnovy")}
function sO(osnovy){db.set("osnovy", osnovy)}

const osnovy = {
    pridatOsnovu: (trida, predmet, temata) => {
        let osnovy = gO();
        osnovy[osnovy["nextID"]] = {trida, predmet, temata};
        osnovy["nextID"] += 1;
        sO(osnovy);
		return (osnovy["nextID"]-1);
    },
    ziskatIDOsnovy: (trida, predmet) => {
        let osnovy = gO();
        let nextID = osnovy["nextID"];
        let IDhledaneOsnovy;
        for(let i = 0; i < nextID; i++){
            if(osnovy[String(i)]["trida"] == trida && osnovy[String(i)]["predmet"] == predmet)
                IDhledaneOsnovy = String(i);
        }
        return IDhledaneOsnovy;
    },
	/*ziskatOsnovu: (id) => {
        let osnovy = gO();
		//console.log(`osnova ${id}:` + osnovy[`${id}`]["trida"]);
        return osnovy[`${id}`];
    },*/
    ziskatVsechnyOsnovy: () => {
        /*let osnovy = gO();
        let osnovyList = [];
        let nextID = osnovy["nextID"];
        for(let i = 0; i < nextID; i++){
            osnovyList.push(osnovy[String(i)]);
        }*/
        return gO();
    },
	upravitOsnovu: (id, data) => {
        let osnovy = gO();
		//console.log(osnovy);
        osnovy[id]["trida"] = data.trida == undefined ? osnovy[id]["trida"] : data.trida;
		osnovy[id]["predmet"] = data.predmet == undefined ? osnovy[id]["predmet"] : data.predmet;
		osnovy[id]["temata"] = data.temata == undefined ? osnovy[id]["temata"] : data.temata;
		//console.log(osnovy);
        sO(osnovy);
    },
    upravitTemataOsnovy: (trida, predmet, temata) => {
        let osnovy = gO();
        let IDUpravovaneOsnovy = ziskatIDOsnovy(trida, predmet);
        osnovy[IDUpravovaneOsnovy]["temata"] = temata;
        sO(osnovy);
    },
	odebratOsnovu: (id) => {
		let osnovy = gO();
		id = Number(id);
		console.log(id);
		if (id < Number(osnovy["nextID"])){
			console.log("yep")
			for (let i = id+1; i < osnovy["nextID"]; i++){
				console.log(i)
				osnovy[`${i-1}`] = osnovy[i];
			}
			osnovy["nextID"] -= 1;
			delete osnovy[osnovy["nextID"]];
		}
		console.log(osnovy);
		sO(osnovy);
	}
}

// ROZVRHY
function gR(){return db.get("rozvrhy")}
function sR(rozvrhy){db.set("rozvrhy", rozvrhy)}

const rozvrhy = {
    pridatRozvrh: (datumOd, hodiny) => {
        let rozvrhy = gR();
        rozvrhy[rozvrhy["nextID"]] = {datumOd, hodiny}
        udalosti["nextID"] += 1;
        sR(rozvrhy);
    },
    ziskatIDPodleDatumu: (datumOd) => {
        let rozvrhy = gR();
        let nextID = rozvrhy["nextID"];
        let IDHledanehoRozvrhu;
        for(let i = 0; i < nextID; i++){
            if(rozvrhy[String(i)]["datumOd"] == datumOd){
                IDHledanehoRozvrhu = String(i);
            }
        }
        return IDHledanehoRozvrhu;
    },
    upravidRozvrh: (datumOd, hodiny) => {
        let rozvrhy = gR();
        rozvrhy[ziskatIDPodleDatumu(datumOd)]["hodiny"] = hodiny;
        sR(rozvrhy);
    },
    ziskatVsechnyRozvrhy: () => {
        let rozvrhy = gR();
        let rozvrhyList = [];
        for(let i = 1; i < rozvrhy["nextID"]; i++) {
            if (rozvrhy[String(i)]) {
                rozvrhyList.push(rozvrhy[String(i)]);
            }
        }
        return rozvrhyList;
    },
    pridatRozvrh: (datum, nazev, popis, hodiny) => {
        let rozvrhy = gR();
        rozvrhy[rozvrhy["nextID"]] = {
            datum,
            nazev,
            popis,
            hodiny
        };
        rozvrhy["nextID"] += 1;
        sR(rozvrhy);
        return rozvrhy["nextID"] - 1;
    },
    ziskatRozvrh: (id) => {
        let rozvrhy = gR();
        return rozvrhy[id];
    },
    pridatRozvrh: (datum, nazev, popis, hodiny) => {
        let rozvrhy = gR();
        const id = rozvrhy["nextID"];
        rozvrhy[id] = {
            id,
            datum,
            nazev,
            popis,
            hodiny
        };
        rozvrhy["nextID"] += 1;
        sR(rozvrhy);
        return id;
    },
    upravitRozvrh: (id, hodiny) => {
        let rozvrhy = gR();
        if (rozvrhy[id]) {
            rozvrhy[id].hodiny = hodiny;
            sR(rozvrhy);
            return true;
        }
        return false;
    }
};



// UDALOSTI
function gU(){return db.get("udalosti")}
function sU(udalosti){db.set("udalosti", udalosti)}

const udalosti = {
    pridatUdalost: (nazev, typ,  datum, datumDo, casOd, casDo, vyberZadani, tykaSe, poznamka) => {
        let udalosti = gU();
        let nextID = udalosti["nextID"];
        let novaUdalost = {nazev, typ, datum,  datumDo, casOd, casDo, vyberZadani, tykaSe, poznamka};
        let nalezeno = false;
        for(let i = 0; i < nextID; i++){
            if (JSON.stringify(udalosti[String(i)]) === JSON.stringify(novaUdalost)) nalezeno = true;
        }
        if (!nalezeno){
            udalosti[nextID] = novaUdalost;
            udalosti["nextID"] += 1;
        }
        sU(udalosti);
    },
    ziskatIDUdalostiPodleNazvu: (jmeno) => {
        let udalosti = gU();
        let nextID = udalosti["nextID"];
        let IDHledaneUdalosti;
        for(let i = 0; i < nextID; i++){
            if (udalosti[String(i)]["nazev"] == jmeno){
                IDHledaneUdalosti = String(i);
            }
        }
        return IDHledaneUdalosti;
    },
    ziskatUdalostiPodleNazvu: (jmeno) => {
        let udalosti = gU();
        return udalosti[ziskatIDUdalostiPodleNazvu(jmeno)];
    },
    ziskatVsechnyUdalosti: () => {
        let udalosti = gU();
        let udalostiList = [];
        for(let i = 1; i < udalosti["nextID"]; i++){
            if (udalosti[String(i)]) {
                udalostiList.push(udalosti[String(i)]);
            }
        }
        return udalostiList;
    },
    upravitUdalost: (puvodniUdalost, novaUdalost) => {
        let udalosti = gU();
        let nextID = udalosti["nextID"];
        for(let i = 0; i < nextID; i++){
            if(JSON.stringify(udalosti[String(i)]) === puvodniUdalost)
                udalosti[String(i)] = novaUdalost;
        }
        sU(udalosti);
    },
    odebratUdalost: (udalost) => {
        let udalosti = gU();
        let nextID = udalosti["nextID"];
        for(let i = 0; i < nextID; i++){
            if(JSON.stringify(udalosti[String(i)]) === udalost)
                delete udalosti[String(i)];
        }
        sU(udalosti);
    }
}

// MATURITY
function gM(){return db.get("maturity")}
function sM(maturity){db.set("maturity", maturity)}

const maturity = {
    pridatMaturitniEvent: (nazev, dny, casy, ucebny) => {
        let maturity = gM();
        
        maturity[nazev] = null;

        if (nazev == "PŽOP"){
            ucebny = [ucebny];
        } else if (nazev == "PČMZ"){
            ucebny = []
        }
        maturity[nazev] = {dny, casy, ucebny};
        sM(maturity);
    },
    ziskarMaturituDleNazvu: (nazev) => {
        let maturity = gM();
        return maturity[nazev];
    },
    ziskatVsechnyMaturity: () => {
        let maturity = gM();
        let maturityList = [];
        maturityList.push("PŽOP");
        maturityList.push("PČMZ");
        maturityList.push("SČMZ");
        maturityList.push("SLOH");
        return maturityList;
    },
    ziskatVsechnyMaturityJakoUdalosti: () => {
        let maturity = gM();
        let maturityList = [];
        let typy = ["PŽOP", "PČMZ", "SČMZ", "SLOH"];

        for(let i = 0; i < typy.length; i++){
            if (maturity[typy[i]]){
                for(let j = 0; j < maturity[typy[i]]["dny"].length; j++){
                    let nazev = typy[i];
                    let den = maturity[typy[i]]["dny"][j];
                    let cOD = null;
                    let cDO = null;
                    let ucebna;
                    
                    if(nazev == "PČMZ") {
                        cOD = hodiny[maturity[typy[i]]["casy"][j][0]];
                        cDO = maturity[typy[i]]["casy"][j][maturity[typy[i]]["casy"][j].length - 1];
                        ucebna = null;
                    }
                    if(nazev == "SČMZ") {
                        if (maturity[typy[i]]["casy"][j].length != 0) cOD = maturity[typy[i]]["casy"][j];
                        cDO = null;
                        ucebna = maturity[typy[i]]["ucebny"][j];
                    }
                    if(nazev == "SLOH") {
                        cOD = maturity[typy[i]]["casy"][j][0];
                        cDO = maturity[typy[i]]["casy"][j][maturity[typy[i]]["casy"][j].length - 1];
                        ucebna = maturity[typy[i]]["ucebny"][j][0];
                    } else {
                        if(nazev == "PŽOP" && j == 1){
                            nazev += " - dodatečný termín";
                            ucebna = maturity[typy[i]]["ucebny"][j];
                        }
        
                        maturityList.push({
                            nazev: nazev,
                            typ: "celoskolni", 
                            //
                            datum: den,
                            datumDo: null,
                            casOd: cOD, 
                            casDo: cDO,
                            //
                            vyberZadani: "maturita",  
                            tykaSe: ucebna ?? null, 
                            poznamka: `Učebna: ${ucebna ?? "není"}`
                        });
                    }
                }
            }
        }
        return maturityList;
    },
    ziskatMaturityProUdalosti: () => {
        let maturity = gM();
        let maturityList = [];
        let nextID = maturity["nextID"];
        for(let i = 0; i < nextID; i++){

            if (maturity[String(i)]) {  // kontrola existence záznamu
                const maturitniEvent = maturity[String(i)];
                maturityList.push({
                    nazev: maturitniEvent.nazev,
                    typ: "celoskolni", 
                    //
                    datum: maturitniEvent.dny[y],
                    datumDo: null,
                    casOd: null, 
                    casDo: null, 
                    casyProMaturity: maturitniEvent.cas,
                    //
                    vyberZadani: "maturita",  
                    tykaSe: maturitniEvent.ucebny, 
                    poznamka: `Učebna: ${maturitniEvent.ucebny ?? "není"}`
                });
            }
        }
        return maturityList;
    },
    /*smazatMaturitniEvent: (event) => {
        let maturity = gM();
        let nextID = maturity["nextID"];
        for(let i = 0; i < nextID; i++){
            if(JSON.stringify(event) == JSON.stringify(maturity[String(i)])){
                delete maturity[String(i)];
            }
        }
        sM(maturity);
    }*/
}

// PROJEKTY
function gP(){return db.get("projekty")}
function sP(projekty){db.set("projekty", projekty)}

const projekty = {
    pridatProjekt: (trida, tymy, pitche, milestony, devlogy, prezentace) => {
        let projekty = gP();
        console.log(projekty);
        projekty[projekty["nextID"]] = {trida, tymy, pitche, milestony, devlogy, prezentace};
        projekty["nextID"] += 1;
        sP(projekty);
    },
    upravitTymy: (trida, tymy) => {
        let projekty = gP();
        let IDUpravovanehoProjektu = hledanyProjekt(trida);
        projekty[IDUpravovanehoProjektu]["tymy"] = tymy;
        sP(projekty);
    },
    upravitPitche: (trida, pitche) => {
        let projekty = gP();
        let IDUpravovanehoProjektu = hledanyProjekt(trida);
        projekty[IDUpravovanehoProjektu]["ptiche"] = pitche;
        sP(projekty);
    },
    upravitMilestony: (trida, milestony) => {
        let projekty = gP();
        let IDUpravovanehoProjektu = hledanyProjekt(trida);
        projekty[IDUpravovanehoProjektu]["milestony"] = milestony;
        sP(projekty);
    },
    upravitDevlogy: (trida, devlogy) => {
        let projekty = gP();
        let IDUpravovanehoProjektu = hledanyProjekt(trida);
        projekty[IDUpravovanehoProjektu]["devlogy"] = devlogy;
        sP(projekty);
    },
    upravitPrezentace: (trida, prezentace) => {
        let projekty = gP();
        let IDUpravovanehoProjektu = hledanyProjekt(trida);
        projekty[IDUpravovanehoProjektu]["prezentace"] = prezentace;
        sP(projekty);
    },
    ziskatIDProjektu: (trida) => {
        let projekty = gP();
        let nextID = projekty["nextID"];
        let IDHledanehoProjektu;
        for(let i = 0; i < nextID; i++){
            if(projekty[String(i)]["trida"] == trida){
                IDHledanehoProjektu = String(i);
            }
        }
        return IDHledanehoProjektu;
    },
    ziskatProjekt: (trida) => {
        let projekty = gP();
        let ID = ziskatIDProjektu(trida);
        return projekty[ID];
    }
}

// CELKOVÝ MODEL
const databaseEngine = {
    osnovy: osnovy,
    rozvrhy: rozvrhy,
    udalosti: udalosti,
    maturity: maturity,
    projekty: projekty,
    ziskatPredmety: () => {
        return db.get("predmety");
    },
    ziskatHodiny: () => {
        return db.get("hodiny");
    },
    ziskatUcebny: () => {
        return db.get("ucebny");
    }
}

module.exports = databaseEngine;
