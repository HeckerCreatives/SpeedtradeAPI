const { default: mongoose } = require("mongoose")
const Users = require("../models/Users")
const Staffusers = require("../models/Staffusers")
const Userwallets = require("../models/Userwallets")
const Userdetails = require("../models/Userdetails")
const Maintenance = require("../models/Maintenance")
const Miner = require("../models/Miner")
const Pricepool = require("../models/Pricepool")
const Skip = require("../models/Skip")

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

    const pricepool = await Pricepool.find()
    .then(data => data)
    .catch(err => {
        console.log(`There's a problem getting price pool data ${err}`)
        return
    })

    if (pricepool.length <= 0){
        await Pricepool.create({ currentvalue: 0, pricepool: 0, status: "current"})
        .catch(err => {
            console.log(`There's a problem creating staff user data ${err}`)
            return
        })
        console.log('Price Pool Initialized.')
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

    const Miners = await Miner.find()
    .then(data => data)
    .catch(err => {
        console.log(`There's a problem getting creature data ${err}`)
        return
    })


    const flashminer = await Miner.findOne({ type: "flash_miner" })

    if(!flashminer){
        await Miner.create({
            type: "flash_miner",
            name: "Flash Miner",
            profit: 4,
            duration: 40,
            min: 10000,
            max: 1000000
        })
        console.log('Flash Miner Initialized.')
    }


    if(Miners.length <= 0){
        const Minerz = [
            {
                    type: "quick_miner",
                    name: "Quick Miner",
                    profit: 0.20,
                    duration: 5,
                    min: 500,
                    max: 2000
            },
            {
                    type: "swift_lane",
                    name: "Switf Lane",
                    profit: 0.60,
                    duration: 10,
                    min: 2000,
                    max: 20000
            },
            {
                    type: "rapid_lane",
                    name: "Rapid Lane",
                    profit: 1.5,
                    duration: 20,
                    min: 20000,
                    max: 2000000
            }
        ];

        await Miner.bulkWrite(
            Minerz.map((Miner) => ({
                insertOne: { document: Miner },
            }))
        )
        .then(data => data)
        .catch(err => {
            console.log(`There's a problem creating creature data ${err}`)
            return
        })
    }

    // find users created at before february 1 2025

//     const users = await Users.find({createdAt: {$lt: new Date("2025-02-01")}})
// // check if they have skip if not create for them
//     if(users.length > 0){
//         users.forEach(async (user) => {
//             await Skip.findOne({owner: new mongoose.Types.ObjectId(user._id)})

//             .then(async data => {
//                 if(!data){
//                     await Skip.create({owner: new mongoose.Types.ObjectId(user._id)})
//                 }
//             }

//             )
//             .catch(err => {
//                 console.log(`There's a problem getting skip data ${err}`)
//                 return
//             })
//         }
//         )
//     }
            

    console.log("Server Initialization Success")
}