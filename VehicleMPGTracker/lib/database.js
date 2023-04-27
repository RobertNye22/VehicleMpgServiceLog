let mysql = require('mysql2');

let con = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "RobertNye1",
    password: "@mr.yeastonrm850"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to DB!");
    con.query("CREATE DATABASE IF NOT EXISTS VehicleMPGTracker", function (err, result) {
        if (err) throw err;
        console.log("Database created");
        selectDatabase();
    });
});

function selectDatabase() {
    con.query("USE VehicleMPGTracker", function (err, result) {
        if (err) throw err;
        console.log("Database selected");
        createTable();
    });
}

function createTable() {}

module.exports = con;