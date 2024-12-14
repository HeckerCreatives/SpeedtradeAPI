const { default: mongoose } = require("mongoose")
const Miner = require("../models/Miner")
const Maintenance = require("../models/Maintenance")


exports.getMiner = async(req, res)=> {

    const miners = await Miner.find()
    .then(data => data)
    .catch(err => {
        console.log(`There's a problem fetching miners. Error: ${err}`)
        return res.status(400).json({ message: "bad-request", data: "There's a problem with the server. Please contact customer support for more details."})
    })

    const isBuyonetakeone = await Maintenance.findOne({ type: "b1t1"})

    const data = []

    miners.forEach(temp => {
        data.push({
            id: temp._id,
            name: temp.name,
            min: temp.min,
            max: temp.max,
            duration: temp.duration,
            profit: temp.profit,
            isBuyonetakeone: isBuyonetakeone.value
        })
    })
    return res.status(200).json({ message: "success", data: data})
}

exports.editMiner = async (req, res) => {

    const { minerid, duration } = req.body

    if(!minerid || !duration){
        return res.status(400).json({ message: "failed", data: "Incomplete form data."})
    }

    await Miner.findOneAndUpdate(
        {
            _id: new mongoose.Types.ObjectId(minerid)
        },
        {
            $set: {
                duration: parseFloat(duration)
            }
        }
    )
    .then(data => data)
    .catch(err => {
        console.log(`There's a problem encountered while updating ${minerid} miner. Error: ${err}`)
        return res.status(400).json({ message: "bad-request", data: "There's a problem with the server. Please contact customer support for more details."})
    })

    return res.status(200).json({ message: "success" })
}