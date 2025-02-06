const { default: mongoose } = require("mongoose");
const Users = require("./models/Users");


async function checkuser () {
try {
    
        await mongoose.connect('mongodb+srv://doadmin:n5938lRCUq271j6t@speedmine-database-1fc2a06b.mongo.ondigitalocean.com/speedmine?tls=true&authSource=admin&replicaSet=speedmine-database', { useNewUrlParser: true, useUnifiedTopology: true });
    
        const checkuser = await Users.findOne({ username: "lanyosano"})

        console.log(checkuser)

        
} catch (error) {
    console.error(error)
}
}

checkuser()