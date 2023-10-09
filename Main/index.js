// imports 
const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./db')


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
    console.log('view depts function');
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
