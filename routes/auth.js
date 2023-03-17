import express from 'express';
var router = express.Router();

import User from "../models/User.js";
import { genSalt, hash, compareSync } from "bcrypt";

import jwt from 'jsonwebtoken'
import config from "../config.js";

//REGISTER
router.post("/register", async(req, res) => {
    try {
        //generate new password
        const salt = await genSalt(10);
        const hashedPassword = await hash(req.body.password, salt);

        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        //save user and respond
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err)
    }
});


router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        console.log(user);
        if (err) return res.status(500).send({ auth: false, token: "Error While Login" });
        if (!user) return res.status(200).send({ auth: false, token: "No User Found First Register" });
        else {
            console.log(req.body.password);
            console.log(user.password);
            const userIsValid = compareSync(req.body.password, user.password);
            console.log(userIsValid);
            if (!userIsValid) return res.status(200).send({ auth: false, token: "Invalid user" });

            // in case email and password match then generate token
            let token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400 }); //24 hours
            res.status(200).send({ auth: true, token: token });
            console.log(token)

        }

    })
})

export default router;