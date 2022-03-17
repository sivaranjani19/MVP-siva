DROP DATABASE IF EXISTS rooms;

CREATE DATABASE rooms;

USE rooms;
DROP table IF EXISTS roomInfo;
CREATE TABLE roomInfo (
  id int NOT NULL AUTO_INCREMENT,
  roomNumber int NOT NULL UNIQUE,
  name varchar(25) NOT NULL ,
  phoneNum BIGINT NOT NULL,
  email nvarchar(255),
  booked int,
  PRIMARY KEY (ID)
);
INSERT INTO roomInfo (id, roomNumber, name, phoneNum, email,booked) VALUES (1, 100, "siva", 4089170443, "siva@gmail.com",1);
INSERT INTO roomInfo (id, roomNumber, name, phoneNum, email,booked) VALUES (2, 101, "sadeesh", 40859483745, "sadeesh@gmail.com",1);
INSERT INTO roomInfo (id, roomNumber, name, phoneNum, email,booked) VALUES (3, 102, "",0, "",0);
INSERT INTO roomInfo (id, roomNumber, name, phoneNum, email,booked) VALUES (4, 103, "",0, "",0);
INSERT INTO roomInfo (id, roomNumber, name, phoneNum, email,booked) VALUES (5, 104, "",0, "",0);
INSERT INTO roomInfo (id, roomNumber, name, phoneNum, email,booked) VALUES (6, 105, "",0, "",0);
INSERT INTO roomInfo (id, roomNumber, name, phoneNum, email,booked) VALUES (7, 106, "",0, "",0);