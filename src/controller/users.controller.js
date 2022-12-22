const connection = require("../database");

function getUsers(request, response) {
  let sql;
  if (request.query.username) {
    sql = `SELECT u.username, u.password, u.name, r.name AS role, u.mail, w.name AS warehouse, l.name AS location, u.active, u.warehouse_id, u.role_id, u.location_id FROM users AS u  JOIN roles AS r ON(u.role_id = r.role_id) JOIN warehouses AS w ON(u.warehouse_id = w.warehouse_id) JOIN locations AS l ON(l.location_id = u.location_id) WHERE u.username = ${request.query.username};`
  } else {
    sql = "SELECT u.username, u.password, u.name, r.name AS role, u.mail, w.name AS warehouse, l.name AS location, u.active, u.warehouse_id, u.role_id, u.location_id FROM users AS u  JOIN roles AS r ON(u.role_id = r.role_id) JOIN warehouses AS w ON(u.warehouse_id = w.warehouse_id) JOIN locations AS l ON(l.location_id = u.location_id);";
  }
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
      console.log(result);
    }
  });
}

const login = (request, response) => {
  let sql = `SELECT * FROM users WHERE username = \"${request.body.username}\" AND password = \"${request.body.password}\"`;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
      console.log(result);
    }
  });
}

const postUsers = (request, response) => {

  console.log(request.body)
  let params = [
    request.body.username,
    request.body.password,
    request.body.name,
    request.body.role_id,
    request.body.mail,
    request.body.warehouse_id,
    request.body.location_id,
    request.body.active,
  ];
  // let sql =
  //   "INSERT INTO `users` (`username`, `password`, `name`, `role_id`, `mail`, `warehouse_id`, `location_id`, `active`) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
  connection.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
      console.log(result);
    }
  });
};

module.exports = { getUsers, login, postUsers };
