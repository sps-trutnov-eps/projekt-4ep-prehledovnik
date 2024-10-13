const databaze = require("../models/databaseEngine");

exports.pcmz = (req, res) => {
    res.render("maturity/pcmz.ejs");
}

exports.sloh = (req, res) => {
    res.render("maturity/sloh.ejs");
}

exports.scmz = (req, res) => {
    res.render("maturity/scmz.ejs");
}

