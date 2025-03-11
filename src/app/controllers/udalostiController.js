const databaze = require("../models/databaseEngine");

// exports.seznam = (req, res) => {
// 	res.render('udalosti/seznamUdalosti.ejs', {
//         seznamNaZobrazeni: databaze.udalosti.ziskatVsechnyUdalosti(),
//     });
// }

exports.index = (req, res) => {
    const allEvents = (databaze.udalosti.ziskatVsechnyUdalosti() || [])
        .concat(databaze.maturity.ziskatVsechnyMaturityJakoUdalosti() || [])
        .sort((a, b) => (a?.datum ? new Date(a.datum) : new Date(0))
                        - (b?.datum ? new Date(b.datum) : new Date(0))
                        ||
                        (!a?.casOd ?
                            1 : !b?.casOd ?
                                -1 : typeof a.casOd === 'string' ?
                                    a.casOd.localeCompare(b.casOd) : 0));
    res.render('udalosti/index.ejs', {
        seznamNaZobrazeni: allEvents, 
        datum: new Date().toISOString().split('T')[0],
        TridyObory: databaze.osnovy.ziskatZadaneTridyaObory()
    });
}

exports.smazat = (req, res) => {
    databaze.udalosti.odebratUdalost(req.params.data);
    databaze.struktury(databaze.maturity.ziskatVsechnyMaturityJakoUdalosti());
    res.redirect("/udalosti");
}

exports.pridat = (req, res) => {
    // Just checking
    if ((req.body.jmeno_udalosti.trim() && req.body.typAkce.trim()) != "") {
        // fetching data
        const jmeno = req.body.jmeno_udalosti.trim();
        const typAkce = req.body.typAkce.trim();
        let datum = (req.body.datum?.trim() || new Date().toISOString().split('T')[0]);
        let datumDo = null;
        let casOd = null;
        let casDo = null;
        let vyberZadani = "celodenni";
        if (req.body.variantaDni.trim() == "Vícedenní") {
            datumDo = req.body.datumDo?.trim() || null;
            if (datumDo) {
                vyberZadani = "vicedenni";
            }
           //PocetDni = Math.ceil((new Date(datumDo) - new Date(datum)) / (1000 * 60 * 60 * 24));
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
            case "ucitelsky":
                tykaSe = "Jakub Šenkýř";
            case "ucebna":
                tykaSe = req.body.ucebna.trim();
                break;
            default:
                break;
        }
        if(!req.body.PuvodniData) {
            databaze.udalosti.pridatUdalost(jmeno, typAkce, datum, datumDo, casOd, casDo, vyberZadani, tykaSe, poznamka);
        } 
        else {
            let novaUdalost = {nazev:jmeno, typ:typAkce,  datum, datumDo, casOd, casDo, vyberZadani, tykaSe, poznamka};
            databaze.udalosti.upravitUdalost(req.body.PuvodniData, novaUdalost);
        }
    }
    databaze.struktury(databaze.maturity.ziskatVsechnyMaturityJakoUdalosti());
    res.redirect("/udalosti");
}
