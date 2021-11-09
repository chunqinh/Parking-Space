
const express = require('express');
const app = express();
const port = process.env.PORT || 8081;
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname,'\.env')});
const db = require('./database');
const cors = require('cors')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => console.log(`Listening on port ${port}`));

// app.use(
//     cors({
//         origin: 'https://parking-space-442.herokuapp.com/',
//         credentials: true,
//     })
// );

// ** MIDDLEWARE ** //
const whitelist = ['http://localhost:3000', 'http://localhost:8081', 'https://parking-space-442.herokuapp.com']
const corsOptions = {
    origin: function (origin, callback) {
        console.log("** Origin of request " + origin)
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            console.log("Origin acceptable")
            callback(null, true)
        } else {
            console.log("Origin rejected")
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions))

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'frontend/build')));
// Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
    });
}

app.get('/', function (req,res){
    res.send("Hello World");
})

app.post('/current-user', function(req,res){
    console.log(req.body.email)
    db.currentUser = req.body.email
    console.log(db.currentUser)
})
app.get('/dashboard', db.parking_lots);
app.get('/user-profile', db.get_user_data);
app.get('/user-profile-schedule',db.get_user_schedule);
