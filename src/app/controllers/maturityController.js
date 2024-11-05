
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

exports.ukladanipzop = (req, res) => {
    let den_konani = req.body.den_konani
    let dodatecne_dny = req.body.dodatecne_dny
    let ucebna = req.body.ucebna

    res.send({ "den_konani": den_konani, "dodatecne_dny": dodatecne_dny, "ucebna": ucebna })

    //res.redirect("/maturity/")
}