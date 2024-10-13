const databaze = require("../models/databaseEngine");

exports.zobrazTymy = (req, res) => {
    res.render("projekty/tymy" );
}

exports.zobrazPitche = (req, res) => {
    res.render("projekty/pitch");
}

exports.zobrazPrezentace = (req, res) => {
    res.render("projekty/prezentace");
}

exports.zobrazDetailyTymu = (req, res) => {
    res.render("projekty/detailTymu");
}