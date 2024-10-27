const rozvrhyRouter = require('express').Router();
const databaseEngine = require('../models/databaseEngine');

rozvrhyRouter.get('/', (req, res) => {
    const rozvrhy = databaseEngine.rozvrhy.ziskatVsechnyRozvrhy();
    const predmety = databaseEngine.ziskatPredmety();
    res.render('rozvrhy/index.ejs', { rozvrhy, predmety });
});

rozvrhyRouter.post('/vytvorit', (req, res) => {
    const { nazev, popis } = req.body;
    const datum = new Date().toISOString();
    
    const prazdnyRozvrh = {
        lichy: {
            "Po": {}, "Ut": {}, "St": {}, "Ct": {}, "Pa": {}
        },
        sudy: {
            "Po": {}, "Ut": {}, "St": {}, "Ct": {}, "Pa": {}
        }
    };
    
    databaseEngine.rozvrhy.pridatRozvrh(datum, nazev, popis, prazdnyRozvrh);
    res.redirect('/rozvrhy');
});

module.exports = rozvrhyRouter;