const router = require("express").Router()
const { playerunilevel } = require("../controllers/unilevel")
const { protectplayer, protectsuperadmin } = require("../middleware/middleware")

router
    .get("/userunilevel", protectplayer, playerunilevel)

module.exports = router;
