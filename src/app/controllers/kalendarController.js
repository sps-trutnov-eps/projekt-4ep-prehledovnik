const databaze = require("../models/databaseEngine");
const udalost = [];

const year = new Date().getFullYear()

function date_udalost() {
    return udalost;
};

exports.udalosti = () => {
    return databaze.udalosti.ziskatVsechnyUdalosti();
}

exports.mesicni = (req,res) => {
    console.log(databaze.struktury())
    let udalosti = databaze.udalosti.ziskatVsechnyUdalosti()
    let maturityUdalosti = databaze.maturity.ziskatVsechnyMaturityJakoUdalosti()

    udalosti = udalosti.concat(maturityUdalosti)
    res.render('kalendar', {
        date_udalost: date_udalost(),
        udalosti: udalosti
    })
}

function getWeekNumber(d) {
    const date = new Date(d.getFullYear(), d.getMonth() - 1, d.getDate() + 1);
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((days + 1) / 7);
    return weekNumber;
      
}      
let prvniTyden = getWeekNumber(new Date(year, 9, 1))
let posledniSkolniTyden = getWeekNumber(new Date(year+1, 8, 31))
let posledniRocniTyden = 52

if(new Date(year, 12 - 1, 31 + 1).getDay == "4"){
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

