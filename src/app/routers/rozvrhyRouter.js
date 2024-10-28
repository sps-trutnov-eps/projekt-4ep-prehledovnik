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

    console.log('Active timetable:', aktivniRozvrh ? JSON.stringify(aktivniRozvrh, null, 2) : 'No active timetable');

    res.render('rozvrhy/index.ejs', { 
        rozvrhy, 
        predmety, 
        aktivniVerze,
        aktivniRozvrh: aktivniRozvrh ? JSON.stringify(aktivniRozvrh).replace(/</g, '\\u003c') : null
    });
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
    
    const id = databaseEngine.rozvrhy.pridatRozvrh(datum, nazev, popis, prazdnyRozvrh);
    res.redirect('/rozvrhy?verze=' + id);
});

rozvrhyRouter.post('/ulozit-verzi', (req, res) => {
    const { id, hodiny } = req.body;
    databaseEngine.rozvrhy.upravitRozvrh(id, hodiny);
    res.json({ success: true });
});

module.exports = rozvrhyRouter;