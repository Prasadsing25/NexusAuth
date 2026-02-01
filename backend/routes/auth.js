const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

//sign up
router.post('/signup', async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User ({ username, email, password: hashedPassword });
        const savedUser = await newUser.save();

        const token = jsonwebtoken.sign(
            { id: savedUser._id, username: savedUser.username},
            'secret_key',
            { expiresIn: '1h'}
        )

        res.status(201).json( {token, username: savedUser.username, message: "User created"} );
    } catch (err) {
        res.status(500).json({error: err.message })
    }
});


//login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials"});

        const token = jsonwebtoken.sign({ id: user._id, username: user.username }, 'secret_key', {expiresIn: '1h'});
        res.json({ token, username: user.username});
    } catch (err) {
        res.status(500).json( {error: err.message })
    }
});

module.exports = router;