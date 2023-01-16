const connection = require("../database");

function getDelivery_time(request, response) {
  let sql = "SELECT * FROM railway.delivery_time;";
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
      console.log(result);
    }
  });
}

module.exports = { getDelivery_time };
