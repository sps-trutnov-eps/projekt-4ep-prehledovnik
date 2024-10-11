const databaze = require("../models/databaseEngine");

exports.seznam = (req, res) => {
	res.render('udalosti/seznamUdalosti.ejs', {
        titulek: 'Seznam událostí',
    });
}