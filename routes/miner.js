const { getMiner, editMiner } = require("../controllers/miner")
const { protectsuperadmin, protectusers } = require("../middleware/middleware")

const router = require("express").Router()

router
 .get("/getminer", protectusers, getMiner)
 .post("/editminer", protectsuperadmin, editMiner)