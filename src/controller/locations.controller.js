const connection = require("../database");

function getLocations(request, response) {
  
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

module.exports = { getLocations };
