import express from "express";

const router = express.Router();

router.get("/", (req, res) => res.render("index"));
router.get("/rozvrh", (req, res) => res.render("rozvrh"));
router.get("/osnovy", (req, res) => res.render("osnovy"));
router.get("/udalosti", (req, res) => res.render("udalosti"));
router.get("/ukoly", (req, res) => res.render("ukoly"));
router.get("/maturita", (req, res) => res.render("maturita"));

export default router;
