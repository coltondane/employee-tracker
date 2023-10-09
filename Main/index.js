// imports 
const inquirer = require('inquirer');
const mysql = require('mysql2');


// CLI prompt
inquirer
    .prompt([
        {
            type: 'list',
            name: 'options',
            message: 'Please select an option from the following: ',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']

        }
    ])
    
    .then((answer) => {
        // consitionals fuction
        const newAnswer = answer.options;
        console.log(conditional(newAnswer));
    })

function conditional(answer) {
    return answer === 'view all departments' ? 'VAD'
    : answer === 'view all roles' ? 'VAR'
    : answer === 'view all employees' ? 'VAE'
    : answer === 'add a department' ? 'AAD'
    : answer === 'add a role' ? 'AAR'
    : answer === 'add an employee' ? 'AAE'
    : answer === 'update an employee role' ? 'UAER'
    : 'exit';
}