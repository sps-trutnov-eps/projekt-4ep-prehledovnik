const databaze = require("../models/databaseEngine");
const udalost = [27, 9, "Událost"];
const rozvrh = ["", "PVA", "", "CJ", "MAT", "", "", "", "", "Krouzek"]

exports.date_udalost = () => {
    return udalost;
};
exports.rozvrh = () => {
    return rozvrh;
};
