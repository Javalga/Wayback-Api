const connection = require("../database");

function getIncidents_type(request, response) {
  let sql = "SELECT * FROM incident_type;";
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
      console.log(result);
    }
  });
}

module.exports = { getIncident_type };
