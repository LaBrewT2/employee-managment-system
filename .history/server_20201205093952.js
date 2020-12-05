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
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    
    userPrompts();
});

function userPrompts() {
    inquirer.prompt([{
        type: "list",
        name: "userPrompts",
        message: "What would you like to do?",
        choices: ["View all employees",
            "View employees by department",
            "View employees by manager",
            "Add a new employee",
            "Delete an employee",
            "Update employee role",
            "Update employee manager",
            "All done!"]
    }]).then(function (data) {