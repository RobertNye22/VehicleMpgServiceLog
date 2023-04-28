let mysql = require('mysql2');

var dbConnectionInfo = require('./connectionInfo');

var con = mysql.createConnection({
    host: dbConnectionInfo.host,
    user: dbConnectionInfo.user,
    password: dbConnectionInfo.password,
    port: dbConnectionInfo.port,
    multipleStatements: true              // Needed for stored proecures with OUT results
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
        createTables();
    });
}

function createTables() {
    // A CREATE TABLE call will work if it does not exist or if it does exist.
    // Either way, that's what we want.
    let sql =   "CREATE TABLE IF NOT EXISTS user (\n" +
                "UserID INT NOT NULL AUTO_INCREMENT,\n" +
                "UserFirstName VARCHAR(25) NOT NULL,\n" +
                "UserLastName VARCHAR(25) NOT NULL,\n" +
                "UserName VARCHAR(35) NOT NULL,\n" +
                "UserHashedPassword VARCHAR(255) NOT NULL,\n" +
                "UserSalt VARCHAR(255) NOT NULL,\n" +
                "PRIMARY KEY (UserID)\n" +
              ")";
    con.execute(sql, function(err, results, fields) {
      if (err) {
        console.log(err.message);
        throw err;
      } else {
        console.log("database.js: table User created if it didn't exist");
      }
    });

    sql =       "CREATE TABLE IF NOT EXISTS vehicle (\n" +
                "VehicleID INT NOT NULL AUTO_INCREMENT,\n" +
                "VehicleYear INT NOT NULL,\n" +
                "VehicleMake VARCHAR(25) NOT NULL,\n" +
                "VehicleModel VARCHAR(25) NOT NULL,\n" +
                "VehicleMilage DECIMAL NOT NULL,\n" +
                "VehicleMPG DECIMAL NULL,\n" +
                "VehicleTankSize DECIMAL NOT NULL,\n" +
                "UserID INT NOT NULL,\n" +
                "PRIMARY KEY (VehicleID),\n" +
                "FOREIGN KEY (UserID) REFERENCES user(UserID)\n" +
              ")";
    con.execute(sql, function(err, results, fields) {
      if (err) {
        console.log(err.message);
        throw err;
      } else {
        console.log("database.js: table Vehicle created if it didn't exist");
      }
    });

    sql =       "CREATE TABLE IF NOT EXISTS upgrade (\n" +
                "UpgradeID INT NOT NULL AUTO_INCREMENT,\n" +
                "UpgradeDate DATE NOT NULL,\n" +
                "UpgradePartType VARCHAR(25) NOT NULL,\n" +
                "UpgradePartName VARCHAR(25) NOT NULL,\n" +
                "UpgradeCurrentMilage DECIMAL NOT NULL,\n" +
                "VehicleID INT NOT NULL,\n" +
                "PRIMARY KEY (UpgradeID),\n" +
                "FOREIGN KEY (VehicleID) REFERENCES vehicle(VehicleID)\n" +
              ")";
    con.execute(sql, function(err, results, fields) {
      if (err) {
        console.log(err.message);
        throw err;
      } else {
        console.log("database.js: table Upgrade created if it didn't exist");
      }
    });

    sql =       "CREATE TABLE IF NOT EXISTS fillup (\n" +
                "FillUpID INT NOT NULL AUTO_INCREMENT,\n" +
                "FillUpDate DATE NOT NULL,\n" +
                "FillUpGallons DECIMAL NOT NULL,\n" +
                "FillUpCurrentMilage DECIMAL NOT NULL,\n" +
                "VehicleID INT NOT NULL,\n" +
                "PRIMARY KEY (FillUpID),\n" +
                "FOREIGN KEY (VehicleID) REFERENCES vehicle(VehicleID)\n" +
              ")";
    con.execute(sql, function(err, results, fields) {
      if (err) {
        console.log(err.message);
        throw err;
      } else {
        console.log("database.js: table FillUp created if it didn't exist");
      }
    });



}

module.exports = con;