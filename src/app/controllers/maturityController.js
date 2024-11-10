
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

    //res.send({ "den_konani": den_konani, "dodatecne_dny": dodatecne_dny, "ucebna": ucebna })

    res.redirect("/maturity/")
}

exports.ukladanipcmz = (req, res) => {
    let den1_datum = req.body.den1_datum;
    let zaskrtnuteHodiny = [];

    for (let i = 1; i <= 9; i++) {
        if (req.body[`den1_hodina${i}`]) {
            zaskrtnuteHodiny.push(`hodina${i}`);
        }
    }

    // Odeslání odpovìdi s datem a zaškrtnutými hodinami
    //res.send({ den1_datum: den1_datum,zaskrtnuteHodiny: zaskrtnuteHodiny});
    res.redirect("/maturity/pcmz")
};


exports.ukladaniscmz = (req, res) => {
    // Získání dat z formuláøe

    // Procházení všech øádkù tabulky a získání hodnot
    for (let i = 1; i <= 9; i++) { // Pokud oèekáváte maximálnì 9 dní
        let datum = req.body[`den${i}_datum`];
        let zadavani = req.body[`den${i}_zadavani`] ? false & true;  // Kontrola zaškrtnutí checkboxu
        let cas = req.body[`den${i}_cas`];
        let ucebna = req.body[`den${i}_ucebna`];


        // Pokud je datum zadáno, uložíme záznam
        if (datum) {
            data.push({ datum, zadavani, cas, ucebna });
        }
    }

    // Tady mùžete pøidat logiku pro uložení do databáze
    // databaze.ulozScmzData(data);

    // Odeslání odpovìdi s daty (volitelné, pro ladìní nebo potvrzení)
    res.send({ data});

    // Po zpracování pøesmìrování na stránku SCZM
    res.redirect("/maturity/scmz");
};

// Tento kód by mìl být v controlleru
exports.ukladanisloh = (req, res) => {
    console.log(req.body); // Zkontroluj, co pøijímáme z formuláøe

    // Mùžeš udìlat nìjaké zpracování dat
    let data = [];
    let x = "";
    for (let i = 1; i <= 9; i++) {
        const datum = req.body[`den1_datum`];  // Pokud máš více dní, uprav na den${i}_datum
        const ucebna = req.body[`den1_ucebna-${i}`];

        let ucebna1 = []

        for (let e = 0; e < ucebna.length; e++) {
            if (ucebna[e] != "") {
                ucebna1.push(ucebna[e])
            }
        }



        // Pøidáme podmínku, aby se vypsaly pouze položky, kde je datum a uèebna vyplnìná
        // Pokud je datum prázdné nebo ucebna prázdná, tato položka se neuloží

        if (datum && datum[0] && ucebna1 && ucebna1.length != 0) {
            data.push({ datum: datum[0], hodina:i, ucebna });
        }
    }

    res.send({ "test": data}); // Odeslání dat zpìt
    // Uložení dat nebo další akce (napø. do databáze)
    // A nakonec renderování zpìt na stránku
    res.redirect('/maturity/sloh');
};