const { getcurrentpricepool, updatepricepool } = require("../controllers/pricepool")
const { protectsuperadmin } = require("../middleware/middleware")

const router = require("express").Router()

router
 .get("/getcurrentpricepool", protectsuperadmin, getcurrentpricepool)
 .post("/updatepricepool", protectsuperadmin, updatepricepool)

module.exports = router