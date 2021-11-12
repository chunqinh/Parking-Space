import routes from "./frontend/src/components/router-dom/routes";

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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);


app.post('/personal-info', cors(), function(res,req){
    req.body;
    res.json(req.body).then(response => console.log(response));
    console.log('data-received');
});

app.get('/dashboard', cors(), db.parking_lots);
app.get('/user-profile',cors(), db.get_user_data);
app.get('/user-profile-schedule',cors(), db.get_user_schedule);

app.use(express.static('frontend/build'));
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
})