INSERT INTO Users(username,password) VALUES ('joaobarata',1234),('diogoleandro',1234),('tiagomatias',1234),('josesilva',1234),('andresilva',1234),('andremartins',1234),('joaquimferreira',1234),('testes',1234),('xpto',1234),('admin',1234);
INSERT INTO Roles(role,parent_role) VALUES ('admin',Null),('developer',1),('DBdeveloper',2),('User',1),('WebDesigner',2);
INSERT INTO Users_Roles(user_id,role_id,start_date,end_date,updater,active) VALUES(10,1,'2020-04-9 02:55:05',NULL,10,1),(1,2,'2020-04-9 02:55:05',NULL,10,1),(2,2,'2020-04-9 02:55:05',NULL,10,1),(3,2,'2020-04-9 02:55:05',NULL,10,1),(4,3,'2019-04-9 02:55:05','2020-04-9 02:55:05',10,1);
INSERT INTO Lists(user_id,LIST,start_date,end_date,updater,active) VALUES (5,'BlackList','2020-04-9 02:55:05','2020-06-9 02:55:05',10,1),(6,'GreyList','2020-04-9 02:55:05','2020-06-9 02:55:05',10,1);
INSERT INTO Permission(method,path) VALUES ('GET','/backoffice'),('POST','/backoffice'),('GET','/user');
INSERT INTO Roles_Permission VALUES (1,1),(1,2);