const jsondb = require("simple-json-db");
const db = new jsondb("./data/database.json");

// VÝCHOZÍ HODNOTY UČENÍ
predmety = ["VYS-c", "VYS-t", "PVA-c", "PVA-t", "HAE-c", "HAE-t", "CMT-c", "CMT-t", "OPS-c", "OPS-t"];
hodiny = {
    "1": ["7:10", "7:55"],
    "2": ["8:00", "8:45"],
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
    db.set("maturity", {"nextID": 1});
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

// získání předmětů z databáze
function ziskatPredmety() {
    return db.get("predmety");
}

function ziskatUcebny() {
    return db.get("ucebny")
}

// export funkcí
module.exports = {
    osnovy,
    ziskatPredmety,
    ziskatUcebny
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
        udalosti[udalosti["nextID"]] = {nazev, typ, datum,  datumDo, casOd, casDo, vyberZadani, tykaSe, poznamka};
        udalosti["nextID"] += 1;
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
            if(JSON.stringify(udalosti[String(i)]) === JSON.stringify(puvodniUdalost))
                udalosti[String(i)] = novaUdalost;
        }
        sU(udalost);
    },
    odebratUdalost: (udalost) => {
        let udalosti = gU();
        let nextID = udalosti["nextID"];
        for(let i = 0; i < nextID; i++){
            if(JSON.stringify(udalosti[String(i)]) === JSON.stringify(udalost))
                delete udalosti[String(i)];
        }
        sU(udalost);
    }
}

// MATURITY
function gM(){return db.get("maturity")}
function sM(maturity){db.set("maturity", maturity)}

const maturity = {
    pridatMaturitniEvent: (nazev, dny, casy, ucebna) => {
        let maturity = gM();
        maturity[maturity["nextID"]] = {nazev, dny, casy, ucebna};
        maturity["nextID"] += 1;
        sM(maturity);
    },
    ziskatIDMaturityDleJmena: (jmeno) => {
        let maturity = gM();
        let nextID = maturity["nextID"];
        let IDHledaneMaturity;
        for(let i = 0; i < nextID; i++){
            if (maturity[String(i)]["nazev"] == jmeno){
                IDHledaneMaturity = String(i);
            }
        }
        return IDHledaneMaturity;
    },
    ziskarMaturituDleJmena: (jmeno) => {
        let maturity = gM();
        return maturity[ziskatIDMaturityDleJmena(jmeno)];
    },
    ziskatVsechnyMaturity: () => {
        let maturity = gM();
        let maturityList = [];
        let nextID = maturity["nextID"];
        for(let i = 0; i < nextID; i++){
            maturityList.push(maturity[String(i)]);
        }
        return maturityList;
    },
    ziskatVsechnyMaturityJakoUdalosti: () => {
        let maturity = gM();
        let maturityList = [];
        let nextID = maturity["nextID"];
        for(let i = 0; i < nextID; i++){
            if (maturity[String(i)]) {  // kontrola existence záznamu
                const maturitniEvent = maturity[String(i)];
                
                // Pro každý den v maturitě vytvoříme samostatnou událost
                maturityList.push({
                    // tohle =>

                    nazev: maturitniEvent.nazev,
                    typ: "celoskolni", 
                    datum: den, // napsat začáteční datum 
                    datumDo: den, // a den, kdy to končí (pokud není nastavte null)
                    // většinou jsou maturity celý den. pokud ale mátě vskutku někde z nějakého důvodu čas =>
                    // a doufám, že tam nebude zbytečně (je to kvůli zpracování dat)
                    casOd: maturitniEvent.casy.od, // začáteční čas (pokud není nastavte null)
                    casDo: maturitniEvent.casy.do,  // konečný čas (pokud není nastavte null)
                    vyberZadani: "maturita",  
                    tykaSe: maturitniEvent.ucebna, 
                    poznamka: `Učebna: ${maturitniEvent.ucebna}`

                });
            }
        }
        return maturityList;
    },
    upravitMaturitniEvent: (nazev, dny, casy, ucebna) => {
        let maturity = gM();
        IDUpravovaneMaturity = ziskatIDMaturityDleJmena(nazev);
        maturity[IDUpravovaneMaturity] = {nazev, dny, casy, ucebna};
        sM(maturity);
    }
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
        return predmety;
    },
    ziskatHodiny: () => {
        return hodiny;
    },
    ziskatUcebny: () => {
        return ucebny;
    }
}

module.exports = databaseEngine;
