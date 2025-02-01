
const databaseEngine = require("../models/databaseEngine");
const databaze = require("../models/databaseEngine");

exports.pzop = (req, res) => {
    let data = databaze.maturity.ziskarMaturituDleNazvu('PŽOP')

    ucebna = data.ucebny[0] 
    dny = data.dny 
    const ucebny = ["T1", "T11", "T15", "T16"];

    res.render('maturity/index.ejs', {"ucebna" : ucebna, "dny" : dny, "ucebny": ucebny})
}

exports.pcmz = (req, res) => {

    let data = databaze.maturity.ziskarMaturituDleNazvu('PČMZ')

    let dnyacasy = {}
    for (let i = 0; i < data.dny.length; i++) {
        dnyacasy[data.dny[i]] = data.casy[i]
    }

    res.render("maturity/pcmz.ejs", {"data" : dnyacasy});
};

exports.sloh = (req, res) => {
    let data = databaze.maturity.ziskarMaturituDleNazvu('SLOH')

    let dnyacasy = {}
    for (let i = 0; i < data.dny.length; i++) {
        casy = data.casy[i]
        dnyacasy[data.dny[i]] = []
        for (let x = 0; x < casy.length; x++) {
            dnyacasy[data.dny[i]].push([data.casy[i][x], data.ucebny[i][x]])
        }
    }

    console.log(data)
    res.render("maturity/sloh.ejs", { "data": dnyacasy });
};

exports.scmz = (req, res) => {
    let data = databaze.maturity.ziskarMaturituDleNazvu('SČMZ')

    let dnyacasy = {}
    console.log(data);
    for (let i = 0; i < data.dny.length; i++) {
        casy = data.casy[i];
        dnyacasy[data.dny[i]] = [];
        dnyacasy[data.dny[i]].push(data.casy[i][0], data.casy[i][1], data.ucebny[i], data.predmety[i]);
    }

    res.render("maturity/scmz.ejs", {"data" : dnyacasy});
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

    console.log(req.body);

    while (!vsechnyDnyUlozeny) {
        const dateKlic = `den${pocitadloDnu}_datum`;

        if (!body[dateKlic]) {
            // Pokud není datum, skončíme
            vsechnyDnyUlozeny = true;
            break;
        }

        const hodiny = [];
        for (let i = 1; i <= 9; i++) {
            const hourKlic = `den${pocitadloDnu}_hodina${i}`;
            if (body[hourKlic] === 'on') { // Ujistěte se, že hodiny jsou označeny správně
                hodiny.push(i); 
            }
        }

        if (hodiny.length > 0) {
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
            // Sloučení všech řádků pro daný den
            radky.push(...denRadky);
        }

        pocitadloDnu++;
    }

    const datumy = [];
    const hodinyFinal = [];

    // Seskupení dat a hodin pro všechny dny
    radky.forEach((radek) => {
        if (!datumy.includes(radek.datum)) {
            datumy.push(radek.datum);
            hodinyFinal.push(radek.hodiny);
        } else {
            let index = datumy.indexOf(radek.datum);
            hodinyFinal[index] = [...hodinyFinal[index], ...radek.hodiny];
        }
    });

    // Uložení do databáze
    databaze.maturity.pridatMaturitniEvent("PČMZ", datumy, hodinyFinal, null); 

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

        const casOdKlic = `den${pocitadloDnu}_casod`;
        const casDoKlic = `den${pocitadloDnu}_casdo`;
        const ucebnaKlic = `den${pocitadloDnu}_ucebna`;
        const predmetKlic = `den${pocitadloDnu}_predmet`;

        const casOdMaHodnotu = body[casOdKlic] && body[casOdKlic].trim() !== '';
        const ucebnaMaHodnotu = body[ucebnaKlic] && body[ucebnaKlic].trim() !== '';
        const predmetMaHodnotu = body[predmetKlic] && body[predmetKlic].trim() !== '';

        const hodiny = (casOdMaHodnotu && ucebnaMaHodnotu && predmetMaHodnotu) ? [body[casOdKlic], body[casDoKlic]] : [];
        const ucebna = (casOdMaHodnotu && ucebnaMaHodnotu && predmetMaHodnotu) ? body[ucebnaKlic] : null;
        const predmet = (casOdMaHodnotu && ucebnaMaHodnotu && predmetMaHodnotu) ? body[predmetKlic] : null;

        radky.push({
            datum: body[dateKlic],
            hodiny: hodiny,
            ucebna: ucebna,
            predmet: predmet
        });
        pocitadloDnu++;
    }
    datumy = [];
    hodiny = [];
    ucebny = [];
    predmety = []; // do tohohle je taky potřeba pushovat
    radky.forEach((radek) => {
        if (radek.datum) {
            if(!datumy.includes(radek.datum)){
                datumy.push(radek.datum);
            }
            let index = datumy.indexOf(radek.datum)
            if(hodiny[index]){
                hodiny[index].push([radek.hodiny[0], radek.hodiny[1]]);
            } else {
                hodiny.push(radek.hodiny);
            }
            ucebny.push(radek.ucebna);
            predmety.push(radek.predmet);
        }
    });
    databaze.maturity.pridatMaturitniEvent("SČMZ", datumy, hodiny, ucebny, predmety);
    res.redirect("/maturity/scmz");
};


exports.ukladanisloh = (req, res) => {
    const body = req.body;
    let pocitadloDnu = 1;

    console.log(req.body);

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
    console.log(seskupenaData)

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
            // if (!(hodiny[index].includes(cas) && ucebny[hodiny[index].indexOf(cas)] === zaznam.cas)){       => pro kontrolování jak učebny, tak času. (pro případ, že by v 8:00 měl jak T16, tak T15)
            if (!hodiny[index].includes(cas)){
                hodiny[index].push(cas);
                ucebny[index].push(zaznam.ucebna);
            }
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