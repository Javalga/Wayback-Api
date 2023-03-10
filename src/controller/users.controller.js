const connection = require("../database");

function getUsers(request, response) {
  let sql;
  if (request.query.username) {
    sql = `SELECT u.username, u.password, u.name, r.name AS role, u.mail, w.name AS warehouse, l.name AS location, u.active, u.warehouse_id, u.role_id, u.location_id FROM users AS u INNER JOIN roles AS r ON(u.role_id = r.role_id) LEFT JOIN warehouses AS w ON(u.warehouse_id = w.warehouse_id) LEFT JOIN locations AS l ON(l.location_id = u.location_id) WHERE u.username = "${request.query.username}" `;
  } else {
    sql =
      "SELECT u.username, u.password, u.name, r.name AS role, u.mail, w.name AS warehouse, l.name AS location, u.active, u.warehouse_id, u.role_id, u.location_id FROM users AS u INNER JOIN roles AS r ON(u.role_id = r.role_id) LEFT JOIN warehouses AS w ON(u.warehouse_id = w.warehouse_id) LEFT JOIN locations AS l ON(l.location_id = u.location_id) ";
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

function getAdminToRecoverPassword(request, response) {
  let sql = `SELECT u.username, u.password, u.name, r.name AS role, u.mail, w.name AS warehouse, l.name AS location, u.active, u.warehouse_id, u.role_id, u.location_id FROM users AS u INNER JOIN roles AS r ON(u.role_id = r.role_id) LEFT JOIN warehouses AS w ON(u.warehouse_id = w.warehouse_id) LEFT JOIN locations AS l ON(l.location_id = u.location_id) WHERE u.location_id = ${request.query.location_id} AND u.role_id = 2 AND u.active = 1`;
  
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
  let sql = `SELECT u.user_id, u.username, u.password, u.name, u.role_id, u.mail, u.warehouse_id, u.location_id, u.active, r.name AS role, w.name AS warehouse, l.name AS location FROM users AS u 
  LEFT JOIN roles AS r ON(u.role_id = r.role_id)
  LEFT JOIN locations AS l ON(u.location_id = l.location_id)
  LEFT JOIN warehouses AS w ON(u.warehouse_id = w.warehouse_id) WHERE username = \"${request.body.username}\" AND password = \"${request.body.password}\"`;
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

  console.log("funciono")
  
  let sql =
    "INSERT INTO `users` (`username`, `password`, `name`, `role_id`, `mail`, `warehouse_id`, `location_id`, `active`) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";

  connection.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
      console.log(result);
    }
  });
};

const putUser = (request, response) => {
  let params = [
    request.body.password,
    request.body.name,
    request.body.role_id,
    request.body.mail,
    request.body.warehouse_id,
    request.body.location_id,
    request.body.active,
    request.body.username,
  ];

  console.log("funciono");

  let sql =
    "UPDATE `users` SET `password` = ?, `name` = ?, `role_id` = ?, `mail` = ?, `warehouse_id` = ?, `location_id` = ?, `active` = ? WHERE (`username` = ?);";

  connection.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
      console.log(result);
    }
  });
};

module.exports = {
  getUsers,
  login,
  postUsers,
  putUser,
  getAdminToRecoverPassword,
};
