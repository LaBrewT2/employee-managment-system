const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Port
    port: 3306,

    // Username
    user: "root",

    // Password and database
    password: "",
    database: "employee_tracker_db"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    
    userPrompts();
});
//User prompt 
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
        if (data.userPrompts === "View all employees") {
            viewAllEmployees();
        } else if (data.userPrompts === "View employees by department") {
            viewByDepartment();
        } else if (data.userPrompts === "View employees by manager") {
            viewByManager();
        } else if (data.userPrompts === "Add a new employee") {
            addEmployee();
        } else if (data.userPrompts === "Delete an employee") {
            deleteEmployee();
        } else if (data.userPrompts === "Update employee role") {
            updateEmployeeRole();
        } else if (data.userPrompts === "Update employee manager") {
            updateManager();
        } else {
            connection.end();
        }
    });
};
function viewAllEmployees() {
    // view ALL employees
    connection.query("SELECT * FROM employees", function (err, res) {
        if (err) throw err;
        console.table(res);

    })
    
    
    userPrompts();
};

function viewByDepartment() {
   
    inquirer.prompt([{
        type: "list",
        name: "departments",
        message: "Which department would you like to view?",
        choices: ["Sales", "Engineering", "Finance", "Legal"]
    }]).then(function (data) {
        if (data.departments === "Sales") {
            connection.query("SELECT * FROM employees INNER JOIN roles on employees.role_id=roles.role_id INNER JOIN departments on roles.department_id=departments.department_id WHERE departments.department_id=1", function (err, res) {
                if (err) throw err;
                console.table(res);
                
                userPrompts();
            });
        } else if (data.departments === "Engineering") {
            connection.query("SELECT * FROM employees INNER JOIN roles on employees.role_id=roles.role_id INNER JOIN departments on roles.department_id=departments.department_id WHERE departments.department_id=2", function (err, res) {
                if (err) throw err;
                console.table(res);
                userPrompts();
            });
        } else if (data.departments === "Finance") {
            connection.query("SELECT * FROM employees INNER JOIN roles on employees.role_id=roles.role_id INNER JOIN departments on roles.department_id=departments.department_id WHERE departments.department_id=3", function (err, res) {
                if (err) throw err;
                console.table(res);
                userPrompts();
            });
        } else {
            connection.query("SELECT * FROM employees INNER JOIN roles on employees.role_id=roles.role_id INNER JOIN departments on roles.department_id=departments.department_id WHERE departments.department_id=4", function (err, res) {
                if (err) throw err;
                console.table(res);
                userPrompts();
            });
        }
    });
};
//Adding Employees
function addEmployee() {
    var manager =[];
    connection.query("SELECT CONCAT(firstName, ' ', lastName) as 'manager', employee_id FROM employees where employee_id in (SELECT distinct manager_id FROM employees)", function (err, res) {
        if (err) throw err;
        
        for (var i=0; i<res.length; i++){
            manager.push(res[i].employee_id + '. ' + res[i].manager)
        }
    });
    var roles = [];
    connection.query("SELECT DISTINCT roles.role_id, roles.title FROM  `roles` , employees WHERE roles.role_id = employees.role_id", function (err, res) {
        if (err) throw err;
        for (var i=0; i<res.length; i++){
            roles.push(res[i].role_id + '. ' + res[i].title)
        }
    });
    // Adding new employees prompt
    inquirer.prompt([{
        type: "input",
        name: "newEmployeeFirstName",
        message: "What is the first name of the employee?"
    }, {
        type: "input",
        name: "newEmployeeLastName",
        message: "What is the last name of the employee?"
    }, {
        type: "list",
        name: "newEmployeeRole",
        message: "What is the role of the employee?",
        choices: roles
    }, {
        type: "list",
        name: "newEmployeeManager",
        message: "Who is the manager of the employee?",
        choices: manager
    }]).then(function (data) {
        var parsedRole = data.newEmployeeRole.split(".");
        var parsedManager = data.newEmployeeManager.split(".");
        connection.query("INSERT INTO employees SET ?", {
            firstName: data.newEmployeeFirstName,
            lastName: data.newEmployeeLastName,
            role_id: parsedRole [0],
            manager_id: parsedManager[0],
            },
            function (err) {
                if (err) throw err;
                console.log('employee added');
                userPrompts();
            })
    })
};


//Delete employee
function deleteEmployee() {
   

    userPrompts();
};

//Update Employee
function updateEmployeeRole() {
    

    userPrompts();
};

//Update Manager
function updateManager() {
    

    userPrompts();
};