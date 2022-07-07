const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const app = express();
const config = require('./config.json');

mongoose.connect(config.mongodb).then(() => {
    const PORT = config.port || 3000;
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
});

app.use(express.urlencoded({ extended: true}));

app.post("/register", async (req,res) => {
    const {username,password,confirmPassword} = req.body;

    if (!username || !password || username.trim().length < 1) {
        res.status(400).json({
            message: "The username or password field is not filled."
        });
        return;
    }

    if (password != confirmPassword) {
        res.status(400).json({
            message: "Password and confirm password doesn't match"
        });
        return;
    }

    if (password.length < 6) {
        res.status(400).json({
            message: "Password must be at least 6 characters"
        });
        return;
    }

    let user = await User.findOne({username: username}).exec();
    if (user) {
        res.status(400).json({
            message: "User already exists"
        });
        return;
    }

    user = new User({
        username: username,
        password: bcrypt.hashSync(password)
    });
    await user.save();

    res.status(200).json({
        username: username
    });

});