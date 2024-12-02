
const databaseEngine = require("../models/databaseEngine");
const databaze = require("../models/databaseEngine");

exports.pcmz = (req, res) => {
    let pcmzdata = databaze.maturity.ziskatMaturituDleJmena("PČMZ")
    let dny = pcmzdata['dny']
    let casy = pcmzdata['casy']
    let ucebna = pcmzdata['ucebna']

    let new_data = {}

    for (let i = 0; i < pcmzdata.length; i++) {
        den = pcmzdata[i].dny[0]
        casy = pcmzdata[i].casy
        if (!new_data[den]) {
            new_data[den] = []
        }
        for (let i = 0; i < casy.length; i++) {
            if (!new_data[den].includes(casy[i])) {
                new_data[den].push(casy[i])
            }
        }
    }
    for (const key in new_data) {
        for (let i = 0; i < new_data[key].length; i++) {
            console.log(key, new_data[key][i])
        }
    }


    res.render("maturity/pcmz.ejs", {"data" : new_data});
};

exports.sloh = (req, res) => {

    let slohdata = databaze.maturity.ziskatMaturituDleJmena("SLOH")

    let new_data = {}


    for (let i = 0; i < slohdata.length; i++) {
        den = slohdata[i].dny[0]
        if (den) {
            if (!new_data[den]) {
                new_data[den] = []
            }
            for (let y = 0; y < slohdata[i].casy.length; y++) {
                new_data[den].push([slohdata[i].casy[y], slohdata[i].ucebna])
            }
        }
    }

    console.log(new_data)
    res.render("maturity/sloh.ejs", {"data" : new_data});
    
};

exports.scmz = (req, res) => {
    let scmzdata = databaze.maturity.ziskatMaturituDleJmena("SCMZ")

    let new_data = []



    for (let i = 0; i < scmzdata.length; i++) {
        den = slohdata[i].dny[0]
        if (den) {
            new_data.push(scmzdata[i])
        }
    }
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
            let denRadky = [];
            let posledniHodina = hodiny[0];

            denRadky.push({ datum: body[dateKlic], hodiny: [posledniHodina] });

            for (let j = 1; j < hodiny.length; j++) {
                if (hodiny[j] === posledniHodina + 1) {
                    denRadky[denRadky.length - 1].hodiny.push(hodiny[j]);
                } else {
                    denRadky.push({ datum: body[dateKlic], hodiny: [hodiny[j]] });
                }
                posledniHodina = hodiny[j]; 
            }
            // to podtím je jako kdyby se dělal for, ale kratší XD
            radky.push(...denRadky);
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

    const seskupenaData = {};

    while (body[`den${pocitadloDnu}_datum`]) {
        const datum = body[`den${pocitadloDnu}_datum`][0];
        
        for (let hodina = 1; hodina <= 9; hodina++) {
            const ucebnaKey = `den${pocitadloDnu}_ucebna-${hodina}`;
            const ucebna = body[ucebnaKey]?.[0]; 

            if (ucebna && ucebna.trim() !== '') {
                const skupinaKlic = `${datum}_${ucebna}`;

                if (!seskupenaData[skupinaKlic]) {
                    seskupenaData[skupinaKlic] = {nazev: "SLOH", dny: [datum], casy: [], ucebna: ucebna};
                };

                seskupenaData[skupinaKlic].casy.push(hodina);
            }
        }
        pocitadloDnu++;
    }

    Object.values(seskupenaData).forEach(zaznam => {
        zaznam.casy.sort((a, b) => a - b);
        databaze.maturity.pridatMaturitniEvent(zaznam.nazev, zaznam.dny, zaznam.casy, zaznam.ucebna);
    });

    res.redirect('/maturity/sloh');
};