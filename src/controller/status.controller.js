const connection = require("../database");

const getStatus = (request, response) => {
    let sql = "SELECT * FROM status";
    connection.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        response.send(result);
        console.log(result);
      }
    });
};

const putStatus = (request, response) => {
    console.log(request.body)
    let params = [
      request.body.status_id,
      request.body.incidence_ref,
      request.body.warehouse_id,
    ];
  let sql =
    "UPDATE `incidence` SET `status_id` = ? WHERE (`incidence_ref` = ? AND `warehouse_id` = ?);";
  connection.query(sql, params, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
      console.log(result);
    }
  });
};



module.exports = { getStatus, putStatus};
