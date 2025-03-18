const jsondb = require("simple-json-db");
const db = new jsondb("../data/database.json");

// VÝCHOZÍ HODNOTY UČENÍ
// Tyto hodnoty nejsou statické, v database.json
// se mění podle osnov, toto jsou pouze placeholdery.
// Formát musí zůstat takto, kvůli jednoduchosti úprav
// a kvůli tomu že části tohoto projektu, který tuto věc používají,
// se již dohodly na tomto formátu.
// Pokud někdo chce VYScv, tak si to musí udělat u sebe.
// např: let predmet = predmety[0].split('-');
// pak si jednoduše určí co je to za předmět např: console.log(predmet[0])
// či jestli je to teorie nebo cvičení např: console.log(predmet[1])
// PS: promiň že ti sem furt lezu
predmety = [
  "VYS-c",
  "VYS-t",
  "PVA-c",
  "PVA-t",
  "HAE-c",
  "HAE-t",
  "CMT-c",
  "CMT-t",
  "OPS-c",
  "OPS-t",
];
hodiny = {
  1: ["7:10", "7:55"],
  2: ["8:00", "8:45"],
  3: ["8:50", "9:35"],
  4: ["9:55", "10:40"],
  5: ["10:50", "11:35"],
  6: ["11:40", "12:25"],
  7: ["12:35", "13:20"],
  8: ["13:25", "14:10"],
  9: ["14:15", "15:00"],
  10: ["15:10", "15:55"],
};
ucebny = {
  101: ["T1", "T2", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T15", "T16", "T17"],
  59: ["E4", "F14", "G1", "G2"],
  618: [],
  374: [],
  "pocitacovky": ["T1", "T11", "T15", "T16"]
};
obory = ["EP", "IT"];

if (!db.has("predmety")) {
  db.set("predmety", predmety);
  db.set("hodiny", hodiny);
  db.set("ucebny", ucebny);
  db.set("obory", obory);
  db.set("osnovy", { nextID: 1 });
  db.set("rozvrhy", { nextID: 1 });
  db.set("udalosti", { nextID: 1 });
  db.set("maturity", {
    "PZOP": {
            "dny": [],
            "casy": [],
            "ucebny": []
        },
        "PČMZ": {
            "dny": [],
            "casy": [],
            "ucebny": []
        },
        "SČMZ": {
            "dny": [],
            "casy": [],
            "ucebny": []
        },
        "SLOH": {
            "dny": [],
            "casy": [],
            "ucebny": []
        }
  });
  db.set("projekty", { nextID: 1 });
  db.set("struktury", []);
}

// OSNOVY
function gO() {
  return JSON.parse(JSON.stringify(db.get("osnovy")));
}
function sO(osnovy) {
  db.set("osnovy", osnovy);
}

const osnovy = {
  pridatOsnovu: (trida, predmet, temata) => {
    let osnovy = gO();
    osnovy[osnovy["nextID"]] = { trida, predmet, temata };
    osnovy["nextID"] += 1;
    sO(osnovy);
    return osnovy["nextID"] - 1;
  },
  ziskatIDOsnovy: (trida, predmet) => {
    let osnovy = gO();
    let nextID = osnovy["nextID"];
    let IDhledaneOsnovy;
    for (let i = 0; i < nextID; i++) {
      if (
        osnovy[String(i)]["trida"] == trida &&
        osnovy[String(i)]["predmet"] == predmet
      )
        IDhledaneOsnovy = String(i);
    }
    return IDhledaneOsnovy;
  },
  ziskatVsechnyOsnovy: () => {
    return gO();
  },
  ziskatZadaneTridyaObory: () => {
    let osnovy = gO();
    let TridyObor = new Set();
    
    for (let id in osnovy) {
      if (id !== "nextID" && osnovy[id].trida) {
        TridyObor.add(osnovy[id].trida);
      }
    }
    
    return Array.from(TridyObor);;
  },
  upravitOsnovu: (id, data) => {
    let osnovy = gO();
    osnovy[id]["trida"] =
      data.trida == undefined ? osnovy[id]["trida"] : data.trida;
    osnovy[id]["predmet"] =
      data.predmet == undefined ? osnovy[id]["predmet"] : data.predmet;
    osnovy[id]["temata"] =
      data.temata == undefined ? osnovy[id]["temata"] : data.temata;
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
    if (id < Number(osnovy["nextID"])) {
      for (let i = id + 1; i < osnovy["nextID"]; i++) {
        osnovy[`${i - 1}`] = osnovy[i];
      }
      osnovy["nextID"] -= 1;
      delete osnovy[osnovy["nextID"]];
    }
    sO(osnovy);
  },
};


// ROZVRHY
function gR() {
  return db.get("rozvrhy");
}
function sR(rozvrhy) {
  db.set("rozvrhy", rozvrhy);
}

const rozvrhy = {
  pridatRozvrh: (datumOd, hodiny) => {
    let rozvrhy = gR();
    rozvrhy[rozvrhy["nextID"]] = { datumOd, hodiny };
    udalosti["nextID"] += 1;
    sR(rozvrhy);
  },
  ziskatIDPodleDatumu: (datumOd) => {
    let rozvrhy = gR();
    let nextID = rozvrhy["nextID"];
    let IDHledanehoRozvrhu;
    for (let i = 0; i < nextID; i++) {
      if (rozvrhy[String(i)]["datumOd"] == datumOd) {
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
    for (let i = 1; i < rozvrhy["nextID"]; i++) {
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
      hodiny,
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
      hodiny,
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
  },
  smazatRozvrh: (id) => {
    let rozvrhy = gR();
    
    if (rozvrhy[id]) {
        delete rozvrhy[id];
        sR(rozvrhy);
        return true;
    }
    
    return false;
  },
  ziskatPocetRozvrhu: () => {
    let rozvrhy = gR();
    return rozvrhy["nextID"];
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
    pridatMaturitniEvent: (nazev, dny, casy, ucebny, predmety) => {
        let maturity = gM();
        
        maturity[nazev] = null;

        if (nazev == "PZOP"){
            ucebny = [ucebny];
        } else if (nazev == "PČMZ"){
            ucebny = []
        }
        maturity[nazev] = {dny, casy, ucebny};

        if (nazev == "SČMZ"){
          maturity[nazev]["predmety"] = predmety;
        }

        sM(maturity);
    },
    ziskarMaturituDleNazvu: (nazev) => {
        let maturity = gM();
        return maturity[nazev];
    },
    ziskatVsechnyMaturity: () => {
        let maturity = gM();
        let maturityList = [];
        maturityList.push("PZOP");
        maturityList.push("PČMZ");
        maturityList.push("SČMZ");
        maturityList.push("SLOH");
        return maturityList;
    },
    ziskatVsechnyMaturityJakoUdalosti: () => {
      let maturity = gM();
      let maturityList = [];
      let typy = ["PZOP", "PČMZ", "SČMZ", "SLOH"];
      const hodiny = db.get("hodiny"); 
      
      for(let i = 0; i < typy.length; i++){
        if (maturity[typy[i]]){
          for(let j = 0; j < maturity[typy[i]]["dny"].length; j++){
            let nazev = typy[i];
            let den = maturity[typy[i]]["dny"][j];
            let cOD = null;
            let cDO = null;
            let ucebna = null;
            let typ = "ucitelsky";
            
            if(nazev == "PČMZ") {
                if (maturity[typy[i]]["casy"][j] && maturity[typy[i]]["casy"][j].length > 0) {
                  try {
                    cOD = hodiny[maturity[typy[i]]["casy"][j][0] + 1][0]; 
                    cDO = hodiny[maturity[typy[i]]["casy"][j][maturity[typy[i]]["casy"][j].length - 1] + 1][1];
                  } catch (error) {
                    console.error('Chyba při zpracování času PČMZ:', error);
                  }
                }
            } else if(nazev == "SČMZ") {
                if (maturity[typy[i]]["casy"][j] && maturity[typy[i]]["casy"][j][0]) {
                  cOD = maturity[typy[i]]["casy"][j][0];
                }
                ucebna = maturity[typy[i]]["ucebny"][j];
            } else if(nazev == "SLOH") {
                if (maturity[typy[i]]["casy"][j] && maturity[typy[i]]["casy"][j].length > 0) {
                  try {
                      const hodina = maturity[typy[i]]["casy"][j][0];
                      if (hodiny[hodina + 1]) {
                        cOD = hodiny[hodina + 1][0];
                        const posledniHodina = maturity[typy[i]]["casy"][j][maturity[typy[i]]["casy"][j].length - 1];
                        cDO = hodiny[posledniHodina + 1][1]; 
                        typ = "celotridni";
                      }
                  } catch (error) {
                    console.error('Chyba při zpracování času SLOH:', error);
                  }
                }
            } else if(nazev == "PZOP") {
              if(j == 1) {
                nazev += " - dodatečný termín";
              }
              typ = "ucebna";
              ucebna = maturity[typy[i]]["ucebny"][0];
            }
            
            maturityList.push({
              nazev: nazev,
              typ: typ,
              datum: den,
              datumDo: null,
              casOd: cOD,
              casDo: cDO,
              vyberZadani: "maturita",
              tykaSe: ucebna,
              poznamka: ucebna ? `Učebna: ${ucebna}` : 'Učebna není zadána'
            });
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
function gP() {
   return db.get("projekty");
}
function sP(projekty) {
   db.set("projekty", projekty);
}

const projekty = {
  ziskatVse: () => {
    return gP();
  },
  pridatProjekt: (trida, datum) => {
    let projekty = gP();
    let nextID = projekty["nextID"];
    projekty[nextID] = {trida, "tymy": [], datum};
    projekty["nextID"] += 1;
    sP(projekty);
  },
  upravitProjekt: (tridaID, datum) => {
    let projekty = gP();
    let nextID = projekty["nextID"];
    projekty[tridaID]["datum"] = datum;
    sP(projekty);
  },
  pridatTym: (IDtridy, cislo, tema, odkaz, clenove, maily, vedouci, featury, stretchgoaly, poznamka, ucast, pocetCom, znamkyDev, znamkyCom) => {
    let projekty = gP();
    //let IDtridy = ziskatIDprojektuDleTridy(trida); Doesn't work, I guess it's because it's in the same.. json?
    projekty[String(IDtridy)]["tymy"].push({
      cislo,
      tema,
      odkaz,
      clenove,
      maily,
      vedouci,
      "pitch": {
        featury,
        stretchgoaly,
        poznamka,
        ucast
      },
      "pocetCom": pocetCom,
      "znamkyDev": znamkyDev,
      "znamkyCom": znamkyCom
      });
    sP(projekty);
  },
  ziskatTym: (IDtridy, cislo) => {
    let projekty = gP();
    //let IDtridy = ziskatIDprojektuDleTridy(trida); Doesn't work, I guess it's because it's in the same.. json?
    for (let i = 0; i < projekty[String(IDtridy)]["tymy"].length; i++){
      if (projekty[String(IDtridy)]["tymy"][i]["cislo"] == cislo){
        return projekty[String(IDtridy)]["tymy"][i];
      }
    }
  },
  ziskatCelouTridu: (IDtridy) => {
    let projekty = gP();
    //let IDtridy = ziskatIDprojektuDleTridy(trida); Doesn't work, I guess it's because it's in the same.. json?
    return projekty[String(IDtridy)];
  },
  ziskatIDprojektuDleTridy: (trida) => {
    let projekty = gP();
    let nextID = projekty["nextID"];
    let IDHledanehoProjektu;
    for (let i = 1; i < nextID; i++) {
      if (projekty[String(i)]["trida"] == trida) {
        IDHledanehoProjektu = String(i);
      }
    }
    return IDHledanehoProjektu;
  },
  upravitTym: (IDtridy, tym) => {
    let projekty = gP();
    //let IDtridy = ziskatIDprojektuDleTridy(trida); Doesn't work, I guess it's because it's in the same.. json?
    let cislo = tym["cislo"];
    for (let i = 0; i < projekty[String(IDtridy)]["tymy"].length; i++){
      if (projekty[String(IDtridy)]["tymy"][i]["cislo"] == cislo){
        projekty[String(IDtridy)]["tymy"][i] = tym;
        break;
      }
    }
    sP(projekty);
  },
  upravitTymPodleStarehoCisla: (IDtridy, tym, tymCisloPredchozi) => {
    let projekty = gP();
    //let IDtridy = ziskatIDprojektuDleTridy(trida); Doesn't work, I guess it's because it's in the same.. json?
    let cislo = tymCisloPredchozi;
    for (let i = 0; i < projekty[String(IDtridy)]["tymy"].length; i++){
      if (projekty[String(IDtridy)]["tymy"][i]["cislo"] == cislo){
        projekty[String(IDtridy)]["tymy"][i] = tym;
        break;
      }
    }
    sP(projekty);
  },
  odebratTym: (IDtridy, cisloTymu) => {
    let projekty = gP();
    let index = 0;
    //let IDtridy = ziskatIDprojektuDleTridy(trida); Doesn't work, I guess it's because it's in the same.. json?
    for (let i = 0; i < projekty[String(IDtridy)]["tymy"].length; i++){
      if (projekty[String(IDtridy)]["tymy"][i]["cislo"] == cisloTymu){
        index = i;
      }
    }
    projekty[String(IDtridy)]["tymy"].splice(index, 1);
  }
};

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
  // Předej všechny předměty v array
  // Formát:
  // ["VYS-t", "VYS-c", "PVA-t"]
  // je potřeba dodržovat tento formát, protože se s ním lépe manipuluje
  nastavitPredmety: (predmety) => {
    db.set("predmety", predmety);
    db.sync();
  },
  ziskatHodiny: () => {
    return db.get("hodiny");
  },
  ziskatObory: () => {
    return db.get("obory");
  },
  ziskatUcebny: () => {
    return db.get("ucebny");
  },
  struktury: tvorbaStruktur,
  ziskatStruktury: () => {
    return db.get("struktury");
  }
};

function tvorbaStruktur(maturity) {
  let rozvrhy = gR();
  let osnovy = gO();
  let udalosti = gU();

  let struktury = [];

  const increment = 24 * 60 * 60 * 1000;
  const dnesniDatum = new Date();
  const aktualniRok = dnesniDatum.getFullYear();
  const rok = dnesniDatum.getMonth() < 7 ? aktualniRok - 1 : aktualniRok;

  const startDate = new Date(rok, 7, 1);
  const endDate = new Date(rok + 1, 6, 31);
  let baseMonday = getFirstMondayOfSeptember(rok);

  let vsechnyDny = []; // Seznam všech dní pro přehlednost

  for (let i = startDate.getTime(); i <= endDate.getTime(); i += increment) {
    let datum = new Date(i);
    let denVTydnu = datum.getDay();
    let formattedDate = `${datum.getDate()}.${datum.getMonth() + 1}.`;

    let tydenOdZacatku = getWeekNumber(datum);
    let lichySud = tydenOdZacatku % 2 === 0 ? "sudy" : "lichy";

    const dniMap = ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"];
    let denNazev = dniMap[denVTydnu];

    if (denVTydnu === 0 || denVTydnu === 6) continue;

    let denStruktura = {
      datum: formattedDate,
      den: denNazev,
      tyden: tydenOdZacatku,
      lichySud: lichySud,
      hodiny: [],
      udalosti: [],
    };

    let datumISO = new Date(datum.getTime() - datum.getTimezoneOffset() * 60000)
    .toISOString().split("T")[0];


    let udalostiArray = Object.entries(udalosti)
      .filter(([key, value]) => key !== "nextID")
      .map(([key, value]) => ({ id: key, ...value }));

    denStruktura.udalosti = udalostiArray.filter(u => u.datum === datumISO);

    // Pokud je v tento den událost typu "Škola", "Budova" nebo "Učitel", všechny hodiny jsou zrušené
    let jeDenZrusen = denStruktura.udalosti.some(u =>
      ["Škola", "Budova", "Učitel"].includes(u.typ)
    );

    if (!jeDenZrusen && rozvrhy[Number(rozvrhy["nextID"]) - 1]?.hodiny?.[lichySud]?.[denNazev]) {
      for (let j = 0; j <= 9; j++) {
        let hodinaData = rozvrhy[Number(rozvrhy["nextID"]) - 1].hodiny[lichySud][denNazev][j];

        if (hodinaData) {
          let predmet = hodinaData.predmet !== "volno" ? hodinaData.predmet : "";
          let skupina = hodinaData.predmet !== "volno" ? hodinaData.skupina : "";
          let key = predmet + hodinaData.trida + skupina;

          if (predmet !== "") {
            let novaHodina = {
                cislo: j,
                predmet: predmet,
                skupina: skupina,
                trida: hodinaData.trida,
                mistnost: hodinaData.mistnost,
                tema: null, // Přidáme až po kontrole blokací
            };

            if (!jeHodinaBlokovana(novaHodina, denStruktura.udalosti)) {
              denStruktura.hodiny.push(novaHodina); // Přidáme jen pokud není blokovaná
            }
          }
        }
      }
    }

    vsechnyDny.push(denStruktura);
  }

  // Přiřadíme témata s posunem
  priraditTemata(vsechnyDny, osnovy);

  db.set("struktury", vsechnyDny);
}

function getFirstMondayOfSeptember(year) {
  let date = new Date(year, 8, 1);
  while (date.getDay() !== 1) {
    date.setDate(date.getDate() + 1);
  }
  return date;
}

function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  let dayNum = d.getUTCDay() || 7;  // Převod neděle (0) na 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum); // Nastavení na čtvrtek daného týdne
  let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function priraditTemata(vsechnyDny, osnovy) {
  let cekajiciTemata = {}; // Fronta témat pro každý předmět + třídu

  vsechnyDny.forEach(den => {
    den.hodiny.forEach(hodina => {
      let osnovaID = Object.keys(osnovy).find(id =>
        osnovy[id].trida === hodina.trida && osnovy[id].predmet === hodina.predmet
      );

      if (!osnovaID) return; // Osnova neexistuje, přeskočíme

      let temata = osnovy[osnovaID].temata;
      let temaKeys = Object.keys(temata).filter(k => k !== "nextID").sort((a, b) => a - b);

      // Pokud byl den zrušen, přesuneme téma do čekací fronty
      if (den.udalosti.some(u => ["Škola", "Budova", "Učitel"].includes(u.typ))) {
        if (!cekajiciTemata[osnovaID]) cekajiciTemata[osnovaID] = temaKeys.map(k => ({ ...temata[k], id: k }));
        return;
      }

      // Pokud jsou témata ve frontě, přesuneme je nejprve
      if (cekajiciTemata[osnovaID] && cekajiciTemata[osnovaID].length > 0) {
        let temaData = cekajiciTemata[osnovaID].shift();
        hodina.tema = temaData.tema;
        temaData.pocetHodin--;
        if (temaData.pocetHodin > 0) cekajiciTemata[osnovaID].unshift(temaData);
        return;
      }

      // Normální přiřazení tématu
      for (let temaID of temaKeys) {
        let temaData = temata[temaID];

        if (temaData.pocetHodin > 0) {
          hodina.tema = temaData.tema;
          temaData.pocetHodin--;
          break;
        }
      }
    });
  });

  // Pokud jsou stále čekající témata, pokusíme se je přiřadit do dalších dnů
  if (Object.keys(cekajiciTemata).length > 0) {
    let dnyPoAktualnim = vsechnyDny.slice(vsechnyDny.indexOf(den) + 1);

    for (let den of dnyPoAktualnim) {
      if (Object.keys(cekajiciTemata).length === 0) break; // Pokud nejsou čekající témata, končíme

      den.hodiny.forEach(hodina => {
        let osnovaID = Object.keys(cekajiciTemata).find(id =>
          osnovy[id].trida === hodina.trida && osnovy[id].predmet === hodina.predmet
        );

        if (!osnovaID) return;

        if (!den.udalosti.some(u => ["Škola", "Budova", "Učitel"].includes(u.typ)) && cekajiciTemata[osnovaID].length > 0) {
          let temaData = cekajiciTemata[osnovaID].shift();
          hodina.tema = temaData.tema;
          temaData.pocetHodin--;
          if (temaData.pocetHodin > 0) cekajiciTemata[osnovaID].unshift(temaData);
        }
      });
    }
  }
}

function jeHodinaBlokovana(hodina, udalosti) {
  let blokovana = udalosti.some(udalost => {
      if (["celoskolni", "budovy", "ucitelsky"].includes(udalost.typ)) {
          return true;
      }
      if (udalost.typ === "celotridni" && hodina.trida === udalost.tykaSe) {
          return true;
      }
      if (udalost.typ === "ucebna" && hodina.mistnost === udalost.tykaSe) {
          return true;
      }
      return false;
  });
  return blokovana;
}

module.exports = databaseEngine;
