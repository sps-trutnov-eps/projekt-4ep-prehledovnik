
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
        const dateKlic = `den${pocitadloDnu}_datum`;

        if (!body[dateKlic]) {
            vsechnyDnyUlozeny = true;
        }

        const hodiny = [];
        for (let i = 1; i <= 9; i++) {
            const hourKlic = `den${pocitadloDnu}_hodina${i}`;
            if (body[hourKlic]) {
                hodiny.push(i); 
            }
        }

        if (body[dateKlic] && hodiny.length > 0) {
            radky.push({
                datum: body[dateKlic],
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
        const dateKlic = `den${pocitadloDnu}_datum`;
        if (!body[dateKlic]) {
            vsechnyDnyUlozeny = true;
            continue;
        }

        const casKlic = `den${pocitadloDnu}_cas`;
        const ucebnaKlic = `den${pocitadloDnu}_ucebna`;

        const casMaHodnotu = body[casKlic] && body[casKlic].trim() !== '';
        const ucebnaMaHodnotu = body[ucebnaKlic] && body[ucebnaKlic].trim() !== '';

        const hodiny = (casMaHodnotu && ucebnaMaHodnotu) ? [body[casKlic]] : [];
        const ucebna = (casMaHodnotu && ucebnaMaHodnotu) ? body[ucebnaKlic] : null;

        radky.push({
            datum: body[dateKlic],
            hodiny: hodiny,
            ucebna: ucebna
        });

        pocitadloDnu++;
    }

    radky.forEach((radek) => {
        if (radek.datum) {
            databaze.maturity.pridatMaturitniEvent("SČMZ", [radek.datum], radek.hodiny, radek.ucebna);
        }
    });
    res.redirect("/maturity/scmz");
};


exports.ukladanisloh = (req, res) => {
    const body = req.body;
    let pocitadloDnu = 1;

    while (body[`den${pocitadloDnu}_datum`]) {
        const datum = body[`den${pocitadloDnu}_datum`][0];
        
        for (let hodina = 1; hodina <= 9; hodina++) {
            const ucebnaKey = `den${pocitadloDnu}_ucebna-${hodina}`;
            const ucebna = body[ucebnaKey]?.[0]; 
            console.log(`Kontroluji hodinu ${hodina}, učebna: ${ucebna}`);

            if (ucebna && ucebna.trim() !== '') {
                databaze.maturity.pridatMaturitniEvent("SLOH", [datum], hodina, ucebna);
            }
        }

        pocitadloDnu++;
    }

    res.redirect('/maturity/sloh');
};