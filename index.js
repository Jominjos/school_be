const express = require("express");
const app = express();
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

const db = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBDATABASE,
  port: process.env.DBPORT,
});

db.connect((err) => {
  if (err) {
    throw err;
  } else console.log("mysql connecte");
});

//get all students
app.get("/api/students", (req, res) => {
  const q = "SELECT * FROM students";
  db.query(q, (err, data) => {
    res.json({ data, err });
  });
});

app.post("/api/student", (req, res) => {
  console.log(req.body);
  let [name, stu_id, stu_class] = [
    req.body.name,
    req.body.stu_id,
    req.body.stu_class,
  ];
  //hi
  const q = "INSERT INTO students ( name, stu_id, stu_class) VALUES (?,?,?)";
  db.query(q, [name, stu_id, stu_class], (err, data) => {
    res.json({ err, data });
  });
});

app.put("/api/student", (req, res) => {
  const sql =
    "UPDATE students SET name = ?,stu_id=?, stu_class = ? WHERE id = ?";

  db.query(
    sql,
    [req.body.name, req.body.stu_id, req.body.stu_class, req.body.id],
    (err, data) => {
      res.json({ data, err });
    }
  );
});

app.delete("/api/student", (req, res) => {
  console.log(req.body);
  const q = `DELETE FROM students WHERE id=${req.body.id}`;
  db.query(q, (err, data) => {
    res.json({ err, data });
  });
});

const port = process.env.PORT || 7001;
app.listen(port, () => {
  console.log(`server is listening on port`);
});
