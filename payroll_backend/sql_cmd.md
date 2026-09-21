CREATE DATABASE payroll_db;

USE payroll_db;

CREATE TABLE employees (
empid VARCHAR(20) PRIMARY KEY,
name VARCHAR(50),
basic_pay DECIMAL(10,2),
da DECIMAL(10,2),
hra DECIMAL(10,2),
epf DECIMAL(10,2),
loan DECIMAL(10,2),
professional_tax DECIMAL(10,2),
gross_pay DECIMAL(10,2),
net_pay DECIMAL(10,2)
);
