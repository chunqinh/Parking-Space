const express = require('express');
const app = express();
const port = process.env.PORT || 8081;
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname,'\.env')});
const firebaseAdmin = require('./firebase-admin');
const db = require('./database');
const cors = require('cors');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.REACT_APP_GMAIL_ID,
        pass: process.env.REACT_APP_GMAIL_PASSWORD
    }
});



setInterval(emailReminder,60000);

function emailReminder(){
    const db_rows = db.user_timer_checker();
    db_rows.then(function(parked_users){
        if (parked_users){
            for(const user of parked_users){
                const startTime = user['starttimer'];
                let endTime = user['endtimer'];
                let emailID = user['email'];
                let parkingLot = user['parkinglot']

                if(endTime === 'TIME UP'){
                    sendEmail(emailID,parkingLot,startTime, "TIME UP")
                }
                else{
                    const now = new Date();
                    const now_time = now.toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit', hour12: false})
                    const split_userEndTime = user['endtimer'].split(':')
                    const endTime = (parseInt(split_userEndTime[0]) * 60) + (parseInt(split_userEndTime[1]));
                    const split_startTime = now_time.split(':')
                    const currentTime = (parseInt(split_startTime[0]) * 60) + (parseInt(split_startTime[1]));

                    if(currentTime > endTime){
                        sendEmail(emailID,parkingLot,startTime, "TIME UP")
                    }
                    else if( (endTime - currentTime) <= 15){
                        sendEmail(emailID,parkingLot,startTime, "LESS THAN 15 MIN LEFT")
                    }
                }
            }
        }

    })

}

function sendEmail(emailID, parkingLot, startTime,body){
    let subjectOfEmail = "";
    let bodyOfEmail = "";


    if(body==="TIME UP"){
        subjectOfEmail = "Park App Email Reminder : TIME UP"
        bodyOfEmail = "Hey There, \r\nYour car parked in " + parkingLot + " since " + startTime + " has ran out of time. Please extend the estimated departure by visiting the ParkApp. If you have already left and are being notified about this spot, please visit the app to let us know you left by clicking on the Leaving? button. \r\nHave a great day ahead. \r\n\r\nBest, \r\nParkApp Team"
    }
    else{
        subjectOfEmail = "Park App Email Reminder : Your Time Is Almost Up"
        bodyOfEmail = "Hey There, \r\nYour car parked in " + parkingLot + " since " + startTime + " has only less than 15 minutes. Please extend the estimated departure by visiting the ParkApp. If you have already left and are being notified about this spot, please visit the app to let us know you left by clicking on the Leaving? button. \r\nHave a great day ahead. \r\n\r\nBest, \r\nParkApp Team"
    }

    const mailOptions = {
        from: '"ParkApp" <parkapp442@gmail.com>',
        to: emailID,
        subject: subjectOfEmail,
        text: bodyOfEmail
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

app.use(cors({
    origin:"https://parking-space-442.herokuapp.com/",
    // origin:"http//localhost:5000/",
    credentials: true,
}));

app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());
app.use(require('body-parser').text());
app.use(require('body-parser').raw());

let uid = "";

app.get('/current-user-details', function(res,req){
   const authHeader = res.get('authorization');
   firebaseAdmin.admin.auth()
       .verifyIdToken(authHeader)
       .then((decodeToken)=>{
           uid = decodeToken.uid;
           db.get_user_data(res.body,req,uid)
       })
});

app.post('/personal-info', function(res,req){
    const authHeader = res.get('authorization');
    firebaseAdmin.admin.auth()
        .verifyIdToken(authHeader)
        .then((decodeToken)=>{
            const uid = decodeToken.uid;
            console.log(uid);
            db.store_user_data(res.body,req,uid);
        })
});

app.post('/personal-info-update', function(res,req){
    const authHeader = res.get('authorization');
    firebaseAdmin.admin.auth()
        .verifyIdToken(authHeader)
        .then((decodeToken)=>{
            const uid = decodeToken.uid;
            console.log(uid);
            console.log(res.body);
            db.update_user_data(res.body,req,uid);
        })
    req.send(res.body);
});

app.post('/user-parked', function(req,res){
    const authHeader = req.get('authorization');
    firebaseAdmin.admin.auth()
        .verifyIdToken(authHeader)
        .then((decodeToken)=>{
            const uid = decodeToken.uid;
            console.log(req.body);
            db.update_parking_lot(req.body,res);
            db.user_parked(req.body,res,uid);
        })
    res.send(req.body);
})

app.post('/user-leaving', function(res,req){
    const authHeader = res.get('authorization');
    firebaseAdmin.admin.auth()
        .verifyIdToken(authHeader)
        .then((decodeToken)=>{
            uid = decodeToken.uid;
            db.user_leaving_parking_spot(res.body,req,uid);
            db.update_parking_lot_left(res.body,req)
        })
    req.send(res.body);
});

app.post('/current-user-time-up', function(req,res){
    const authHeader = req.get('authorization');
    firebaseAdmin.admin.auth()
        .verifyIdToken(authHeader)
        .then((decodeToken)=>{
            uid = decodeToken.uid;
            db.user_time_up(req.body,res,uid);
        })
    res.send(req.body);
});

app.post('/user-edit-time', function(req,res){
    const authHeader = req.get('authorization');
    firebaseAdmin.admin.auth()
        .verifyIdToken(authHeader)
        .then((decodeToken)=>{
            uid = decodeToken.uid;
            db.user_parked(req.body,res,uid);
        })
    res.send(req.body);
})

app.get('/get-parking-lots', cors(), db.parking_lots);

app.get('/user-profile-schedule',cors(), db.get_user_schedule);

app.use(express.static('frontend/build'));
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
})
