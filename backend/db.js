import mysql from "mysql"

export const db=mysql.createConnection({
    host:"localhost",
    user:"Company",
    password: "Company@123",
    database:"monitrix"

})
db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected");
});

