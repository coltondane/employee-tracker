// imports 
const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./config/connection')
const query = require('./db/index');


// CLI prompt
inquirer
    .prompt([
        {
            type: 'list',
            name: 'options',
            message: 'Please select an option from the following: ',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'exit']

        }
    ])
    
    .then((answer) => {
        // conditionals fuction
        const newAnswer = answer.options;
        conditional(newAnswer);
    });

function conditional(answer) {
    // ternary operators
    return answer === 'view all departments' ? viewDepts()
    : answer === 'view all roles' ? viewRoles()
    : answer === 'view all employees' ? viewEmployees()
    : answer === 'add a department' ? addDept()
    : answer === 'add a role' ? addRole()
    : answer === 'add an employee' ? addEmployee()
    : answer === 'update an employee role' ? updateEmployeeRole()
    : exit();
};

function viewDepts() {
    // query sql
    db.query('SELECT * FROM department', function (err, results) {
        return (err) ? (err)
        : console.table(results);
    })
}

function viewRoles() {
    console.log('view roles');
}

function viewEmployees() {
    console.log('view employees');
}

function addDept() {
    console.log('add dept');
}

function addRole() {
    console.log('add role');
}

function addEmployee() {
    console.log('add employee');
}

function updateEmployeeRole() {
    console.log('update role');
}

// exit the prompt
function exit() {
    process.exit();
}
