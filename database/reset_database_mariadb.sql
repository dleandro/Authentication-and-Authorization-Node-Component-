DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS Users_Sessions;
DROP TABLE IF EXISTS Roles_Permission ;
DROP TABLE IF EXISTS Users_Roles;
DROP TABLE IF EXISTS Lists;
DROP TABLE IF EXISTS Users_History;
DROP TABLE IF EXISTS IDP;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Roles;
DROP TABLE IF EXISTS Permission;
DROP TABLE IF EXISTS Protocols;

CREATE TABLE Permissions(
id int AUTO_INCREMENT ,
method VARCHAR(10),
path VARCHAR(50),
description Varchar(100),
PRIMARY KEY(id)
);

CREATE TABLE Roles(
id INT AUTO_INCREMENT,
role VARCHAR(20) UNIQUE,
parent_role INT,
PRIMARY KEY(id)
);

CREATE TABLE Users(
id int AUTO_INCREMENT,
username VARCHAR(30) UNIQUE,
PASSWORD VARCHAR(20),
PRIMARY KEY(id)
);

CREATE TABLE Roles_Permissions(
role INT ,
permission INT,
PRIMARY KEY(role,permission),
FOREIGN KEY (role) REFERENCES Roles(id),
FOREIGN KEY (permission) REFERENCES Permission(id)
);
 
CREATE TABLE Users_Roles(
id INT AUTO_INCREMENT,
user_id INT,
role_id INT,
start_date DATETIME,
end_date DATETIME,
updater INT,
active BIT(1),
PRIMARY KEY (id),
FOREIGN KEY (user_id) REFERENCES Users(id),
FOREIGN KEY (role_id) REFERENCES Roles(id)
);
CREATE TABLE Lists(
id INT AUTO_INCREMENT,
user_id INT ,
LIST VARCHAR(20),
start_date DATETIME,
end_date DATETIME ,
updater INT,
active BIT(1),
PRIMARY KEY(id),
FOREIGN KEY (user_id) REFERENCES Users(id)
);
CREATE TABLE Users_Histories (
user_id INT,
DATE DATETIME,
description VARCHAR(1000)
);
CREATE TABLE idps(
user_id INT,
idp_id VARCHAR(20000),
idpname VARCHAR(20),
PRIMARY KEY(user_id),
FOREIGN KEY(user_id) REFERENCES Users(id)
);
CREATE TABLE Users_Sessions(
user_id INT,
session_id VARCHAR(128),
FOREIGN KEY (user_id) REFERENCES Users(id),
PRIMARY KEY(user_id,session_id)
);
CREATE TABLE Protocols(
protocol VARCHAR(100),
active BIT(1),
PRIMARY KEY(protocol)
);

INSERT INTO Protocols ("Google", 1);
INSERT INTO Protocols ("AzureAD", 1);
INSERT INTO Protocols ("Saml", 1);