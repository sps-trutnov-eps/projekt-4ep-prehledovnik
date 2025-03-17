const databaze = require("../models/databaseEngine");
const udalost = [];

let startYear
let endYear

let now = new Date()

if(now.getMonth() > 7){
    startYear = now.getFullYear()
    endYear = startYear + 1
}else{
    endYear = now.getFullYear()
    startYear = endYear-1
}
//console.log(startYear)


function date_udalost() {
    return udalost;
};

exports.udalosti = () => {
    return databaze.udalosti.ziskatVsechnyUdalosti();
}

exports.mesicni = (req, res) => {
    // Přidání datumISO pro frontend, pokud chybí
    let struktury = databaze.ziskatStruktury();
    
    // Zajistíme, že máme všechna data v požadovaném formátu
    struktury.forEach(den => {
        if (!den.datumISO) {
            // Pokud datumISO chybí, pokusíme se ho vytvořit z data
            const parts = den.datum.split('.');
            if (parts.length === 2) {
                const day = parts[0].padStart(2, '0');
                const month = parts[1].padStart(2, '0');
                const year = month < 8 ? new Date().getFullYear() + 1 : new Date().getFullYear();
                den.datumISO = `${year}-${month}-${day}`;
            }
        }
    });
    
    // Získáme udalosti pro frontend skript
    const udalosti = databaze.udalosti.ziskatVsechnyUdalosti();
    
    res.render('kalendar', { struktury: struktury, udalosti: udalosti });
};

function getFirstMondayInSeptember(startYear) {
    // Nastavíme datum na 1. září daného roku
    let date = new Date(startYear, 8, 1); // měsíc září je indexován jako 8 (0 = leden, 1 = únor, ...)
    
    // Zjistíme, jaký den v týdnu je 1. září
    let dayOfWeek = date.getDay();
    
    // Pokud je 1. září pondělí (den 1), vrátíme tento den
    if (dayOfWeek === 1) {
        return date;
    }
    
    // Jinak přidáme dny do dalšího pondělí
    let daysToAdd = (8 - dayOfWeek) % 7; // Spočítáme, jaký den je následující pondělí
    date.setDate(date.getDate() + daysToAdd);
    
    return date;
}

let firstMonday = getFirstMondayInSeptember(startYear);
console.log(firstMonday.toDateString()); // Vytiskne první pondělí v září 2025


function getWeekNumber(d) {
    const date = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((days + 1) / 7);
    return weekNumber;
      
}      
let prvniTyden = getWeekNumber(firstMonday)
let posledniSkolniTyden = getWeekNumber(new Date(endYear, 8, 31))
let posledniRocniTyden = 52

if(new Date(startYear, 12 - 1, 31 + 1).getDay == "4"){
    posledniRocniTyden = 53
}
let tydny = []
for(let i=prvniTyden; i<=posledniRocniTyden; i++){
    tydny.push(i)
}
for(let i=1; i<=posledniSkolniTyden; i++){
    tydny.push(i)
}
exports.tydenni = (req,res) => {
    databaze.struktury(databaze.maturity.ziskatVsechnyMaturityJakoUdalosti());
    let osnovyRaw = databaze.osnovy.ziskatVsechnyOsnovy();
    let osnovy = {}

    const rozvrh = databaze.rozvrhy.ziskatRozvrh(databaze.rozvrhy.ziskatPocetRozvrhu()-1)

    for (let id in osnovyRaw){
        if(id != "nextID"){
            var osnova = osnovyRaw[id]
            let key = osnova.predmet + osnova.trida
            key = key.replace("-t", "")
            key = key.replace("-c", "cv")
            let index = 0;
            osnovy[key] = [];
            for (let tema in osnova.temata){
                if(tema != "nextID")
                for(let i=0; i< osnova.temata[tema].pocetHodin; i++){
                    osnovy[key][index] = osnova.temata[tema].tema
                    index++;
                }
            }
        }        
    }

    res.render('kalendar/tydenni', {
        rozvrh: rozvrh, 
        week: tydny,
        osnovy: osnovy,
        udalosti: databaze.udalosti.ziskatVsechnyUdalosti()
    })
}

