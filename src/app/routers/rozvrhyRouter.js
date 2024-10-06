const rozvrhyRouter = require('express').Router();

rozvrhyRouter.get('/', (req, res) => res.render('rozvrhy/index.ejs', {}));

module.exports = rozvrhyRouter;