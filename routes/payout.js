const router = require("express").Router()
const { requestpayout, getrequesthistoryplayer, getpayoutlist, getpayouthistorysuperadmin, processpayout, deletepayout, getrequesthistoryplayerforsuperadmin } = require("../controllers/payout")
const { protectplayer, protectsuperadmin, protectadmin } = require("../middleware/middleware")

router

    //  #region USER

    .get("/getrequesthistoryuser", protectplayer, getrequesthistoryplayer)
    .post("/requestuserpayout", protectplayer, requestpayout)

    //  #endregion


    //  #region SUPERADMIN

    .get("/getpayoutlist", protectsuperadmin, getpayoutlist)
    .get("/getpayouthistorysuperadmin", protectsuperadmin, getpayouthistorysuperadmin)
    .get("/getrequesthistoryplayerforsuperadmin", protectsuperadmin, getrequesthistoryplayerforsuperadmin)
    .post("/processpayout", protectsuperadmin, processpayout)
    .post("/deletepayout", protectsuperadmin, deletepayout)

    //  #endregion

    //  #region ADMIN

    .get("/getpayouthistoryadmin", protectadmin, getpayouthistorysuperadmin)

    //  #endregion

module.exports = router;
