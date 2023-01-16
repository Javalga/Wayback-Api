const connection = require("../database");

function getIncidence_type(request, response) {
  let sql = "SELECT * FROM railway.incidence_type;";
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
      console.log(result);
    }
  });
}

module.exports = { getIncidence_type };
