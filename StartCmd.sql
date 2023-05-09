CREATE DATABASE employees;

CREATE TABLE employees(
ID INT PRIMARY KEY NOT NULL,
NAME TEXT NOT NULL,
AGE INT NOT NULL,
ADDRESS CHAR(50),
SALARY REAL
);  

INSERT INTO employees(  
ID, NAME, AGE, ADDRESS, SALARY)  
VALUES (1, 'Marcos', 25, 'Brazil', 6500.00 );


delete from employees where <conditions>

update employees set NAME="Marcos",AGE=25 where <conditions>