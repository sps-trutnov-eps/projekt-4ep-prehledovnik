const databaze = require("../models/databaseEngine");
const udalost = [27, 9, "Událost"];
const rozvrh_L = ["", "PVA", "PVA", "CJL", "CJL", "", "", "", "", "",
                "", "ELE", "ELE", "", "", "MAT", "MAT", "", "", "Krouzek",
                "", "HAE", "", "CJ", "", "POS", "POS", "", "", "",
                "", "POS", "OPS", "OPS", "OPS", "OPS", "", "", "", "",
                "", "PVA", "CJL", "CJL", "MAT", "MAT", "", "", "", "Krouzek"
]
const rozvrh_S = ["", "MAT", "MAT", "CJL", "CJL", "", "HAE", "HAE", "", "",
                "", "ELE", "ELE", "", "", "MAT", "MAT", "", "", "",
                "", "HAE", "", "CJ", "", "POS", "POS", "", "", "Krouzek",
                "", "POS", "OPS", "OPS", "OPS", "OPS", "", "", "", "",
                "", "", "MAT", "MAT", "PVA", "PVA", "", "", "", ""
]
const year = 2024

function date_udalost() {
    return udalost;
};

exports.udalosti = () => {
    return databaze.udalosti.ziskatVsechnyUdalosti();
}

exports.mesicni = (req,res) => {
    res.render('kalendar', {
        date_udalost: date_udalost(),
        udalosti: databaze.udalosti.ziskatVsechnyUdalosti()
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
//console.log(new Date(year, 12, 31)) // znějakého důvodu toto znamená 30.1.2024, měsíc o jedno vetší, den o jedno menší ?????????
if(new Date(year, 12 - 1, 31 + 1).getDay == "4"){
    posledniRocniTyden = 53
}
let tydny = []
for(let i=prvniTyden; i<=posledniRocniTyden; i++){
    tydny.push(i)
    //console.log(tydny)
}
for(let i=1; i<=posledniSkolniTyden; i++){
    tydny.push(i)
    //console.log(tydny)
}
exports.tydenni = (req,res) => {
    res.render('kalendar/tydenni', {
        rozvrh_L: rozvrh_L, 
        week: prvniTyden
    })
}