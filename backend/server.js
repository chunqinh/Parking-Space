
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname,'\.env')});
const db = require('./database');
const cors = require('cors')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(
    cors({
        origin: 'https://parking-space-442.herokuapp.com/',
        credentials: true,
    })
);
app.post('/current-user', function(req,res){
    console.log(req.body.email)
    db.currentUser = req.body.email
    console.log(db.currentUser)
})
app.get('/dashboard', db.parking_lots);
app.get('/user-profile', db.get_user_data);
app.get('/user-profile-schedule',db.get_user_schedule);
