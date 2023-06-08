const express = require('express');
bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require("../models/user.model");
const{sendEmail}=require("../nodemailer/sendemail")


const userRouter = express.Router()

userRouter.post("/signup", async (req, res) => {
    let { name, email, password } = req.body;
    try {
        // check user already exists
        let user = await UserModel.find({ email });
        if (user.length > 0) {
            res.status(400).send("user already exists")
        } else {
            bcrypt.hash(password, 5, async (err, hashPassword) => {
                if (err) res.send("error while signup");
                else {
                    let newUser = new UserModel({ name, email, password: hashPassword });
                    await newUser.save();
                    res.status(201).send('user signup successfully');
                }

            })
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
})

userRouter.post("/login", async (req, res) => {
    let { email, password } = req.body;
    try {
        // check user already exists
        let user = await UserModel.find({ email });
        console.log(user);
        if (user.length === 0) {
            res.status(400).send("user does not exists")
        } else {
            let hashPassword = user[0].password;
            bcrypt.compare(password, hashPassword, async (err, result) => {
                if (result) {
                    const OTP = Math.round(Math.random() * 9999)+"";
                    console.log(OTP);
                    sendEmail({ email: email, subject: "Login OTP", body: OTP });

                    let token = jwt.sign({ userId: user[0]._id }, 'masai', { expiresIn: '7d' })
                    console.log(token);
                    res.status(201).json({ message: "user logged in ", token });
                } else {

                    res.status(400).send({ message: "error while login ", err });
                }
            })
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
})


module.exports = { userRouter }
