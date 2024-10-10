const app = require("./app");

// tento kód neběží???
app.listen(process.env.PORT, () => {
    console.log("Server jede na portu: " + String(process.env.PORT));
});
