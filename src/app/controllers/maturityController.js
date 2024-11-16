
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

 
    res.redirect("/maturity/pcmz")
};


exports.ukladaniscmz = (req, res) => {
   

 
    for (let i = 1; i <= 9; i++) { 
        let datum = req.body[`den${i}_datum`];
        let zadavani = req.body[`den${i}_zadavani`] ? false & true;  
        let cas = req.body[`den${i}_cas`];
        let ucebna = req.body[`den${i}_ucebna`];


       
        if (datum) {
            data.push({ datum, zadavani, cas, ucebna });
        }
    }


 
    res.send({ data});


    res.redirect("/maturity/scmz");
};


exports.ukladanisloh = (req, res) => {
    console.log(req.body); 


    let data = [];
    let x = "";
    for (let i = 1; i <= 9; i++) {
        const datum = req.body[`den1_datum`]; 
        const ucebna = req.body[`den1_ucebna-${i}`];

        let ucebna1 = []

        for (let e = 0; e < ucebna.length; e++) {
            if (ucebna[e] != "") {
                ucebna1.push(ucebna[e])
            }
        }




        if (datum && datum[0] && ucebna1 && ucebna1.length != 0) {
            data.push({ datum: datum[0], hodina:i, ucebna });
        }
    }

    res.send({ "test": data}); 
    res.redirect('/maturity/sloh');
};