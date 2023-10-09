// imports 
const inquirer = require('inquirer');
const mysql = require('mysql2');


// CLI prompt
inquirer
    prompt([
        {
            type: 'list',
            name: 'options',
            message: 'Please select an option from the following: ',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']

        }
    ])