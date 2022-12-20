const connection = require("../database");

function getUsers(request, response) {
  let sql = "SELECT u.username, u.password, u.name, r.name AS role, u.mail, w.name AS warehouse, l.name AS location, u.active From users AS u INNER JOIN roles AS r ON(u.role_id = r.role_id)  INNER JOIN warehouses AS w ON(u.warehouse_id = w.warehouse_id) INNER JOIN locations AS l ON(l.location_id = u.location_id);";
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
      console.log(result);
    }
  });
}

const login = (req, res) => {
  let sql = `SELECT username, password FROM users WHERE username = ${req.body.username} AND password = ${req.body.password}`;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
      console.log(result);
    }
  });
}
module.exports = { getUsers, login };
