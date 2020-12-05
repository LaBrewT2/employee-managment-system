const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Port
    port: 3306,

    // Your username
    user: "root",

    // P
    password: "",
    database: "employee_tracker_db"
});