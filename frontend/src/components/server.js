const express = require('express');
const basicAuth = require('express-basic-auth');
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database:'parkingspace',
    password:'p@rkteam1',
    port: 5432,

});


const app = express();
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

const auth = basicAuth({
    users: {
        admin: '123',
        user: '456',
    },

});

const PORT = process.env.PORT || 5000;

app.use(cookieParser('82e4e438a0705fabf61f9854e3b575af'));

app
    .use(express.static(path.join(__dirname, '../')))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.js'));
});

app.get('/authenticate', auth, (req, res) => {
    const options = {
        httpOnly: true,
        signed: true,
    };

    console.log(req.auth.user);

    if (req.auth.user === 'admin') {
        res.cookie('name', 'admin', options).send({ screen: 'admin' });
    } else if (req.auth.user === 'user') {
        res.cookie('name', 'user', options).send({ screen: 'user' });
    }
});

app.get('/read-cookie', (req, res) => {
    console.log(req.signedCookies);
    if (req.signedCookies.name === 'admin') {
        res.send({ screen: 'admin' });
    } else if (req.signedCookies.name === 'user') {
        res.send({ screen: 'user' });
    } else {
        res.send({ screen: 'auth' });
    }
});

app.get('/clear-cookie', (req, res) => {
    res.clearCookie('name').end();
});

app.get('/get-data', (req, res) => {
    if (req.signedCookies.name === 'admin') {
        res.send('This is admin panel');
    } else if (req.signedCookies.name === 'user') {
        res.send('This is user data');
    } else {
        res.end();
    }
});

const merchant_model = require('C:/Users/alain/WebstormProjects/Parking-Space/frontend/src/components/database/database_queries.js')

app.use(express.json())
app.post('/checklogin', (req, ress) => {
    const  username  = req.body.name;
    const password = req.body.password;
    const text = 'SELECT password FROM users WHERE username = $1';
    const values = [username];

    pool.query(text, values, (err, res) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(res.rows[0]['password'])
            if(password == res.rows[0]['password']){
                ress.send("success");
            }else{
                ress.send("wrong password");
            }
        }
    })

})

