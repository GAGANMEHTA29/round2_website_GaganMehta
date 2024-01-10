const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: "NA"
    },
    desc: {
        type: String,
        default: "NA"
    }
}, { timestamps: true })

const contactModel = mongoose.model('contactModel', contactSchema);
module.exports = contactModel;