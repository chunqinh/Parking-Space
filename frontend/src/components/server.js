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


const PORT = process.env.PORT || 5000;

app.use(cookieParser('82e4e438a0705fabf61f9854e3b575af'));

app
    .use(express.static(path.join(__dirname, '../')))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.js'));
});


app.use(express.json())
app.post('/checklogin', (req, ress) => {
    const  username  = req.body.name;
    const password = req.body.password;
    const text = 'SELECT password FROM users WHERE username = $1';
    const values = [username];

    const options = {
        httpOnly: true,
        signed: true,
    };

    pool.query(text, values, (err, res) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(res.rows[0]['password'])
            if(password == res.rows[0]['password']){
                ress.cookie('username', username, options).send({screen: username});
            }else{
                ress.send("wrong password");
            }
        }
    })

})
app.get('/auth', (req, ress) => {
    const text = 'SELECT username FROM users WHERE username = $1';
    if(req.signedCookies.username == null){
        ress.send("notloggedin");
    }
    else{
        const values = [req.signedCookies.username];
        console.log(req.signedCookies.username);
        pool.query(text, values, (err, res) => {
            if (err) {
                console.log(err.stack)
            } else {

                if( res.rows[0]['username'] == req.signedCookies.username){
                    ress.send("loggedin")
                }else{
                    ress.send("notloggedin");
                }
            }
        })
    }


});

