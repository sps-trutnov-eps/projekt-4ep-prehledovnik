const jsondb = require("simple-json-db");
const db = new jsondb("./data/database.json");

// VÝCHOZÍ HODNOTY UČENÍ
predmety = ["VYS", "PVA", "HAE", "CMT", "OPS"];
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
    pridatOsnovu: () => {
        let osnovy = gO();
        osnovy[osnovy["nextID"]] = {"objekt": "osnova"};
        osnovy["nextID"] += 1;
        sO(osnovy);
    },
    ziskatIdOsnovyDle: () => {

    },
    upravitOsnovu: () => {

    },
    odstranitOsnovu: (id) => {
        let osnovy = gO();
    
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
    ukazkovaFunkce: () => {

    }
}

// MATURITY
function gM(){return db.get("maturity")}
function sM(maturity){db.set("maturity", maturity)}

const maturity = {
    pridatMaturitniEvent: (nazev, dny, casy, ucebna) => {
        let maturity = gM();
        maturity[maturity["nextID"]] = {"nazev": nazev, "dny": dny, "casy": casy, "ucebna": ucebna};
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
    upravitMaturitniEvent: (nazev, dny, casy, ucebna) => {
        let maturity = gM();
        IDUpravovaneMaturity = ziskatIDMaturityDleJmena(nazev);
        maturity[IDUpravovaneMaturity] = {"nazev": nazev, "dny": dny, "casy": casy, "ucebna": ucebna};
        sM(maturity);
    }
}

// CELKOVÝ MODEL
const databaseEngine = {
    osnovy: osnovy,
    rozvrhy: rozvrhy,
    udalosti: udalosti,
    maturity: maturity
}

module.exports = databaseEngine;
