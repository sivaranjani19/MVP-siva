const express = require("express");
const db = require("../database-mysql");
const databaseUtil = require("../database-mysql/index.js");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/../client/dist"));


app.get("/api/allrooms", (req, res) => {
  databaseUtil.getAllRooms(req, res);
});
// app.get("/api/rooms", (req, res) => {
//   databaseUtil.getAllRoomAndBooked(req, res);
// });
app.put("/api/book", (req, res) => {
    databaseUtil.bookRooms(req, res);
  });
  app.put("/api/vacate", (req, res) => {
    databaseUtil.vacateRooms(req, res);
  });

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

