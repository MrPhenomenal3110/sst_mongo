const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      res.send({
        success: false,
        message: "User Already Exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const newUser = new User(req.body);
    await newUser.save();
    console.log(req.body);

    return res.status(201).send({
        success: false,
        message: "User Created successfully. Now Login",
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/login", async (req, res) => {
    const user = await User.findOne({email : req.body.email})

    if(!user){
        res.send({
            success : false,
            message : 'User Does not exist , please register'
        })
    }


    const validPassword = await bcrypt.compare(req.body.password ,user.password )

    if(!validPassword){
        return res.send({
            success : false,
            message :"Invalid Password"
        })
    }
    
    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET || 'scalermovies', {expiresIn:'1d'});

    res.send({
        success : true,
        message :"user Logged in",
        token: token,
    })

});

router.get('/get-current-user', authMiddleware, async (req, res) => {
    try {
        const user = User.findById(req.body.userId).select('-password');
        res.send({
            success: true,
            message: "Authentication successful !",
        })
    } catch(err) {
        res.send({
            success: false,
            message: "User not valid !",
        })
    }
})

module.exports = router;