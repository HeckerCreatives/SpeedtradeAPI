const { default: mongoose } = require("mongoose");
const Users = require("./models/Users");
const Skip = require("./models/Skip");


async function checkuser () {
try {
    
        await mongoose.connect('mongodb+srv://doadmin:n5938lRCUq271j6t@speedmine-database-1fc2a06b.mongo.ondigitalocean.com/speedmine?tls=true&authSource=admin&replicaSet=speedmine-database', { useNewUrlParser: true, useUnifiedTopology: true });
    
        const checkuser = await Users.findOne({ username: "avliz10"})

        await Skip.create({ owner: new mongoose.Types.ObjectId(checkuser._id), skip: "skip" })
        .catch(err => {
            console.log(`There's a problem creating the skip data of ${id}. Error: ${err}`)
            return res.status(400).json({message: "bad-request", data: "There's a problem with the server! Please contact customer support."})
        })
        console.log("skip created")
        
} catch (error) {
    console.error(error)
}
}

checkuser()