
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

let currentUser = "prasoonn@buffalo.edu";

const parking_lots = (request,response) => {
    database_cred.query('SELECT * FROM parkinglots', (error,results) =>
    {
        if (error){
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

const get_user_data = (request,response) =>{
    database_cred.query('SELECT * FROM users WHERE email = $1',[currentUser],(error, results) => {
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

module.exports = {
    parking_lots,
    get_user_data,
    get_user_schedule,
    currentUser
}