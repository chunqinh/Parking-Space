
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
    function getPassword2(username){
        const text = 'SELECT password FROM users WHERE username = $1';
        const values = [username];

         let pw;


            var queryFunction = function(text, values){
                return new Promise(function(resolve, reject){
                    pool.query(text, values, function(err, result) {
                        if(err)
                            return reject(err);
                        resolve(result.rows[0]['password']);
                    });
                    pool.end();
                });
            }

            queryFunction(text, values)
                .then(function(result){
                    console.log(result);

                }).catch(function(err){
               console.log(err);
            });


    }


    module.exports = {
        createUser,
        getPassword,
        getPassword2
    }

