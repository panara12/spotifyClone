const express = require('express');
const router = express();
const User = require('../model/User')
const song = require('../model/Song');
const passport = require('passport');
const { reset } = require('nodemon');
const { route } = require('./auth');

// const LocalStrategy = require('passport-local').Strategy;

// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
// }, async (email, password, done) => {
//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return done(null, false, { message: 'Incorrect email.' });
//         }
//         const isMatch = await user.isValidPassword(password);
//         if (!isMatch) {
//             return done(null, false, { message: 'Incorrect password.' });
//         }
//         return done(null, user);
//     } catch (err) {
//         return done(err);
//     }
// }));



router.post("/create",passport.authenticate("jwt",{session:false}),async (req,res)=>{
    const {name,thumbnail,track}=req.body;
    const artist = await req.user._id;
    if(!name||!thumbnail||!track||!artist){
        return res.status(301).json("no data");
    }

    const newsong = new song({name,thumbnail,track,artist});
    await newsong.save();
    req.user.mysongs.push(newsong._id);
    await req.user.save();
    return res.status(200).json(newsong);
});

// delete song for admin
router.delete("/get/allsongs/:id",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    const {id} = req.params;
    const currentUser = req.user;
    const deleteindex = await song.findOneAndDelete({_id:id});
    currentUser.mysongs = currentUser.mysongs.filter(item => item !== id);
    await currentUser.save();
    res.send(deleteindex);
})

router.get("/get/allsongs",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    const currentUser = req.user;
    const data = await song.find({}).populate("artist");
    return res.status(200).json({data:data});
})

// creted songs by  mee

router.get("/get/mysongs",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    const currentUser = req.user;
    const songs = await song.find({artist: req.user._id}).populate("artist")
    return res.status(200).json({data:songs});
})

// by aritist name

router.get("/get/artist/:artistId",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    const {artistId} = req.params;
    const artist = await User.find({_id :artistId});
    if(!artist){
        return res.status(301).json({er:"artist not exist"});
    }
    const songs = await song.find({artist:artistId});
    return res.status(200).json({data:songs});
});

// by song id


router.get("/get/song/:songid",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    const {songid} = req.params;
    const songdata = await song.find({_id :songid});
    if(!songdata){
        return res.status(301).json({er:"artist not exist"});
    }
    return res.status(200).json({data:songdata});
});

// by song name

router.get("/get/songbyname/:songName",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    const {songName} = req.params;
    
    const songs = await song.find({name:songName}).populate("artist");
    return res.status(200).json({data:songs});
});

router.delete("/get/mysongs/:id",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    const {id} = req.params;
    const currentUser = req.user;
    const deleteindex = await song.findOneAndDelete({_id:id});
    currentUser.mysongs = currentUser.mysongs.filter(item => item !== id);
    await currentUser.save();
    res.send(deleteindex);
})


module.exports = router