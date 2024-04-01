const  express = require('express')
const app = express()
const port = 5000
const mongoose = require("mongoose");
const auth = require('./routes/auth');
const passport = require('passport')
const User = require('./model/User');
const cors = require('cors');
const playlist = require("./routes/playlist");
const song = require("./routes/song");
const userdata = require("./routes/user");
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
app.use(cors());
app.use(express.json()); // to support JSON-encoded bodies

app.get("/",(req,res)=>{
    res.send("qorking");
})

// mongodb+srv://Harshil1:Harshil2812@cluster0.se35oya.mongodb.net/chainis?retryWrites=true&w=majority

mongoose.connect("mongodb+srv://panaraabhay:abhay112004@cluster12.8l9con2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster12",{
   useNewUrlParser: true, 
   useUnifiedTopology: true 
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
opts.secretOrKey = 'secretiskey';

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