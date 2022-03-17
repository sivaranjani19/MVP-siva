const mysql = require('mysql2');
const mysqlConfig = require('./config.js');
const connection = mysql.createConnection(mysqlConfig);
connection.connect();
console.log('Database connected');

const getAllRooms = function(req, res) {
  console.log('GET REQUEST');
  var qryStr = `select * from roomInfo`;
  connection.query(qryStr, (error, data)=> {
    if (error) {
      console.log(error);
      res.status(404).send(error);
    } else {
      console.log('DATA ', data);
      res.status(200).send(data);
    }
  });
};
const getAllRoomAndBooked = function(req, res) {
  console.log('GET REQUEST');
  var qryStr = `select roomNumber, booked from roomInfo`;
  connection.query(qryStr, (error, data)=> {
    if (error) {
      console.log(error);
      res.status(404).send(error);
    } else {
      console.log('DATA ', data);
      res.status(200).send(data);
    }
  });
};
const bookRooms = function(req, res) {
  var qryStr = `UPDATE  roomInfo SET name=?,
   phoneNum=?,
   email=?,
   booked=1
   WHERE roomNumber=? and booked = 0`;
  var qryArg = [req.body.name, req.body.phoneNum, req.body.email, req.body.roomNumber];
  connection.query(qryStr, qryArg, (error, data)=> {
    if (error) {
      console.log(error);
      res.status(404).send(error);
    } else {
      console.log('Data = ', data);
      res.status(200).send(data);
    }
  });

};
const vacateRooms = function(req, res) {
  var qryStr = `UPDATE  roomInfo SET name="",
  phoneNum=0,
  email="",
   booked=0
   WHERE roomNumber=? and booked = 1`;
  var qryArg = [req.body.roomNumber];
  connection.query(qryStr, qryArg, (error, data)=> {
    if (error) {
      console.log(error);
      res.status(404).send(error);
    } else {
      console.log('Data = ', data);
      res.status(200).send(data);
    }
  });

};
module.exports = {
  getAllRoomAndBooked, bookRooms, getAllRooms, vacateRooms
};