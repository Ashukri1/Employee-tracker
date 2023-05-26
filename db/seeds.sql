INSERT INTO employee (first_name, last_name, job_title, manager_id)
VALUES ("Steph", "Fajardo", "Salesperson", 5),
       ("Juba", "Diani", "Lead Engineer", 4),
       ("Quiping", "Yu", "Account Manager", 3),
       ("Manasa", "Gopal", "Lawyer", 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (001, "Salesperson", 50000, 1),
       (003, "Lead Engineer", 100000, 2),
       (004, "Account Manager", 120000, 3),
       (005, "Lawyer", 300000, 4);

INSERT INTO department (id, department_name)
VALUES (001, "Sales"),
       (002, "Engineering"),
       (003, "Finance"),
       (004, "Legal");
