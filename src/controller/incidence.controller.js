const connection = require("../database");

const getIncidences = (request, response) => {
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

const postIncidence = (request, response) => {
  let params = [
    req.body.incidence_ref,
    req.body.status,
    req.body.incidence_type
  ]
  let sql = 'INSERT INTO incidences '

}

module.exports = { getIncidences };
