const router = require("express").Router()
const { getsadashboard, banunbanuser, multiplebanstaffusers, searchadminlist, updateadmin } = require("../controllers/staffuser")
const { protectplayer, protectsuperadmin } = require("../middleware/middleware")

router
    .get("/getsadashboard", protectsuperadmin, getsadashboard)
    .get("/adminlist", protectsuperadmin, searchadminlist)
    .post("/banstaffs", protectsuperadmin, multiplebanstaffusers)
    .post("/changepasswordadmin", protectsuperadmin, updateadmin)

module.exports = router;
