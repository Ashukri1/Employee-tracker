const inquirer = require("inquirer");
const mysql = require('mysql2');
const cTable = require('console.table');

// Connect to the database
const company_db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'company_db'
});

// Prompt questions
const optionsQ = [
  {
    type: 'list',
    message: "Select an option from the menu:",
    choices: [
      "View departments",
      "View roles",
      "View employees",
      "Add a new department",
      "Add a new role",
      "Add a new employee",
      "Update an employee's job title",
      "Exit"
    ],
    name: 'menuOptions',
  },
];

const departmentQ = [
  {
    type: 'input',
    message: 'Enter the name of the new department:',
    name: 'newDepartment',
  },
];

const roleQ = [
  {
    type: 'input',
    message: 'Enter the title of the new role:',
    name: 'roleTitle',
  },
  {
    type: 'input',
    message: 'Enter the salary for the new role:',
    name: 'roleSalary',
  },
  {
    type: 'list',
    message: 'Select the department ID for the new role:',
    choices: ['001', '002', '003', '004', '005', '006', '007', '008'],
    name: 'deptId',
  },
];

const employeeQ = [
  {
    type: 'input',
    message: "Enter the employee's first name:",
    name: 'firstName',
  },
  {
    type: 'input',
    message: "Enter the employee's last name:",
    name: 'lastName',
  },
  {
    type: 'input',
    message: "Enter the employee's job title:",
    name: 'jobTitle',
  },
  {
    type: 'input',
    message: "Enter the employee's manager ID:",
    name: 'managerId',
  },
  {
    type: 'list',
    message: 'Select the role ID for the new employee:',
    choices: ['225', '325', '425', '525', '625', '725', '825', '925'],
    name: 'roleId',
  },
];

const updateQ = [
  {
    type: 'input',
    message: "Enter the employee's ID number:",
    name: 'idNumber',
  },
  {
    type: 'input',
    message: "Enter the employee's new job title:",
    name: 'updateTitle',
  },
];

// Prompt user for the next action
const promptUser = () => {
  inquirer.prompt(optionsQ).then((data) => {
    switch (data.menuOptions) {
      case 'View departments':
        viewDepartments();
        break;
      case 'View roles':
        viewRoles();
        break;
      case 'View employees':
        viewEmployees();
        break;
      case 'Add a new department':
        addDepartment();
        break;
      case 'Add a new role':
        addRole();
        break;
      case 'Add a new employee':
        addEmployee();
        break;
      case "Update an employee's job title":
        updateJobTitle();
        break;
      case 'Exit':
        console.log('Goodbye!');
        company_db.end();
        return;
    }
  });
};

// View all departments
const viewDepartments = () => {
  company_db.query('SELECT * FROM department', (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table('Departments', results);
    promptUser();
  });
};

// View all roles
const viewRoles = () => {
  company_db.query('SELECT * FROM role', (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table('Roles', results);
    promptUser();
  });
};

// View all employees
const viewEmployees = () => {
  company_db.query('SELECT * FROM employee', (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table('Employees', results);
    promptUser();
  });
};

// Add a new department
const addDepartment = () => {
  inquirer.prompt(departmentQ).then((data) => {
    company_db.query(
      `INSERT INTO department (department_name) VALUES ("${data.newDepartment}")`,
      (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(`${data.newDepartment} has been added to the database!\n`);
        promptUser();
      }
    );
  });
};

// Add a new role
const addRole = () => {
  inquirer.prompt(roleQ).then((data) => {
    company_db.query(
      `INSERT INTO role (title, salary, department_id) VALUES ("${data.roleTitle}", "${data.roleSalary}", "${data.deptId}")`,
      (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(`${data.roleTitle} has been added to the database!\n`);
        promptUser();
      }
    );
  });
};

// Add a new employee
const addEmployee = () => {
  inquirer.prompt(employeeQ).then((data) => {
    company_db.query(
      `INSERT INTO employee (first_name, last_name, job_title, role_id, manager_id) VALUES ("${data.firstName}", "${data.lastName}", "${data.jobTitle}", "${data.roleId}", "${data.managerId}")`,
      (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(`${data.firstName} ${data.lastName} has been added to the database!\n`);
        promptUser();
      }
    );
  });
};

// Update an employee's job title
const updateJobTitle = () => {
  inquirer.prompt(updateQ).then((data) => {
    company_db.query(
      `UPDATE employee SET job_title = "${data.updateTitle}" WHERE id = "${data.idNumber}"`,
      (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(`Congratulations! The job title has been updated to ${data.updateTitle}!\n`);
        promptUser();
      }
    );
  });
};

// Start the application
console.log('=== Employee Management System ===\n');
promptUser();
