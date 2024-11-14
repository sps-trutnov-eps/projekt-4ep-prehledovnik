const databaze = require("../models/databaseEngine");

exports.zobrazTymy = (req, res) => {
    let tlacitka = "";
    const tridy = databaze.projekty.gP();

    for (const projektID in tridy) {
        if (projektID != "nextID") {
            const trida = tridy[projektID].trida;
            if (trida) {
                tlacitka += `<button hx-get="/projekty/tymy/${trida}" 
                hx-target="body"
                hx-push-url="true"
                hx-swap="transition:true">${trida}</button>`;
            }
        }
    }
    console.log(tridy);

    res.render("projekty/tymy", { tlacitka: tlacitka });
};

exports.zobrazProjekt = (req, res) => {
    let tlacitka = "";
    const tridy = databaze.projekty.gP();

    for (const projektID in tridy) {
        if (projektID != "nextID") {
            const trida = tridy[projektID].trida;
            if (trida) {
                tlacitka += `<button hx-get="/projekty/tymy/${trida}" 
                hx-target="body"
                hx-push-url="true"
                hx-swap="transition:true">${trida}</button>`;
            }
        }
    }
    console.log(tridy);

    // req.params.projekt

    res.render("/projekty/tymy", { tlacitka: tlacitka });
};


exports.zobrazPitche = (req, res) => {
    res.render("projekty/pitch");
};

exports.zobrazPrezentace = (req, res) => {
    res.render("projekty/prezentace");
};

exports.vytvoritProjekt = (req, res) => {
    res.render("projekty/vytvoreniProjektu");
};

exports.zobrazDetailyTymu = (req, res) => {
    res.render("projekty/detailTymu");
};

// Tato metoda se volá, když se odesílá formulář pro nový projekt
exports.ulozitProjekt = (req, res) => {
    const { projectName, projectStart, studentCount } = req.body;

    // Ověření, že jsou všechny hodnoty vyplněny
    if (!projectName || !projectStart || !studentCount) {
        return res.status(400).send("Všechna pole jsou povinná.");
    }

    // Uložení projektu do databáze
    databaze.projekty.pridatProjekt(projectName, projectStart, studentCount);

    // Odpověď (můžete také přesměrovat uživatele na jinou stránku)
    res.redirect('/projekty/tymy');
};

// Přidání nové funkce pro získání všech projektů (pokud ji budete potřebovat)
exports.getAllProjects = async (req, res) => {
    const projects = await databaze.projekty.getAllProjects();
    res.render('projekty/tymy', { projects: projects });
};
