const router = require("express").Router()
const { getuserdata, getplayerlist, multiplebanusers, getplayercount, updateuser, searchplayerlist } = require("../controllers/user")
const { protectplayer, protectsuperadmin } = require("../middleware/middleware")

router

    //  #region USER
    .get("/getuserdata", protectplayer, getuserdata)

    //  #endregion

    //  #region SUPERADMIN

    .get("/getuserlist", protectsuperadmin, getplayerlist)
    .get("/getusercount", protectsuperadmin, getplayercount)
    .get("/searchuserlist", protectsuperadmin, searchplayerlist)
    .post("/banusers", protectsuperadmin, multiplebanusers)
    .post("/changepassworduser", protectsuperadmin, updateuser)

    //  #endregion

module.exports = router;
