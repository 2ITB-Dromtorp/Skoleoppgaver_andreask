# Database Modellering for Drømtorp VGS

Dette dokumentet beskriver modelleringen av en database for Drømtorp videregående skole basert på kravene gitt.

## Tabeller

Vi bruker **Relational Database Management System (RDBMS)** til å lagre referanser til andre verdier mellom tabeller.



### students
| field       | value                                  |
| :---------- | :------------------------------------- |
| id          | INT PRIMARY_KEY AUTO_INCREMENT |
| username    | VARCHAR(32)                        |
| password    | VARCHAR(128) ENCRYPTED           |
| name        | VARCHAR(32)                        |
| middle_name | VARCHAR(32)                        |
| last_name   | VARCHAR(32)                        |
| class       | FOREIGN_KEY                        |
| phone       | INT(8)                             |
| guardian    | FOREIGN KEY                        |



### teachers

| field       | value                                  |
| :---------- | :------------------------------------- |
| id          | INT PRIMARY_KEY AUTO_INCREMENT |
| password    | VARCHAR(128) ENCRYPTED           |
| name        | VARCHAR(32)                        |
| middle_name | VARCHAR(32)                        |
| last_name   | VARCHAR(32)                        |
| phone       | INT(8)                             |



### equipment

| field | value                                  |
| :---- | :------------------------------------- |
| id    | INT PRIMARY_KEY AUTO_INCREMENT |
| name  | VARCHAR(64)                        |
| type  | VARCHAR(64)                        |



### equipment_loan_requests

| field        | value                                  |
| :----------- | :------------------------------------- |
| id           | INT PRIMARY_KEY AUTO_INCREMENT |
| student      | FOREIGN_KEY                        |
| request_date | INT                                |



### equipment_loans

| field       | value                                  |
| :---------- | :------------------------------------- |
| id          | INT PRIMARY_KEY AUTO_INCREMENT |
| student     | FOREIGN_KEY - students             |
| equipment   | FOREIGN_KEY - equipment            |
| loan_date   | INT                                |
| return_date | INT                                |
| approver    | FOREIGN_KEY                        |



### equipment_previous_loans

| field       | value                                  |
| :---------- | :------------------------------------- |
| id          | INT PRIMARY_KEY AUTO_INCREMENT |
| student     | FOREIGN_KEY - students             |
| equipment   | FOREIGN_KEY - equipment            |
| loan_date   | INT                                |
| return_date | INT                                |
| approver    | FOREIGN_KEY - teachers             |