
const databaseEngine = require("../models/databaseEngine");
const databaze = require("../models/databaseEngine");

exports.pcmz = (req, res) => {
    res.render("maturity/pcmz.ejs");
};

exports.sloh = (req, res) => {
    res.render("maturity/sloh.ejs");
};

exports.scmz = (req, res) => {
    res.render("maturity/scmz.ejs");
};

exports.ukladanipzop = (req, res) => {
    const {den_konani, dodatecne_dny, ucebna} = req.body;
    console.log("Přijatá data:", {den_konani, dodatecne_dny, ucebna});

    if (!den_konani) {
        res.redirect("/maturity/");
    }
    else if (!den_konani && dodatecne_dny) {
        res.redirect("/maturity/");
    }
    else {
        databaze.maturity.pridatMaturitniEvent("PŽOP",[den_konani, dodatecne_dny].filter((den) => den), [], ucebna);
    }

    res.redirect("/maturity/");
};

exports.ukladanipcmz = (req, res) => {
    const body = req.body;
    let vsechnyDnyUlozeny = false;

    const radky = [];
    let pocitadloDnu = 1;

    while (!vsechnyDnyUlozeny) {
        const dateKey = `den${pocitadloDnu}_datum`;

        if (!body[dateKey]) {
            vsechnyDnyUlozeny = true;
        }

        const hodiny = [];
        for (let i = 1; i <= 9; i++) {
            const hourKey = `den${pocitadloDnu}_hodina${i}`;
            if (body[hourKey]) {
                hodiny.push(i); 
            }
        }

        if (body[dateKey] && hodiny.length > 0) {
            radky.push({
                datum: body[dateKey],
                hodiny: hodiny,
            });
        }

        pocitadloDnu++;
    }

    radky.forEach((radek) => {
        databaze.maturity.pridatMaturitniEvent("PČMZ", [radek.datum], radek.hodiny, null); 
    });

    res.redirect("/maturity/pcmz");
};

exports.ukladaniscmz = (req, res) => {
    const body = req.body;
    let vsechnyDnyUlozeny = false;
    const radky = [];
    let pocitadloDnu = 1;

    while (!vsechnyDnyUlozeny) {
        const dateKey = `den${pocitadloDnu}_datum`;
        if (!body[dateKey]) {
            vsechnyDnyUlozeny = true;
            continue;
        }

        const checkboxKey = `den${pocitadloDnu}_checkbox`;
        const casKey = `den${pocitadloDnu}_cas`;
        const ucebnaKey = `den${pocitadloDnu}_ucebna`;

        if (body[checkboxKey]) {
            const cas = body[casKey];
            const ucebna = body[ucebnaKey];

            if (!cas || !ucebna) {
                continue;
            }
        }

        radky.push({
            datum: body[dateKey],
            hodiny: body[checkboxKey] ? [body[casKey], body[ucebnaKey]] : [] 
        });

        pocitadloDnu++;
    }

    
    radky.forEach((radek) => {
        if (radek.datum) {
            console.log("Ukládám event:", {
                nazev: "SČMZ",
                dny: [radek.datum],
                casy: radek.hodiny,
                ucebna: radek.ucebna
            });
            databaze.maturity.pridatMaturitniEvent("SČMZ", [radek.datum], radek.hodiny, null);
        }
    });
    res.redirect("/maturity/scmz");
};


exports.ukladanisloh = (req, res) => {
    console.log(req.body); 


    let data = [];
    let x = "";
    for (let i = 1; i <= 9; i++) {
        const datum = req.body[`den1_datum`]; 
        const ucebna = req.body[`den1_ucebna-${i}`];

        let ucebna1 = []

        for (let e = 0; e < ucebna.length; e++) {
            if (ucebna[e] != "") {
                ucebna1.push(ucebna[e])
            }
        }




        if (datum && datum[0] && ucebna1 && ucebna1.length != 0) {
            data.push({ datum: datum[0], hodina:i, ucebna });
        }
    }

    res.send({ "test": data}); 
    res.redirect('/maturity/sloh');
};