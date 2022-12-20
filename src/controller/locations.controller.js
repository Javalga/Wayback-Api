const connection = require("../database");

function getLocations(request, response) {
  console.log('eo');
  let sql = "SELECT * FROM locations;";
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
      console.log(result);
    }
  });
}

module.exports = getLocations;
