const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Port
    port: 3306,

    // Username
    user: "root",

    // Password
    password: "",
    database: "employee_tracker_db"
});