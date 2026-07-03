const dns = require("dns");
dns.setServers(["8.8.8.8"]);

const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("Using DNS:", dns.getServers());

        await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ Database Connection Failed");
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;