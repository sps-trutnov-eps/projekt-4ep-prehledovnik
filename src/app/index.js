const express = require('express');

const app = express();

app.use(express.static("./app/views"));

app.get("*", (req,res) => {
    res.redirect("maturity.html");
});

module.exports = app;