const connection = require("../database");

const getWarehouses = (request, response) => {

  let sql =
    "SELECT w.warehouse_id ,w.name, l.name AS location, w.location_id FROM railway.warehouses AS w INNER JOIN locations AS l ON(l.location_id = w.location_id);";
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
      console.log(result);
    }
  });
}

const postWarehouses = (request, response) => {

  let params = [request.body.name, request.body.location_id];
  let sql = `INSERT INTO railway.warehouses (name, location_id) VALUES (?, ?)`;
  connection.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
      console.log(result);
    }
  });
}

const putWarehouses = (request, response) => {
  let params = [request.body.name, request.body.location_id]
  let sql = `UPDATE railway.warehouses
    SET
    name = COALESCE(?, name),
    location_id = COALESCE(?, location_id)`;
  connection.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
      console.log(result);
    }
  });
}

const deleteWarehouses = (request, response) => {
  let sql = `DELETE FROM railway.warehouses WHERE warehouse_id = ${request.body.warehouse_id}`;
  connection.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
      console.log(result);
    }
  });
}

module.exports = { getWarehouses, postWarehouses, putWarehouses, deleteWarehouses };
