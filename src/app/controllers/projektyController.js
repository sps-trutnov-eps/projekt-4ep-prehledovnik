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
	
	res.render("projekty/index", { tlacitka: tlacitka, tymy: tymy, id: -1 });
};
 
exports.zobrazDetailyProjektu = (req, res) => {
	let tlacitka = vytvorTlacitka("projekty/");
	let tymy = ziskejTymy(req.params.id);

	res.render("projekty/index", {
      tlacitka: tlacitka,
      tymy: tymy,
      id: req.params.id,
   });
};
 
exports.upload = async (req, res) => {
   try {
      const fileText = req.file.buffer.toString('utf8');

      let points = {};
      // GET THE POINTS //

      // go through milestones
      fileText.replace(/\n([A-Z][a-z]+)/g, "\n$1 $1")
         .split(/\n[A-Z][a-z]+ /)
         .slice(1)
         .forEach(block => {

            let lines = block.split(/\n/)
               .map(l => l.trim())
               .filter((elm) => elm.length > 3);

            let key = lines[0];
            points[key] = {"t1": {}, "t2": {}};

            let tyden = 0;
            lines.slice(1).forEach(line => {

               // záznam žáka
               if (! /->/.test(line)) {
                  let parts = line.split(" ");
                  mail = parts[parts.length-1].replace(/[<>]/g, "");

                  points[key][`t${tyden}`][mail] = parseInt(parts[0]);

                  // záznam týdne
               } else {
                  tyden++;
               }
            });
         });

      // TRANSFORM POINTS TO GRADES //

      let grades = {};

      for (const key in points) {
         grades[key] = {};

         // get all emails
         emails = Object.keys(points[key]["t1"]);

         for (const email in points[key]["t2"]) {
            if (! emails.includes(email))
               emails.push(email);
         }

         // get marks for mails
         emails.forEach(email => {
            // dle Šenkýře:
            //    Známku za průběžnou práci dostáváte (každý samostatně) podle
            //       následujícího klíče:
            //  
            //    1, pokud jste v každém týdnu udělali více než jeden commit
            //    2, pokud jste v jednom týdnu udělali více než jeden a v dalším
            //       týdnu pouze jeden commit (nebo opačně)
            //    3, pokud jste v jednom týdnu udělali více než jeden a v dalším
            //       týdnu žádný commit (nebo opačně) nebo pokud jste v každém
            //       týdnu udělali pouze jeden commit
            //    4, pokud jste v jednom týdnu udělali pouze jeden a v dalším
            //       týdnu žádný commit (nebo opačně)
            //    5, pokud jste v každém týdnu udělali nula commitů
            //
            // => z každého týdne max 4 body, každý chybějící bod stupeň dolů

            // || can be used for default value while assigning
            let count = [
               points[key]["t1"][email] || 0,
               points[key]["t2"][email] || 0
            ].map(n => n > 2 ? 2 : n)
             // no .sum()?
             .reduce((acc, cur) => acc + cur);

            grades[key][email] = 5 - count;

         });
      };

      console.log(grades);

      // RESPONSE //

      let tlacitka = vytvorTlacitka("projekty/");
      let tymy = ziskejTymy(req.params.id);

      res.render("projekty/index", {
         tlacitka: tlacitka,
         tymy: tymy,
         id: req.params.id,
      });
   } catch (error) {
      res.status(500).send(`
         <div class="error">Upload failed: ${error.message}</div>
         `);
   }
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
					<input class="deleteCurButton" type="button" value="-"
                      onclick="console.log('yeet');"/>
					<button style="margin-left: 0;" hx-get="/${url}${trida}"
                       hx-target="body" hx-push-url="true"
                       hx-swap="transition:true">${trida}</button>
				</div>
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
