const router = require("express").Router()
const { requestpayout, getrequesthistoryplayer } = require("../controllers/payout")
const { protectplayer, protectsuperadmin } = require("../middleware/middleware")

router
    .get("/getrequesthistoryuser", protectplayer, getrequesthistoryplayer)
    .post("/requestuserpayout", protectplayer, requestpayout)

module.exports = router;
