const mysql = require('mysql');
const dotenv = require("dotenv");
dotenv.config();

let connection = undefined;
//You should put your DB informations in a .env file at the root of API 
module.exports.connectDatabase = function () {
    connection = mysql.createConnection({
        host: process.env.MYSQL_DB_HOST,
        user: process.env.MYSQL_DB_USER,
        password: process.env.MYSQL_DB_PWD,
        database: process.env.MYSQL_DB_NAME,
        multipleStatements: true,
        dateStrings: true,
        charset: "utf8_general_ci"
    });
    connection.connect(function (err) {
        if (err) {
            connection = undefined;
            console.log("Failed to connect to MySQL Database :(");
            console.log(err.message);
            throw err;
        }
        console.log("Succefully connected to MySQL Database !");
    });
}

module.exports.sendQueryToDatabase = async function (query) {
    console.log(query);
    if (connection === undefined) {
        console.log("You must connect to Database first !");
    }
    else {
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }
}



