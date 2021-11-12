
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname,'\.env')});
const db = require('./database');
const cors = require('cors');

app.use(cors({
    origin:"https://parkapp-space-442-backend.herokuapp.com/",
    credentials: true,
}));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());
app.use(require('body-parser').text());
app.use(require('body-parser').raw());

app.post('/personal-info', function(res,req){
    console.log('data-received:', res.body);
    db.store_user_data(res.body,req);
});

app.get('/dashboard', cors(), db.parking_lots);
app.get('/user-profile',cors(), db.get_user_data);
app.get('/user-profile-schedule',cors(), db.get_user_schedule);

app.use(express.static('frontend/build'));
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
})