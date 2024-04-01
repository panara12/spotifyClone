const  express = require('express');
const Playlist = require("../model/Playlist");
const passport = require("passport");
const { routes } = require('./song');
const user = require("../model/User");
const router = express.Router();
const Song = require("../model/Song"); 


router.post("/create",passport.authenticate("jwt",{session:false}),async (req,res)=>{
    const {name,thumbnail,songs}=req.body;
    const currentUser = req.user;
    if(!name||!thumbnail||!songs){
        return res.status(301).json("no data");
    }

    const newplaylist = new Playlist({name,thumbnail,songs,owner:currentUser._id,collaborators:[]});
    await newplaylist.save();
    currentUser.playlist.push(newplaylist._id);
    await currentUser.save();
    return res.status(200).json(newplaylist);
});

router.get("/get/allplaylist",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    const currentUser = req.user;
    const data = await Playlist.find({}).populate("songs")
    return res.status(200).json({data:data});
})


router.delete("/get/deleteplaylist/:id",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    const {id} = req.params;
    const currentUser = req.user;
    const deleteindex = await Playlist.findOneAndDelete({_id:id});
    currentUser.playlist = currentUser.playlist.filter(item => item !== id);
    await currentUser.save();
    res.send(deleteindex+"done");
})


router.get("/get/playlist/:playlistId",passport.authenticate("jwt",{session:false}),async (req,res)=>{
    const playlistId = req.params.playlistId;
    const playlist = await Playlist.findOne({_id:playlistId}).populate({
        path : "songs",
        populate :{
            path : "artist",
        }
    });
    if(!playlist){
        return res.status(301).json({er:"invalid id"});
    }
    return res.status(200).json(playlist);
});


router.get("/get/my",passport.authenticate("jwt",{session:false}),async (req,res)=>{
    const artistId = req.user._id;
    const playlists = await Playlist.find({owner:artistId}).populate("owner");
    return res.status(200).json(playlists);
});


router.get("/get/artist/:artistId",passport.authenticate("jwt",{session:false}),async (req,res)=>{
    const artistId = req.params.artistId;
    const artist = await user.findOne({_id:artistId});
    if(!artist){
        return res.status(304).json({err:"Invalid artist id"});
    }
    const playlists = await Playlist.findOne({owner:artistId});
    return res.status(200).json(playlists);

});


router.post("/add/song",passport.authenticate("jwt",{session:false}),async (req,res)=>{
    const currentUser = req.user;
    const {playlistId,songId} = req.body;

    const playlist = await Playlist.findOne({_id:playlistId});
    if(!playlist){
        return res.status(304).json({er:"invalid "});
    }

    if(!playlist.owner.equals(currentUser._id) && !playlist.collaborators.includes(currentUser._id)){
        return res.status(400).json({er:"not allowed"});
    }

    const song = await Song.findOne({_id:songId})
    if(!song){
        return res.status(304).json({er:"song not exsit"});
    }

    song.playlist.push(playlistId);
    await song.save();
    playlist.songs.push(songId);
    await playlist.save();
    return  res.status(200).json(playlist);

});

module.exports=router;