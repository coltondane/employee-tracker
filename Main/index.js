// imports
const { prompt } = require("inquirer");
// const mysql = require('mysql2');
const db = require("./config/connection");
const { log } = require("console");
// const query = require('./db/index');
async function buildDeptList() {
  const [departments] = await db.promise().query("SELECT * FROM department");
  const deptArray = departments.map((department) => ({
    name: department.name,
    value: department.id,
  }));
  return deptArray;
}

// CLI prompt
function inquire() {
  prompt([
    {
      type: "list",
      name: "options",
      message: "Please select an option from the following: ",
      choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "add a department",
        "add a role",
        "add an employee",
        "update an employee role",
        "exit",
      ],
    },
  ]).then((answer) => {
    // conditionals fuction
    const newAnswer = answer.options;
    conditional(newAnswer);
  });
}

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
  // switch (answer) {
  //   case "view all departments":
  //     viewDepts();
  //     break;

  //   case "view all roles":
  //     viewRoles();
  //     break;

  //   case "view all employees":
  //     viewEmployees();
  //     break;

  //   case "add a department":
  //     addDept();
  //     break;

  //   case "add a role":
  //     addRole();
  //     break;

  //   case "add an employee":
  //     addEmployee();
  //     break;

  //   default:
  //     break;
  // }
}

function viewDepts() {
  console.log("Depts test");
  // query sql
  db.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    console.table(results);
    inquire();
  });
}

function viewRoles() {
  db.query(
    "SELECT * FROM role LEFT JOIN department ON role.department_id = department.id",
    function (err, results) {
      if (err) throw err;
      console.table(results);
      inquire();
    }
  );
}

function viewEmployees() {
  db.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;
    console.table(results);
    inquire();
  });
}

function addDept() {
  prompt({
    type: "input",
    name: "name",
    message: "enter the name of the new department",
  }).then((answer) => {
    const department = {
      name: answer.name,
    };
    db.query(
      "INSERT INTO department SET ?",
      department,
      function (err, results) {
        if (err) throw err;
        console.log(results);
        // if the user adds a department
        if (results.affectedRows > 0) {
          viewDepts();
        } else {
          console.error("failed to add department");
          // if it fails to add to database call the inquirer
          inquire();
        }
      }
    );
  });
}

async function addRole() {
  // create an array of departments
  const [departments] = await db.promise().query("SELECT * FROM department");
  // map the departments array and set the name and id values
  const deptArray = departments.map((department) => ({
    name: department.name,
    value: department.id,
  }));
  prompt([
    {
      type: "input",
      name: "title",
      message: "enter new title",
    },
    {
      type: "input",
      name: "salary",
      message: "enter the salary",
    },
    {
      type: "list",
      name: "department_id",
      // display the departments they can choose from
      choices: deptArray,
      message: "select department from list",
    },
  ]).then((answer) => {
    console.log(answer);
    // sql query into db
    db.query("INSERT INTO role SET ?", answer, function (err, results) {
      if (err) throw err;
      console.log(results);
      // if the user adds a department
      if (results.affectedRows > 0) {
        viewRoles();
      } else {
        console.error("failed to add role");
        // if it fails to add to database call the inquirer
        inquire();
      }
    });
  });
}

async function addEmployee() {
  // create an array for the roles to choose from
  const [role] = await db.promise().query('SELECT * FROM role');
  const rolesArray = role.map((role) => ({
    id: role.id,
    title: role.title,
    salary: role.salary,
    dept_id: role.department_id,
    department: role.name
  }));

  // create an array for the manager s to choose from
  const [manager] = await db.promise().query('SELECT CONCAT(first_name, " ",last_name) FROM employee WHERE employee.manager_id = 1');
  console.log(manager);

  prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'please enter the employees first name'
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'please enter thr employees last name'
    },
    {
      type: 'list',
      name: 'role',
      choices: rolesArray,
      message: 'please select a role'
    }

  ])

  console.log("add employee");
}

function updateEmployeeRole() {
  console.log("update role");
}

// exit the prompt
function exit() {
  process.exit();
}

inquire();
