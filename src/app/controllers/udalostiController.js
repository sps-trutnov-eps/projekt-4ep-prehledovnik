const databaze = require("../models/databaseEngine");

exports.seznam = (req, res) => {
	res.render('udalosti/seznamUdalosti.ejs', {
        titulek: 'Seznam událostí',
    });
}

exports.pridat = (req, res) => {
    // Just checking
    if ((req.body.jmeno_udalosti.trim() && req.body.typAkce.trim() && req.body.datum.trim() && req.body.casOd.trim() && req.body.casDo.trim()) != "") {
        // fetching data
        const jmeno = req.body.jmeno_udalosti.trim();
        const typAkce = req.body.typAkce.trim();
        const datum = req.body.datum.trim();
        const casOd = req.body.casOd.trim();
        const casDo = req.body.casDo.trim();
        const tykaSe = null;
        const poznamka = req.body.poznamka_udalosti.trim();
        // who is involved
        switch (req.body.typAkce.trim()) {
            case "celotridni":
                tykaSe = req.body.tridy.trim();
                break;
            case "budovy":
                tykaSe = req.body.budovy.trim();
                break;
            default:
                break;
        }
        databaze.udalosti.pridatUdalost(jmeno, typAkce, datum, casOd, casDo, tykaSe, poznamka);
    }
    res.render("udalosti/index.ejs");
}