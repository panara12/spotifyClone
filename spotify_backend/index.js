const  express = require('express')
require('dotenv').config()
const app = express()
const port = 5000
const mongoose = require("mongoose");
const auth = require('./routes/auth');
const passport = require('passport')
const User = require('./model/User');
const playlist = require("./routes/playlist");
const song = require("./routes/song");
const userdata = require("./routes/user");
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({extended:false}))
app.get("/",(req,res)=>{
    res.send("qorking");
})


mongoose.connect(process.env.MONGO_URL,{
})
.then((res)=>{
    console.log("connected");
}).catch((err)=>{
    console.log("not connected");
})

// const db = mongoose.connection;

// db.on('error', (err) => {
//   console.error('MongoDB connection error:', err);
// });

// db.once('open', () => {
//   console.log('Connected to MongoDB Atlas');
// });

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({_id: jwt_payload.identifier})
      .then(user => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch(err => {
        return done(err);
      });
  }));


app.use("/auth",auth);
app.use("/song",song);
app.use("/playlist",playlist);
app.use("/userdata",userdata);

app.listen(port, (req,res) => {
    console.log("runn");
})