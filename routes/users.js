const router = require("express").Router()
const { getuserdata } = require("../controllers/user")
const { protectplayer, protectsuperadmin } = require("../middleware/middleware")

router
    .get("/getuserdata", protectplayer, getuserdata)

module.exports = router;
