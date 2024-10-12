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
    }
}

// ROZVRHY
function gR(){return db.get("rozvrhy")}
function sR(rozvrhy){db.set("rozvrhy", rozvrhy)}

const rozvrhy = {
    ukazkovaFunkce: () => {

    }
}

// UDALOSTI
function gU(){return db.get("udalosti")}
function sU(udalosti){db.set("udalosti", udalosti)}

const udalosti = {
    pridatUdalost: (nazev, typ, datum, casOd, casDo, tykaSe, poznamka) => {
        let udalosti = gU();
        udalosti[udalosti["nextID"]] = {nazev, typ, datum, casOd, casDo, tykaSe, poznamka};
        udalosti["nextID"] += 1;
        sM(udalosti);
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
        let nextID = udalosti["nextID"];
        for(let i = 0; i < nextID; i++){
            udalostiList.push(udalosti[String(i)]);
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
    upravitMaturitniEvent: (nazev, dny, casy, ucebna) => {
        let maturity = gM();
        IDUpravovaneMaturity = ziskatIDMaturityDleJmena(nazev);
        maturity[IDUpravovaneMaturity] = {nazev, dny, casy, ucebna};
        sM(maturity);
    }
}

// PROJEKTY

const projekty = {

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
