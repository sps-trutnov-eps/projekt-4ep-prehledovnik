const databaze = require("../models/databaseEngine");

exports.zobrazTymy = (req, res) => {
    res.render("projekty/tymy" );
}

exports.zobrazPitche = (req, res) => {
    res.render("projekty/pitch");
}

exports.zobrazPrezentace = (req, res) => {
    res.render("projekty/prezentace");
}

exports.zobrazDetailyTymu = (req, res) => {
    res.render("projekty/detailTymu");
}

exports.ulozitDetailyTymu = (req, res) => {
    const vedouci = req.body.vedouci.trim();
    const clenove = req.body.clenove.trim();
    const tymRepo = req.body.tymRepo.trim();
    const trida = req.body.trida ? req.body.trida.trim() : "";

    if (vedouci && clenove && tymRepo) {
        const tymy = {
            vedouci: vedouci,
            clenove: clenove,
            tymRepo: tymRepo,
        };

        databaze.projekty.upravitTymy(trida, tymy);

        res.redirect("/projekty/tymy");
    } else {
        res.status(400).send("Nebyla vyplněna všechna pole.");
    }
};

//VYPOCET MILESTONU OD DNE ZADANI PROJEKTU
//BUDE ZAPOTREBY K TOMU VYTVORIT VE FRONTENDU VYTVORIT STRANKU O VYTVORENI PROJEKTU
/*function vypocetProjektu(datumZacatku) {
    const startDate = new Date(datumZacatku); // Začátek projektu
    const celkovyCas = new Date(startDate); // Celková doba trvání projektu
    celkovyCas.setMonth(startDate.getMonth() + 3); // Projekt trvá 3 měsíce
    const milestony = []; // Pole pro uložení milestonů

    // Výpočet milestonů
    for (let i = 1; i <= 6; i++) {
        const milestoneDate = new Date(startDate); // Základní datum každého milestonu
        milestoneDate.setDate(startDate.getDate() + (i * 14)); // Přidání 14 dní pro každý mileston
        
        if (milestoneDate <= celkovyCas) {
            // Pokud je poslední mileston, přidej rezervu
            if (i === 6) {
                milestoneDate.setDate(milestoneDate.getDate() + 14); // Rezerva 14 dní
                milestony.push(`Mileston ${i}: ${milestoneDate.toLocaleDateString()} (včetně rezervy 14 dní)`);
            } else {
                milestony.push(`Mileston ${i}: ${milestoneDate.toLocaleDateString()}`);
            }
        }
    }

    return milestony;
}

const milestony = vypocetProjektu(datumZacatku); // Získání milestonů*/


