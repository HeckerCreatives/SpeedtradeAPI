const { default: mongoose } = require("mongoose")
const Users = require("../models/Users")
const Staffusers = require("../models/Staffusers")
const Userwallets = require("../models/Userwallets")
const Userdetails = require("../models/Userdetails")
const Maintenance = require("../models/Maintenance")

exports.initialize = async (req, res) => {

    //  INITIALIZE CREATURE SMASH USER
    const csadmin = await Users.findOne({username: "minergod"})
    .then(data => data)
    .catch(err => {
        console.log(`There's a problem getting cs user data ${err}`)
        return
    })

    if (!csadmin){
        const player = await Users.create({_id: new mongoose.Types.ObjectId(process.env.ADMIN_ID), username: "minergod", password: "e7FNO0EWgW11", gametoken: "", webtoken: "", bandate: "none", banreason: "", status: "active"})
        
        await Userdetails.create({owner: new mongoose.Types.ObjectId(player._id), phonenumber: "", fistname: "", lastname: "", address: "", city: "", country: "", postalcode: "", profilepicture: ""})
        .catch(async err => {

            await Users.findOneAndDelete({_id: new mongoose.Types.ObjectId(player._id)})

            console.log(`Server Initialization Failed, Error: ${err}`);

            return
        })
    
        const wallets = ["creditwallet", "minecoinwallet", "commissionwallet"]

        wallets.forEach(async (data) => {
            await Userwallets.create({owner: new mongoose.Types.ObjectId(player._id), type: data, amount: 0})
            .catch(async err => {

                await Users.findOneAndDelete({_id: new mongoose.Types.ObjectId(player._id)})

                await Userdetails.findOneAndDelete({_id: new mongoose.Types.ObjectId(player._id)})

                console.log(`Server Initialization Failed, Error: ${err}`);
    
                return
            })
        })
    }

    const staff = await Staffusers.find()
    .then(data => data)
    .catch(err => {
        console.log(`There's a problem getting staff user data ${err}`)
        return
    })

    if (staff.length <= 0){
        await Staffusers.create({_id: new mongoose.Types.ObjectId(process.env.ADMIN_ID), username: "minergodadmin", password: "e7FNO0EWgW11", webtoken: "", status: "active", auth: "superadmin"})
        .catch(err => {
            console.log(`There's a problem creating staff user data ${err}`)
            return
        })
    }

    const maintenances = await Maintenance.find()
    .then(data => data)
    .catch(err => {
        console.log(`There's a problem getting maintenance data ${err}`)
        return
    })

    const mainte = [{ insertOne: { type: "b1t1", value: "0" }},  { insertOne: { type: "payout", value: "1" } }]

    if (maintenances.length <= 0){
        await Maintenance.bulkWrite(mainte)
    }

    console.log("Server Initialization Success")
}