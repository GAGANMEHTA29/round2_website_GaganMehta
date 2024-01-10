const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://gaganharoli:Gagan@12@cluster0.jy5f3rl.mongodb.net/backend1');
        console.log('db connected successfully');
    } catch (error) {
        console.log('error in db connecting');
    }
}


module.exports = connectDB;