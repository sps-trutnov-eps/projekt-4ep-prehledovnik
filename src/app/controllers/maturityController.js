
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

    // Odesl�n� odpov�di s datem a za�krtnut�mi hodinami
    //res.send({ den1_datum: den1_datum,zaskrtnuteHodiny: zaskrtnuteHodiny});
    res.redirect("/maturity/pcmz")
};


exports.ukladaniscmz = (req, res) => {
    // Z�sk�n� dat z formul��e

    // Proch�zen� v�ech ��dk� tabulky a z�sk�n� hodnot
    for (let i = 1; i <= 9; i++) { // Pokud o�ek�v�te maxim�ln� 9 dn�
        let datum = req.body[`den${i}_datum`];
        let zadavani = req.body[`den${i}_zadavani`] ? false & true;  // Kontrola za�krtnut� checkboxu
        let cas = req.body[`den${i}_cas`];
        let ucebna = req.body[`den${i}_ucebna`];


        // Pokud je datum zad�no, ulo��me z�znam
        if (datum) {
            data.push({ datum, zadavani, cas, ucebna });
        }
    }

    // Tady m��ete p�idat logiku pro ulo�en� do datab�ze
    // databaze.ulozScmzData(data);

    // Odesl�n� odpov�di s daty (voliteln�, pro lad�n� nebo potvrzen�)
    res.send({ data});

    // Po zpracov�n� p�esm�rov�n� na str�nku SCZM
    res.redirect("/maturity/scmz");
};

// Tento k�d by m�l b�t v controlleru
exports.ukladanisloh = (req, res) => {
    console.log(req.body); // Zkontroluj, co p�ij�m�me z formul��e

    // M��e� ud�lat n�jak� zpracov�n� dat
    let data = [];
    let x = "";
    for (let i = 1; i <= 9; i++) {
        const datum = req.body[`den1_datum`];  // Pokud m� v�ce dn�, uprav na den${i}_datum
        const ucebna = req.body[`den1_ucebna-${i}`];

        let ucebna1 = []

        for (let e = 0; e < ucebna.length; e++) {
            if (ucebna[e] != "") {
                ucebna1.push(ucebna[e])
            }
        }



        // P�id�me podm�nku, aby se vypsaly pouze polo�ky, kde je datum a u�ebna vypln�n�
        // Pokud je datum pr�zdn� nebo ucebna pr�zdn�, tato polo�ka se neulo��

        if (datum && datum[0] && ucebna1 && ucebna1.length != 0) {
            data.push({ datum: datum[0], hodina:i, ucebna });
        }
    }

    res.send({ "test": data}); // Odesl�n� dat zp�t
    // Ulo�en� dat nebo dal�� akce (nap�. do datab�ze)
    // A nakonec renderov�n� zp�t na str�nku
    res.redirect('/maturity/sloh');
};