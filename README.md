# Full Stack Lab

A collection of front-end and full-stack practice projects built with vanilla JavaScript, React, Express, and MySQL.

## Repository Contents

### Vanilla JavaScript exercises

The `pg*.html` files are standalone browser exercises. Open them directly in a browser to run them.

| File       | Exercise                                       |
| ---------- | ---------------------------------------------- |
| `pg1.html` | Dynamic list with add, delete, and item count  |
| `pg2.html` | Factorial using recursion                      |
| `pg3.html` | Fibonacci series using recursion               |
| `pg4.html` | Age calculator                                 |
| `pg5.html` | Number-system converter                        |
| `pg6.html` | Arithmetic calculator using event listeners    |
| `pg7.html` | Arithmetic calculator using a JavaScript class |

### React applications

Each React project is an independent Vite application with its own `package.json`.

| Project             | Description                                                |
| ------------------- | ---------------------------------------------------------- |
| `arithmetic-react`  | Add, subtract, multiply, and divide two numbers            |
| `fibonacci-react`   | Calculate factorials and generate Fibonacci terms          |
| `simple-crud-react` | In-memory user create, read, update, and delete operations |
| `mark-list-react`   | Student mark-list UI connected to the Express API          |
| `payroll_react`     | Employee payroll UI connected to the payroll API           |

### Backend

`mark-list-backend` provides an Express API backed by MySQL. It calculates each student's result, CGPA, and grade from five subject marks.

`payroll_backend` provides an Express API backed by MySQL for employee records. It calculates DA, HRA, EPF, loan deductions, professional tax, gross pay, and net pay.

## Prerequisites

- Node.js and npm
- MySQL Server for the mark-list and payroll applications

## Running a React application

From the repository root, choose an application and run:

```bash
cd arithmetic-react
npm install
npm run dev
```

Replace `arithmetic-react` with `fibonacci-react`, `simple-crud-react`, or `mark-list-react` as needed. Vite will print the local URL, usually `http://localhost:5173`.

Useful scripts available in each React project:

```bash
npm run dev      # Start the Vite development server
npm run build    # Create a production build
npm run lint     # Run ESLint
npm run preview  # Preview the production build
```

## Running the mark-list application

1. Create the MySQL database and table expected by the backend:

```sql
CREATE DATABASE studentdb;
USE studentdb;

CREATE TABLE students (
	regno VARCHAR(50) PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	sub1 INT NOT NULL,
	sub2 INT NOT NULL,
	sub3 INT NOT NULL,
	sub4 INT NOT NULL,
	sub5 INT NOT NULL,
	result VARCHAR(10),
	cgpa DECIMAL(3, 1),
	grade VARCHAR(2)
);
```

2. Update the MySQL connection settings in `mark-list-backend/server.js` if your local credentials differ from the defaults (`root` / `root`).

3. Start the API:

```bash
cd mark-list-backend
npm install
npm start
```

The API runs at `http://localhost:5000`.

4. In a separate terminal, start the React client:

```bash
cd mark-list-react
npm install
npm run dev
```

### Mark-list API endpoints

| Method   | Endpoint           | Purpose           |
| -------- | ------------------ | ----------------- |
| `GET`    | `/students`        | List all students |
| `POST`   | `/students`        | Add a student     |
| `PUT`    | `/students/:regno` | Update a student  |
| `DELETE` | `/students/:regno` | Delete a student  |

## Running the payroll application

1. Create the MySQL database and table expected by the backend:

```sql
CREATE DATABASE payroll_db;
USE payroll_db;

CREATE TABLE employees (
	empid VARCHAR(50) PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	basic_pay DECIMAL(10, 2) NOT NULL,
	da DECIMAL(10, 2),
	hra DECIMAL(10, 2),
	epf DECIMAL(10, 2),
	loan DECIMAL(10, 2),
	professional_tax DECIMAL(10, 2),
	gross_pay DECIMAL(10, 2),
	net_pay DECIMAL(10, 2)
);
```

2. Update the MySQL connection settings in `payroll_backend/server.js` if your local credentials differ from the defaults (`root` / `root`).

3. Start the payroll API:

```bash
cd payroll_backend
npm install
npm start
```

The payroll API runs at `http://localhost:5000`.

4. In a separate terminal, start the React client:

```bash
cd payroll_react
npm install
npm run dev
```

### Payroll API endpoints

| Method   | Endpoint            | Purpose            |
| -------- | ------------------- | ------------------ |
| `GET`    | `/employees`        | List all employees |
| `POST`   | `/employees`        | Add an employee    |
| `PUT`    | `/employees/:empid` | Update an employee |
| `DELETE` | `/employees/:empid` | Delete an employee |

Both backend projects default to port 5000. Run only one backend at a time, or change the port in one backend's `app.listen` call and update the matching React API URLs.

## Project Structure

```text
Full_Stack_Lab/
├── pg1.html ... pg7.html       # Vanilla JavaScript exercises
├── arithmetic-react/            # React arithmetic calculator
├── fibonacci-react/             # React factorial/Fibonacci app
├── simple-crud-react/           # React in-memory CRUD app
├── mark-list-react/             # React mark-list client
├── mark-list-backend/           # Student marks Express/MySQL API
├── payroll_react/               # React payroll client
└── payroll_backend/             # Employee payroll Express/MySQL API
```
