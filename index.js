const express = require("express");
const app = express();
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "hasdhgasjdghjsahjash$34";
const registerModel = require("./models/registerModel");
const contactModel = require("./models/contactModel");
const { hashPassword, comparePassword } = require('./helpers/help1');
const connectDB = require("./config/db1");
connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get("/", (req, res) => {
    res.send("listening from server side");
})

app.post("/user-register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let existUser = await registerModel.findOne({ email });
        if (existUser) {
            return res.status(200).send({
                success: false,
                message: "user already exist"
            })
        }
        const hashedPassword = await hashPassword(password);
        const user = new registerModel({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).send({
            success: true,
            message: "user registered successfully"
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "some internal error occurred!"
        })
    }
})

app.post("/contact-register", async (req, res) => {
    try {
        const { name, email, phone, address, desc } = req.body;
        let existUser = await contactModel.findOne({ email });
        if (existUser) {
            return res.status(200).send({
                success: false,
                message: "contact already exist"
            })
        }
        const user = new contactModel({ name, email, phone, address, desc });
        await user.save();
        res.status(201).send({
            success: true,
            message: "contact registered successfully"
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "some internal error occurred!"
        })
    }
})

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        let existUser = await registerModel.findOne({ email });
        if (!existUser) {
            return res.status(404).send({
                success: false,
                message: "credentials1 are not valid"
            })
        }
        const match = await comparePassword(password, existUser.password);
        if (!match) {
            return res.status(404).send({
                success: false,
                message: 'credentials2 are not valid'
            })
        }
        // token
        const token = await jwt.sign({ _id: existUser._id }, JWT_SECRET, { expiresIn: "1d" });
        res.status(200).send({
            success: true,
            message: "login successfully",
            existUser,
            token
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "some1 internal error occurred!"
        })
    }
})

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`app is listening at port ${port}`);
})