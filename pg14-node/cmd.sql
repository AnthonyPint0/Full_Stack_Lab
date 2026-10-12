CREATE DATABASE college;
USE college;

CREATE TABLE students (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(50),
    marks INT
);

INSERT INTO students VALUES
(1, 'Arun', 'CSE', 85),
(2, 'Priya', 'ECE', 90),
(3, 'Rahul', 'IT', 75);