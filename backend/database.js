console.log(process.env.REACT_APP_DB_HOST);
const database_app = require('pg').Pool
const database_cred = new database_app({
    host : process.env.REACT_APP_DB_HOST,
    database : process.env.REACT_APP_DB_DATABASE,
    user : process.env.REACT_APP_DB_USER,
    port: 5432,
    password : process.env.REACT_APP_DB_PASSWORD,
    ssl : {
        require:true,
        rejectUnauthorized:false
    },
    uri: process.env.REACT_APP_DB_URI
});


const parking_lots = (request,response) => {
    database_cred.query('SELECT * FROM parkinglots', (error,results) =>
    {
        if (error){
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

const store_user_data = (data, cb,uid) =>{
    console.log(data,uid)
    database_cred.query('INSERT INTO users(email,firstname,lastname,phonenumber,userid,parked) VALUES($1,$2,$3,$4,$5,$6)',[data['email'], data['firstName'],data['lastName'],data['phoneNumber'], uid,false],(error) =>{
        if(error){
            throw error;
        }
    })
}

const get_user_data = (request,response,uid) =>{
    database_cred.query('SELECT * FROM users WHERE userid = $1',[uid],(error, results) => {
        if (error){
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

const get_user_schedule = (request,response) => {
    const emailID = "prasoonn@buffalo.edu";
    database_cred.query('SELECT * FROM schedules WHERE email = $1',[emailID],(error,results) => {
        if(error){
            throw error;
        }
        response.status(200).json(results.rows)
    })
}

const update_user_data = (data, cb, uid) =>{
    database_cred.query('UPDATE users SET firstname = $1, lastname = $2, phonenumber = $3 WHERE userid = $4', [data['firstName'],data['lastName'], data['phoneNumber'], uid], (error) =>{
        if(error){
            throw error;
        }
    })
}

const update_parking_lot = (data,cb) => {
    database_cred.query('UPDATE parkinglots SET available = available - 1 WHERE name = $1 AND available > 0;',[data['parkingLotName']], (error) =>{
        if(error){
            throw error;
        }
    })
}

const update_parking_lot_left = (data,cb) => {
    database_cred.query('UPDATE parkinglots SET available = available + 1 WHERE name = $1;',[data['parkingLotName']], (error) =>{
        if(error){
            throw error;
        }
    })
}

const user_parked = (data,cb,uid) => {
    database_cred.query('UPDATE users SET parked = $1, starttimer = $2, endtimer = $3, parkinglot = $4 WHERE userid = $5', [true,data['startTime'],data['endTime'], data['parkingLotName'], uid], (error) => {
        if(error){
            throw error;
        }
    })
}

const user_leaving_parking_spot = (data,cb,uid) => {
    database_cred.query('UPDATE users SET parked = $1, starttimer = $2, endtimer = $3, parkinglot = $4 WHERE userid = $5', [false,null,null, null, uid], (error) => {
        if(error){
            throw error;
        }
    })
}

module.exports = {
    parking_lots,
    update_parking_lot,
    update_parking_lot_left,
    user_parked,
    user_leaving_parking_spot,
    get_user_data,
    get_user_schedule,
    store_user_data,
    update_user_data
}