const databaze = require("../models/databaseEngine");

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


exports.view = (req, res) => {
	const urlID = req.params.id;
    let files = "class";
    let clas = undefined;
    let team = undefined;
    let classID = undefined;
    
    if (urlID == undefined || urlID.split('-').length < 2 || urlID.split('-').length > 3){
        files = "none";
    } else if (urlID.split('-').length == 2){
        classID = databaze.projekty.ziskatIDprojektuDleTridy(urlID);
        files = "class";
        team = "none";
    } else {
        classID = databaze.projekty.ziskatIDprojektuDleTridy(urlID.slice(0, -2));
        team = databaze.projekty.ziskatTym(classID, urlID.slice(-1));
        files = "team";
    }
    
    clas = databaze.projekty.ziskatCelouTridu(classID);
    al = databaze.projekty.ziskatVse();
    if (clas == undefined) { clas = {trida: urlID }; }
    
    res.render('projekty/index.ejs', { files: files, team: team, clas: clas, al: al});
}


// Spouští se když se ukládá třída
exports.saveClass = (classID, datum) => {
   
    let tridaID = databaze.projekty.ziskatIDprojektuDleTridy(classID);
    // Add calss if not found
    if (databaze.projekty.ziskatCelouTridu(tridaID) == undefined){
        databaze.projekty.pridatProjekt(classID, datum);
    } else {
        databaze.projekty.upravitProjekt(tridaID, datum);
    }
}

exports.saveTeams = (data) => {
    let tridaID = databaze.projekty.ziskatIDprojektuDleTridy(data.classID);
    let clas = databaze.projekty.ziskatCelouTridu(tridaID);
        
	// Hledání smazaného teamu
    let excessTeamsIDs = [];
    for (let i = 0; i < clas["tymy"].length; i++){
        let found = false;
        for (let t = 0; t < data.teams.length; t++){
            if (clas["tymy"][i]["cislo"] == data.teams[t]["teamID"]){
                found = true;
                break;
            }
        }
        if (!found) { excessTeamsIDs.push(clas["tymy"][i]["cislo"]); }
    }
    
	
	// Hledání nově vytvořeného týmu
    let newTeams = [];
	// Týmy co tam již existují
    let otherTeams = [];
    for (let t = 0; t < data.teams.length; t++){
        if (data.teams[t]["teamID"] == undefined){
           newTeams.push(data.teams[t]);
           continue;
        }
        
        let foundInExcess = false;
        for (let i = 0; i < excessTeamsIDs.length; i++){
            if (data.teams[t]["teamID"] == excessTeamsIDs[i]){
                foundInExcess = true;
                break;
            }
        }
        if (!foundInExcess) { otherTeams.push(data.teams[t]); }
    }
    // First, go through the teams that have haven't been deleted or added
    for (let i = 0; i < otherTeams.length; i++){
        const team = otherTeams[i];
        const existingTeam = databaze.projekty.ziskatTym(tridaID, team.teamID);
        
        databaze.projekty.upravitTym(tridaID, {
                "cislo": team.teamID,
                "tema": team.description,
                "odkaz": existingTeam["odkaz"],
                "clenove": team.members,
                "vedouci": existingTeam["vedouci"],
                "pitch": {
                    //"datum": data.pitchDate,
                    "featury": existingTeam["pitch"]["featury"],
                    "stretchgoaly": existingTeam["pitch"]["stretchgoaly"],
                    "pozamka": existingTeam["pitch"]["pozamka"],
                    "ucast": existingTeam["pitch"]["ucast"]
                }
            });
    }
    
    // Secondly, delete all teams from database that have been deleted team by user
    for (let i = 0; i < excessTeamsIDs.length; i++){
       databaze.projekty.odebratTym(tridaID, excessTeamsIDs[i]);
    }
    
    // Refresh (just in case)
    clas = databaze.projekty.ziskatCelouTridu(tridaID);
    // Renumber every team so that there are no gaps
    for (let i = 0; i < clas["tymy"].length; i++){
        let existingTeam = databaze.projekty.ziskatTym(tridaID, clas["tymy"][i]["cislo"]);
        
        databaze.projekty.upravitTymPodleStarehoCisla(tridaID, {
                "cislo": `${i+1}`,
                "tema": existingTeam["tema"],
                "odkaz": existingTeam["odkaz"],
                "clenove": existingTeam["clenove"],
                "vedouci": existingTeam["vedouci"],
                "pitch": existingTeam["pitch"],
                "znamkyDev": existingTeam["znamkyDev"],
                "znamkyCom": existingTeam["znamkyCom"]
            }, existingTeam["cislo"]);
    }
    
    // Thirdly, add the new teams
    for (let i = 0; i < newTeams.length; i++){
        const team = newTeams[i];
        
        databaze.projekty.pridatTym(tridaID, clas["tymy"].length+1, team.description, team.url, team.members, 0, [], [], "undefined", ["undefined","undefined"], undefined, undefined);
    }
    
   
}

exports.saveTeam = (data) => {
    let tridaID = databaze.projekty.ziskatIDprojektuDleTridy(data.classID);
    let existingTeam = databaze.projekty.ziskatTym(tridaID, data.teamID);
   
    let membersCommits = [];
    for (let i = 0; i < data.marksCommits.length; i++){
        let member = {};
        member["znamky"] = data.marksCommits[i];
        membersCommits.push(member);
    }
    
    let membersDevlogs = [];
    for (let i = 0; i < data.marksDevlogs.length; i++){
        let member = {};
        member["znamky"] = data.marksDevlogs[i];
        membersDevlogs.push(member);
    }
    
    if ( membersCommits == []){
        membersCommits = undefined;
    }
    if ( membersDevlogs == []){
        membersDevlogs = undefined;
    }
   
    databaze.projekty.upravitTym(tridaID, {
                "cislo": data.teamID,
                "tema": data.description,
                "odkaz": data.link,
                "clenove": data.members,
                "vedouci": data.ceo,
                "pitch": {
                    "datum": existingTeam["pitch"]["datum"],
                    "featury": data["features"],
                    "stretchgoaly": data["goals"],
                    "pozamka": data["note"],
                    "ucast": data["pitch"]
                },
                "znamkyDev": membersDevlogs,
                "znamkyCom": membersCommits
            });
}

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

    databaze.projekty.pridatProjekt(projectName, teams, projectStart, data.pitchDate);

    res.redirect('/projekty/tymy');
};



// Přidání nové funkce pro získání všech projektů (pokud ji budete potřebovat)
exports.getAllProjects = async (req, res) => {
    const projects = await databaze.projekty.getAllProjects();
    res.render('projekty/tymy', { projects: projects });
};
