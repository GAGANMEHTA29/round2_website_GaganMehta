const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://004ujala:my12345@cluster1.n4hjyiq.mongodb.net/backend1', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
        });
        console.log('db connected successfully');
    } catch (error) {
        console.log('error in db connecting');
    }
}


module.exports = connectDB;
