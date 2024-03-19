# Database Modellering for Drømtorp VGS

This document describes the database model.

## Tabeller

We're using **Relational Database Management System (RDBMS)** to store references to entries in other tables.



### students

The students.

| field       | value                          |
| :---------- | :----------------------------- |
| id          | INT PRIMARY_KEY AUTO_INCREMENT |
| username    | VARCHAR(32)                    |
| password    | VARCHAR(128) ENCRYPTED         |
| name        | VARCHAR(32)                    |
| middle_name | VARCHAR(32)                    |
| last_name   | VARCHAR(32)                    |
| class       | FOREIGN_KEY - classes          |
| phone       | INT(8)                         |
| guardian    | FOREIGN KEY - guardians        |



### teachers

The teachers.

| field       | value                          |
| :---------- | :----------------------------- |
| id          | INT PRIMARY_KEY AUTO_INCREMENT |
| password    | VARCHAR(128) ENCRYPTED         |
| name        | VARCHAR(32)                    |
| middle_name | VARCHAR(32)                    |
| last_name   | VARCHAR(32)                    |
| phone       | INT(8)                         |



### equipment

The equipment.

| field | value                          |
| :---- | :----------------------------- |
| id    | INT PRIMARY_KEY AUTO_INCREMENT |
| name  | VARCHAR(64)                    |
| type  | VARCHAR(64)                    |



### equipment_loan_requests

Loan requests.

| field        | value                          |
| :----------- | :----------------------------- |
| id           | INT PRIMARY_KEY AUTO_INCREMENT |
| student      | FOREIGN_KEY - student          |
| request_date | INT                            |



### equipment_loans

Active loans.

| field       | value                          |
| :---------- | :----------------------------- |
| id          | INT PRIMARY_KEY AUTO_INCREMENT |
| student     | FOREIGN_KEY - students         |
| equipment   | FOREIGN_KEY - equipment        |
| loan_date   | INT                            |
| return_date | INT                            |
| approver    | FOREIGN_KEY - teachers         |



### equipment_previous_loans

Loan history.

| field       | value                          |
| :---------- | :----------------------------- |
| id          | INT PRIMARY_KEY AUTO_INCREMENT |
| student     | FOREIGN_KEY - students         |
| equipment   | FOREIGN_KEY - equipment        |
| loan_date   | INT                            |
| return_date | INT                            |
| approver    | FOREIGN_KEY - teachers         |



### guardians

Guardians of the students.

| field       | value                          |
| :---------- | :----------------------------- |
| id          | INT PRIMARY_KEY AUTO_INCREMENT |
| student     | FOREIGN_KEY - students         |
| equipment   | FOREIGN_KEY - equipment        |
| loan_date   | INT                            |
| return_date | INT                            |
| approver    | FOREIGN_KEY - teachers         |



### guardians

Guardians of the students.

| field       | value                          |
| :---------- | :----------------------------- |
| id          | INT PRIMARY_KEY AUTO_INCREMENT |
| student     | FOREIGN_KEY - students         |
| equipment   | FOREIGN_KEY - equipment        |
| loan_date   | INT                            |
| return_date | INT                            |
| approver    | FOREIGN_KEY - teachers         |