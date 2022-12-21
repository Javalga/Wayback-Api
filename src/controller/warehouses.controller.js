const connection = require("../database");

function getWarehouses(request, response) {
  
  let sql = "SELECT w.warehouse_id ,w.name, l.name AS location, w.location_id FROM warehouses AS w INNER JOIN locations AS l ON(l.location_id = w.location_id);";
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
      console.log(result);
    }
  });
}

function postWarehouses(request, response){

  let params = [];
  let sql =
    "SELECT w.warehouse_id ,w.name, l.name AS location FROM warehouses AS w INNER JOIN locations AS l ON(l.location_id = w.location_id);";
  connection.query(sql,params, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
      console.log(result);
    }
  });
}

module.exports = { getWarehouses, postWarehouses };
