const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname,'\.env')});
const db = require('./database');
const cors = require('cors')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/dashboard', db.parking_lots);
app.get('/user-profile', db.get_user_data);
app.get('/user-profile-schedule',db.get_user_schedule);

app.use(express.static('frontend/build'));
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
})