const express = require("express");
const app = express();

app.use(express.static("www"));
app.set("view engine", "ejs");

app.get("/", (req, res) =>
  res.sendFile("html/index.html", { root: __dirname }),
);
app.get("/rozvrh", (req, res) =>
  res.sendFile("html/rozvrh.html", { root: __dirname }),
);
app.get("/osnovy", (req, res) =>
  res.sendFile("html/osnovy.html", { root: __dirname }),
);
app.get("/udalosti", (req, res) =>
  res.sendFile("html/udalosti.html", { root: __dirname }),
);
app.get("/ukoly", (req, res) =>
  res.sendFile("html/ukoly.html", { root: __dirname }),
);
app.get("/maturita", (req, res) =>
  res.sendFile("html/maturita.html", { root: __dirname }),
);

app.listen(3000, () => console.log("App listening on port 3000!"));
