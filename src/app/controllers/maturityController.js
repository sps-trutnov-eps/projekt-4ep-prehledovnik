
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
        let dny = [den_konani, dodatecne_dny].filter((den) => den);
        let casy = [];
        for (let i = 0; i < dny.length; i++){
            casy.push([]);
        }
        databaze.maturity.pridatMaturitniEvent("PŽOP", dny, casy, ucebna);
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

    datumy = [];
    hodiny = [];
    radky.forEach((radek) => {
        if(!datumy.includes(radek.datum)){
            datumy.push(radek.datum);
        }
        let index = datumy.indexOf(radek.datum)
        if(hodiny[index]){
            hodiny[index].push(radek.hodiny[0]);
        } else {
            hodiny.push(radek.hodiny);
        } 
    });
    databaze.maturity.pridatMaturitniEvent("PČMZ", datumy, hodiny, null); 

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
    datumy = [];
    hodiny = [];
    ucebny = [];
    radky.forEach((radek) => {
        if (radek.datum) {
            if(!datumy.includes(radek.datum)){
                datumy.push(radek.datum);
            }
            let index = datumy.indexOf(radek.datum)
            if(hodiny[index]){
                hodiny[index].push(radek.hodiny[0]);
            } else {
                hodiny.push(radek.hodiny);
            }
            ucebny.push(radek.ucebna);
        }
    });
    databaze.maturity.pridatMaturitniEvent("SČMZ", datumy, hodiny, ucebny);
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

    datumy = []
    hodiny = []
    ucebny = []
    console.log(Object.values(seskupenaData));
    Object.values(seskupenaData).forEach(zaznam => {

        if(!datumy.includes(zaznam.dny[0])){
            datumy.push(zaznam.dny[0]);
            hodiny.push([]);
            ucebny.push([]);
        }
        
        let index = datumy.indexOf(zaznam.dny[0]);
        
        zaznam.casy.forEach(cas => {
            hodiny[index].push(cas);
            ucebny[index].push(zaznam.ucebna);
        });
    });

    // rychle pouze udělané seřazení dle clauda 
    datumy.forEach((_, i) => {
        let paired = hodiny[i].map((cas, j) => ({cas: cas, ucebna: ucebny[i][j]}));
        paired.sort((a, b) => a.cas - b.cas);
        hodiny[i] = paired.map(p => p.cas);
        ucebny[i] = paired.map(p => p.ucebna);
    });
    databaze.maturity.pridatMaturitniEvent("SLOH", datumy, hodiny, ucebny);
    
    res.redirect('/maturity/sloh');
};