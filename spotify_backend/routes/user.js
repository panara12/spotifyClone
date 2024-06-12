const multer = require("multer")
const express = require('express');
const router = express();
const User = require('../model/User');
const passport = require('passport');
const { reset } = require('nodemon');
const { route } = require('./auth');

router.get("/get/alluserdata",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    const currentUser = req.user;
    const data = await User.find({})
    return res.status(200).json({data:data});
})

router.put("/update/user/:userid",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    const currentUser = req.user;
    console.log(req.body);
    const databyid = await User.findOneAndUpdate({_id : currentUser.id},{$set:req.body},{new:true})
    return res.status(200).json({data:databyid});
})

router.get("/get/logeduser/:userid",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    const currentUser = req.user;
    const databyid = await User.findOne({_id : currentUser.id})
    return res.status(200).json({data:databyid});
})

router.delete("/get/user/:id",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    const {id} = req.params;
    const deleteindex = await User.findOneAndDelete({_id:id});
    res.send(deleteindex);
})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      return cb(null, file.originalname)
    }
  })

const upload = multer({ storage })


router.post("/upload",(req,res)=>{
    console.log(req.body); 
    console.log(req.file);
})
  


module.exports = router
