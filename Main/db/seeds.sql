-- Departments
INSERT INTO department (name)
 VALUES ('Engineering'),
        ('Finance'),
        ('Legal'),
        ('Sales');

-- Roles
INSERT INTO role (title, salary, department_id) 
VALUES ('Sales Lead', 100000, 4),
        ('Salesperson', 80000, 4),
        ('Lead Engineer', 150000, 1),
        ('Software Engineer', 120000, 1),
        ('Account Manager', 160000, 2),
        ('Accountant', 125000, 2),
        ('Lawyer', 190000, 3),
        ('Legal Team Lead', 250000, 3);

-- Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Percy', 'Jackson', 1, NULL),
        ('Barrack', 'Obama', 1, 1),
        ('Stephen', 'King', 3, NULL),
        ('Lucifer', 'Morningstar', 4, 1),
        ('John', 'Wick', 3, 1),
        ('Will', 'Hunting', 4, 1);