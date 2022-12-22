const connection = require("../database");

function getIncidents(request, response) {
    let sql;
    if (request.query) {

    }
    let sql = "SELECT * FROM incidence_type;";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            response.send(result);
            console.log(result);
        }
    });
}

module.exports = { getIncidents };
