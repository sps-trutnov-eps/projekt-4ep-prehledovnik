const databaze = require("../models/databaseEngine");

exports.zobrazTymy = (req, res) => {
    let tlacitka = vytvorTlacitka("projekty/tymy/");
	let tymy = [];

    res.render("projekty/tymy", { tlacitka: tlacitka, tymy: tymy });
};

exports.zobrazProjekt = (req, res) => { 
    let tlacitka = vytvorTlacitka("projekty/tymy/");
    let tymy = ziskejTymy(req.params.projekt);

    res.render("projekty/tymy", { tlacitka: tlacitka, tymy: tymy }); 
}; 
 
exports.zobrazTlacitka = (req, res) => {
	let tlacitka = vytvorTlacitka("projekty/");
	let tymy = [];
	
	res.render("projekty/index", { tlacitka: tlacitka, tymy: tymy });
};
 
exports.zobrazDetailyProjektu = (req, res) => {
	let tlacitka = vytvorTlacitka("projekty/");
	let tymy = ziskejTymy(req.params.id);

	res.render("projekty/index", { tlacitka: tlacitka, tymy: tymy });
};
 
 
function vytvorTlacitka(url) {
	let tlacitka = "";
    const tridy = databaze.projekty.gP();

    for (const projektID in tridy) {
        if (projektID != "nextID") {
            const trida = tridy[projektID].trida;
            if (trida) {
                tlacitka += `
				<div style="display: flex; width: 100%" class="cur">
					<input class="deleteCurButton" type="button" value="-" onclick="console.log('yeet');"/>
					<button style="margin-left: 0;" hx-get="/${url}${trida}" hx-target="body" hx-push-url="true" hx-swap="transition:true">${trida}</button>
				</div>
				`;
            }
        }
    }
	
	console.log("tridy");
    console.log(tridy);
	return tlacitka;
}

function ziskejTymy(trida){
	const tridy = databaze.projekty.gP(); 

    let tymy = [];
    for (const projektID in tridy) {
        if (projektID !== "nextID" && tridy[projektID].trida === trida) {
            tymy = tridy[projektID].tymy;
            break;
        }
    }
	
	console.log("tymy");
    console.log(tymy);
	return tymy;
}

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
    const projectClass = req.params.projekt;
    const teamId = req.params.id;

    // Načtení projektu a týmu
    const project = databaze.projekty.ziskatProjekt(projectClass);

    if (!project || !project.tymy[teamId]) {
        return res.status(404).send("Tým nenalezen.");
    }

    const team = project.tymy[teamId];

    res.render("projekty/detailTymu", { team });
};

// Tato metoda se volá, když se odesílá formulář pro nový projekt
exports.ulozitProjekt = (req, res) => {
    const { projectName, projectStart, studentCount } = req.body;

    // Ověření, že jsou všechny hodnoty vyplněny
    if (!projectName || !projectStart || !studentCount || studentCount <= 0) {
        return res.status(400).send("Všechna pole jsou povinná a počet žáků musí být větší než 0.");
    }

    // Počet žáků na tým (3 osoby na tým)
    const studentsPerTeam = 3;
    const numberOfTeams = Math.ceil(studentCount / studentsPerTeam);

    // Vytvoření týmů
    const teams = [];
    for (let i = 0; i < numberOfTeams; i++) {
        teams.push({
            name: `Tým ${i + 1}`,
            members: Math.min(studentsPerTeam, studentCount - i * studentsPerTeam),
        });
    }

    // Uložení projektu s týmy do databáze
    databaze.projekty.pridatProjekt(projectName, teams, projectStart);

    // Přesměrování na stránku týmů
    res.redirect('/projekty/tymy');
};

// Přidání nové funkce pro získání všech projektů (pokud ji budete potřebovat)
exports.getAllProjects = async (req, res) => {
    const projects = await databaze.projekty.getAllProjects();
    res.render('projekty/tymy', { projects: projects });
};
