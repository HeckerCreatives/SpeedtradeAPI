const routers = app => {
    console.log("Routers are all available");

    app.use("/auth", require("./auth"))
    app.use("/wallets", require("./userwallets"))
    app.use("/wallethistory", require("./wallethistory"))
    app.use("/user", require("./users"))
    app.use("/inventory", require("./inventory"))
    app.use("/unilevel", require("./unilevel"))
    app.use("/payout", require("./payout"))
    app.use("/analytics", require("./analytics"))
    app.use("/staffusers", require("./staffusers"))
}

module.exports = routers