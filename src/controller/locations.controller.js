const connection = require("../database");

function getLocations(request, response) {

  let sql = "SELECT * FROM railway.locations;";
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
      console.log(result);
    }
  });
}

const postLocations = (request, response) => {

  let params = [request.body.name];
  let sql = `INSERT INTO railway.locations (name) VALUES (?)`;
  connection.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
      console.log(result);
    }
  });
}

const putLocations = (request, response) => {
  let params = [request.body.name]
  let sql = `UPDATE warehouses
    SET
    name = COALESCE(?, name)`;
  connection.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
      console.log(result);
    }
  });
}

const deleteLocations = (request, response) => {
  let sql = `DELETE FROM warehouses WHERE location_id = ${request.body.location_id}`;
  connection.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
      console.log(result);
    }
  });
}
module.exports = { getLocations, postLocations, putLocations, deleteLocations };
