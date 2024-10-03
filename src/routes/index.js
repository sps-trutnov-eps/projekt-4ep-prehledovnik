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
