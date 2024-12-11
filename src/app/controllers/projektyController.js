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
                <a href="/${url}${trida}">
                    <button class="tlacitko">${trida}</button>
                </a>
            `;            
            }
        }
    }
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

exports.zmenDetailyTymu = (req, res) => {
    // let vedouci = req.body.leader;
    // let name = req.body.name;
    // let clenove = req.body.members;

    databaze.projekty.upravitTym()
    res.redirect('/projekty/tymy');
};

// Tato metoda se volá, když se odesílá formulář pro nový projekt
exports.ulozitProjekt = (req, res) => {
    const { projectName, projectStart, studentCount } = req.body;

    if (!projectName || !projectStart || !studentCount || studentCount <= 0) {
        return res.status(400).send("Všechna pole jsou povinná a počet žáků musí být větší než 0.");
    }

    let studentsPerTeam;
    let teams = [];
    let teamIDCounter = 1; // Unikátní čítač ID týmů

    switch (projectName) {
        case "1.ep":
            studentsPerTeam = 1;
            for (let i = 0; i < studentCount; i++) {
                teams.push({
                    id: `${projectName}_team_${teamIDCounter++}`, // Unikátní ID
                    name: `Tým ${i + 1}`,
                    leader: null,
                    members: 1
                });
            }
            break;
        case "2.ep":
            studentsPerTeam = 2;
            for (let i = 0; i < Math.ceil(studentCount / studentsPerTeam); i++) {
                teams.push({
                    id: `${projectName}_team_${teamIDCounter++}`,
                    name: `Tým ${i + 1}`,
                    leader: null,
                    members: Math.min(studentsPerTeam, studentCount - i * studentsPerTeam)
                });
            }
            break;
        case "3.ep":
            studentsPerTeam = 3;
            for (let i = 0; i < Math.ceil(studentCount / studentsPerTeam); i++) {
                teams.push({
                    id: `${projectName}_team_${teamIDCounter++}`,
                    name: `Tým ${i + 1}`,
                    leader: null,
                    members: Math.min(studentsPerTeam, studentCount - i * studentsPerTeam)
                });
            }
            break;
        case "4.ep":
            teams.push({
                id: `${projectName}_team_${teamIDCounter++}`,
                name: "Tým 1",
                leader: null,
                members: studentCount
            });
            break;
        default:
            return res.status(400).send("Neplatná třída.");
    }

    databaze.projekty.pridatProjekt(projectName, teams, projectStart);

    res.redirect('/projekty/tymy');
};



// Přidání nové funkce pro získání všech projektů (pokud ji budete potřebovat)
exports.getAllProjects = async (req, res) => {
    const projects = await databaze.projekty.getAllProjects();
    res.render('projekty/tymy', { projects: projects });
};
