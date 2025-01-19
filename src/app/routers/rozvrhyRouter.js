const rozvrhyRouter = require('express').Router();
const databaseEngine = require('../models/databaseEngine');

rozvrhyRouter.get('/', (req, res) => {
    let rozvrhy = databaseEngine.rozvrhy.ziskatVsechnyRozvrhy();
    
    rozvrhy = rozvrhy.sort((a, b) => new Date(b.datum) - new Date(a.datum));
    
    const predmety = databaseEngine.ziskatPredmety();
    const aktivniVerze = req.query.verze || (rozvrhy.length > 0 ? rozvrhy[0].id : null);
    
    const aktivniRozvrh = aktivniVerze 
        ? databaseEngine.rozvrhy.ziskatRozvrh(aktivniVerze) 
        : null;

    res.render('rozvrhy/index.ejs', { 
        rozvrhy, 
        predmety, 
        aktivniVerze,
        aktivniRozvrh: aktivniRozvrh ? JSON.stringify(aktivniRozvrh).replace(/</g, '\\u003c') : null
    });
});

rozvrhyRouter.post('/vytvorit', (req, res) => {
    const { nazev, popis, newVersionTimetableData } = req.body;
    const datum = new Date().toISOString();
    
    const hodiny = newVersionTimetableData ? JSON.parse(newVersionTimetableData) : {
        lichy: {
            "Po": {}, "Út": {}, "St": {}, "Čt": {}, "Pá": {}
        },
        sudy: {
            "Po": {}, "Út": {}, "St": {}, "Čt": {}, "Pá": {}
        }
    };
    
    const id = databaseEngine.rozvrhy.pridatRozvrh(datum, nazev, popis, hodiny);
    res.redirect('/rozvrhy?verze=' + id);
});

rozvrhyRouter.post('/ulozit-verzi', (req, res) => {
    const { id, hodiny } = req.body;
    databaseEngine.rozvrhy.upravitRozvrh(id, hodiny);
    res.json({ success: true });
});

module.exports = rozvrhyRouter;