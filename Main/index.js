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
}

function viewDepts() {
  log("Viewing Departments");
  // query sql
  db.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    console.table(results);
    inquire();
  });
}

function viewRoles() {
  log("Viewing Roles");
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
  //  employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers
  // manager first name last name
  log("Viewing Employees");
  db.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id JOIN employee manager ON manager.id = employee.manager_id", function (err, results) {
    if (err) throw err;
    console.table(results);
    inquire();
  });
}

function addDept() {
  log("Adding Department");
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
  log("Adding Role");
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
  log("Adding Employee");
  // create an array for the roles to choose from
  const [role] = await db.promise().query('SELECT title, id FROM role');
  const rolesArray = role.map((role) => ({
    name: role.title,
    value: role.id
  }));

  // create an array for the managers to choose from
  const [manager] = await db.promise().query('SELECT first_name, last_name, id FROM employee');
  const managerArray = manager.map((manager) => ({
    name : `${manager.first_name} ${manager.last_name}`,
    value: manager.id
  }))

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
      name: 'role_id',
      choices: rolesArray,
      message: 'please select a role'
    },
    {
      type: 'list',
      name: 'manager_id',
      choices: managerArray,
      message: 'please select a manager'
    }

  ]).then((answer) => {
    console.log(answer);
    // sql query into db
    db.query("INSERT INTO employee SET ?", answer, function (err, results) {
      if (err) throw err;
      console.log(results);
      // if the user adds a department
      if (results.affectedRows > 0) {
        viewEmployees();
        console.log("added employee");
      } else {
        console.error("failed to add employee");
        // if it fails to add to database call the inquirer
        inquire();
      }
    });
  });

}

async function updateEmployeeRole() {
  log("Updating Employee Role");
  const [employee] = await db.promise().query('SELECT first_name, last_name, id FROM employee');
  console.log(employee);
  const employeeArray = manager.map((manager) => ({
    name : `${employee.first_name} ${employee.last_name}`,
    value: employee.id
  }))
  prompt([
    {
      type: 'list',
      name: 'id',
      choices: employeeArray,
      message: 'please select an employee to update'
    }
  ])
  console.log("update role");
}

// exit the prompt
function exit() {
  process.exit();
}

inquire();
