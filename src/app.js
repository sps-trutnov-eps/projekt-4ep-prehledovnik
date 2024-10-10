import express from "express";
import router from "./routes/index.js";

const app = express();

app.use(express.static("www"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use("/", router);

app.listen(3000, () => console.log("App listening on port 3000!"));
