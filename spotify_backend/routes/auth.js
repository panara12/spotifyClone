const express = require('express');
const router = express.Router();
const User = require("../model/User");
const {getToken} = require("../utiles/helper");

router.get("/a",(req,res)=>{
    res.send("fff");
})

router.post("/register",async (req,res)=>{
    const { firstName, email, password, username, lastName,role,image } = req.body;
    console.log({ firstName, email, password, username, lastName,role,image });

    const user = await User.findOne({ email });
    if (user) {
      return res.status(403).json({ error: "invalid email" });
    }

    const newUser = new User({ firstName, email, password, username, lastName,role,image});
        const token = await getToken(email,newUser);
        newUser.token = token;
        await newUser.save();

    res.status(201).json(newUser);
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
        
      if (!user) {
        return res.status(403).json({ error: 'invalid email' });
      }
      if (user.password !== password) {
        return res.status(403).json({ error: 'invalid password' });
      }
      const token = await getToken(user.email,user);
      user.token = token;
        await user.save();

      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: 'server error' });
    }
  });

module.exports=router;