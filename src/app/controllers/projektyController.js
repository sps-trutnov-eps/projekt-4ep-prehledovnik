const databaze = require("../models/databaseEngine");

exports.zobrazTymy = (req, res) => {
    res.render("projekty/tymy.ejs")
}

exports.zobrazPitche = (req, res) => {
    res.render("projekty/tymy/pitch.ejs")
}

exports.zobrazPrezentace = (req, res) => {
    res.render("projekty/tymy/prezentace.ejs")
}

exports.zobrazDetailyTymu = (req, res) => {
    res.render("projekty/tymy/detailTymu.ejs")
}