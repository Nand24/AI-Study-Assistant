const mongoose = require('mongoose');

const apikey = process.env.DB_CONNECTION;

async function connectDB() {
    try{
        await mongoose.connect(apikey);
        console.log("MongoDB Connected Successfully");
    } catch (error){
        console.error(" MongoDB Connection Error:", error);
        process.exit(1);
    }
}

module.exports = connectDB;