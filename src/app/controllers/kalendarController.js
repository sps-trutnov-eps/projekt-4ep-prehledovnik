const databaze = require("../models/databaseEngine");
const udalost = [27, 9, "Událost"];
const rozvrh = ["", "PVA", "", "CJ", "MAT", "", "", "", "", "Krouzek"]
const startDate = new Date(2024,7,1)

function date_udalost() {
    return udalost;
};

exports.udalosti = () => {
    return databaze.udalosti.ziskatVsechnyUdalosti();
}

exports.mesicni = (req,res) => {
    res.render('kalendar/index', {
        date_udalost: date_udalost(),
        udalosti: databaze.udalosti.ziskatVsechnyUdalosti()
    })
}

function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo];
}

exports.tydenni = (req,res) => {
    res.render('kalendar/tydenni', {
        rozvrh: rozvrh, 
        week: getWeekNumber(new Date(startDate))
    })
}