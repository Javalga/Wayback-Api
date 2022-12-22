const connection = require("../database");

function getIncidents(request, response) {
    let sql;
    if (request.query) {
        sql = `SELECT * FROM csv WHERE NºExpedición = ${request.query.ref}`
    } else {
        sql = 'SELECT * FROM csv'
    }
    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            response.send(result);
            console.log(result);
        }
    });
}

module.exports = { getIncidents };
