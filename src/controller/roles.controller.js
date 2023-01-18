const connection = require("../database");

function getRoles(request, response) {
  let sql = "SELECT * FROM roles";
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
      console.log(result);
    }
  });
}

module.exports = { getRoles };
