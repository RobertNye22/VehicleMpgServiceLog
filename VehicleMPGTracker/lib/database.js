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
    con.query("CREATE DATABASE IF NOT EXISTS AutoLogix", function (err, result) {
        if (err) throw err;
        console.log("AutoLogix Database created");
        selectDatabase();
    });
});

function selectDatabase() {
    con.query("USE AutoLogix", function (err, result) {
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
                "UserEmail VARCHAR(255) NOT NULL,\n" +
                "UserPhoneNumber VARCHAR(25),\n" +
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

    sql =       "CREATE TABLE IF NOT EXISTS maintenance_type (\n" +
                "MaintenanceTypeID INT NOT NULL AUTO_INCREMENT,\n" +
                "MaintenanceTypeName VARCHAR(45) NOT NULL,\n" +
                "MaintenanceTypeDescription VARCHAR(255),\n" +
                "MaintenanceTypeFrequency INT,\n" +
                "PRIMARY KEY (MaintenanceTypeID)\n" +
              ")";
    con.execute(sql, function(err, results, fields) {
      if (err) {
        console.log(err.message);
        throw err;
      } else {
        console.log("database.js: table Maintenance_Type created if it didn't exist");
      }
    });

    sql =       "CREATE TABLE IF NOT EXISTS maintenance_log (\n" +
                "MaintenanceLogID INT NOT NULL AUTO_INCREMENT,\n" +
                "MaintenanceCurrentMilage DECIMAL NOT NULL,\n" +
                "MaintenanceNextMilage DECIMAL,\n" +
                "MaintenanceDate DATE NOT NULL,\n" +
                "MaintenanceNotes LONGTEXT,\n" +
                "VehicleID INT NOT NULL,\n" +
                "MaintenanceTypeID INT NOT NULL,\n" +
                "PRIMARY KEY (MaintenanceLogID),\n" +
                "FOREIGN KEY (VehicleID) REFERENCES vehicle(VehicleID),\n" +
                "FOREIGN KEY (MaintenanceTypeID) REFERENCES maintenance_type(MaintenanceTypeID)\n" +
              ")";
    con.execute(sql, function(err, results, fields) {
      if (err) {
        console.log(err.message);
        throw err;
      } else {
        console.log("database.js: table Maintenance_Log created if it didn't exist");
      }
    });

    sql =       "CREATE TABLE IF NOT EXISTS fillup (\n" +
                "FillUpID INT NOT NULL AUTO_INCREMENT,\n" +
                "FillUpDate DATE NOT NULL,\n" +
                "FillUpGallons DECIMAL NOT NULL,\n" +
                "FillUpCurrentMilage DECIMAL NOT NULL,\n" +
                "FillUpNextMilage DECIMAL,\n" +
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

    sql =       "CREATE TABLE IF NOT EXISTS part (\n" +
                "PartID INT NOT NULL AUTO_INCREMENT,\n" +
                "PartName VARCHAR(45) NOT NULL,\n" +
                "PartDescription VARCHAR(255),\n" +
                "PartCost DECIMAL,\n" +
                "PartSupplier VARCHAR(45),\n" +
                "PartManufacturer VARCHAR(45),\n" +
                "PartNumber VARCHAR(255),\n" +
                "PRIMARY KEY (PartID)\n" +
              ")";
    con.execute(sql, function(err, results, fields) {
      if (err) {
        console.log(err.message);
        throw err;
      } else {
        console.log("database.js: table Part created if it didn't exist");
      }
    });



}

module.exports = con;