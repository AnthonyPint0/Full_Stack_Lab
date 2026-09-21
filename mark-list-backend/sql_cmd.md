CREATE DATABASE studentdb;
USE studentdb;

CREATE TABLE students (
regno VARCHAR(20) PRIMARY KEY,
name VARCHAR(50),
sub1 INT,
sub2 INT,
sub3 INT,
sub4 INT,
sub5 INT,
result VARCHAR(10),
cgpa DECIMAL(4,2),
grade VARCHAR(5)
);
