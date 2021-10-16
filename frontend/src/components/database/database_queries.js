
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database:'parkingspace',
    password:'p@rkteam1',
    port: 5432,

});

function createUser(username, password) {
    {
        return new Promise(function (resolve, reject) {
            pool.query('CREATE TABLE users (user id serial PRIMARY_KEY, username VARCHAR (50) UNIQUE NOT NULL, password VARCHAR (50) NOT NULL)', (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results.rows);
            })
        })
    }
}

    function getPassword(username) {
        return new Promise(function (resolve, reject) {
            const text = 'SELECT password FROM users WHERE username = $1'
            const values = [username]
            pool.query(text, values, (error, results) => {
                if (error) {
                    return console.error('Error executing query', error.stack)
                }
                resolve(results.rows);
            })

        })
    }
     async function getPassword2(username){
        const text = 'SELECT password FROM users WHERE username = $1';
        const values = [username];

         let pw;
// callback


         await pool.query(text,values, (err, res) => {
             if (err) {
                 console.log(err.stack);
             } else {
                 pw = res.rows[0]['password'];
                 //console.log(res.fields.map(field => field.name)) // ['first_name', 'last_name']
                 //console.log(res.rows[0]['password']); // ['Brian', 'Carlson']
             }
         })
         console.log(res.rows[0]['password']);
         return res.rows[0]['password'];
            // pool.query(text, values)
            //     .then(res =>{
            //         console.log(res.rows[0]['password']);
            //
            //             pw = res.rows[0]['password'].toString();
            //
            //
            //     })
            //
            //     .catch(e=>console.error(e.stack))

    }


    module.exports = {
        createUser,
        getPassword,
        getPassword2
    }

