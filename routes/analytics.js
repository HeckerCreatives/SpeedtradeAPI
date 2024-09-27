const router = require("express").Router()
const { getpayingraph, getcommissiongraph, getproductgraph, getearningpayoutgraph, getunilevelpayoutgraph, gettotalpayinperday } = require("../controllers/analytics")
const { protectplayer, protectsuperadmin } = require("../middleware/middleware")

router
    .get("/getpayingraph", protectsuperadmin, getpayingraph)
    .get("/getcommissiongraph", protectsuperadmin, getcommissiongraph)
    .get("/getminerbuygraph", protectsuperadmin, getproductgraph)
    .get("/getminerpayoutgraph", protectsuperadmin, getearningpayoutgraph)
    .get("/getunilevelpayoutgraph", protectsuperadmin, getunilevelpayoutgraph)
    .get("/getsales", protectsuperadmin, gettotalpayinperday)

module.exports = router;
