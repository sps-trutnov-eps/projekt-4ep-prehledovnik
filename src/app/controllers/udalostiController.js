const databaze = require("../models/databaseEngine");

exports.seznam = (req, res) => {
	res.render('udalosti/seznamUdalosti.ejs', {
        seznamNaZobrazeni: databaze.udalosti.ziskatVsechnyUdalosti(),
    });
}

exports.index = (req, res) => {
    res.render('udalosti/index.ejs', {
        datum: new Date().toISOString().split('T')[0],
    });
}

exports.pridat = (req, res) => {
    // Just checking
    if ((req.body.jmeno_udalosti.trim() && req.body.typAkce.trim()) != "") {
        // fetching data
        const jmeno = req.body.jmeno_udalosti.trim();
        const typAkce = req.body.typAkce.trim();
        let datum = (req.body.datum?.trim() || new Date().toISOString().split('T')[0]);
        let datumDo = null;
        //let naPocetDni = 0;
        let casOd = null;
        let casDo = null;
        let vyberZadani = "celodenni";
        if(req.body.variantaDni.trim() == "Vícedenní"){
            vyberZadani = "vicedenni";
            datumDo = req.body.datumDo?.trim() || new Date().toISOString().split('T')[0];
           //naPocetDni = Math.ceil((new Date(datumDo) - new Date(datum)) / (1000 * 60 * 60 * 24));
        } else if (req.body.variantaDni.trim() == "Zadat den a čas")
        {
            vyberZadani = "casIDatum";
            casOd = req.body.casOd.trim();
            casDo = req.body.casDo.trim();
        }
        let tykaSe = null;
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
        databaze.udalosti.pridatUdalost(jmeno, typAkce, datum, datumDo, casOd, casDo, vyberZadani, tykaSe, poznamka);
    }
    res.redirect("/udalosti/");
}