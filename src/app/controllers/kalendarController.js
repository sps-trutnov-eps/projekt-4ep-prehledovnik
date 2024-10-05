const databaze = require("../models/databaseEngine");

const d = new Date();

exports.month = () => {
    return d.getMonth();
};
exports.day = () =>{
   return d.getDate();
};