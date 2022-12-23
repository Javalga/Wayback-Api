const connection = require("../database");

const getIncidences = (request, response) => {
  let sql;
  if (request.query) {
    sql = `SELECT * FROM csv WHERE number_expedient = ${request.query.number_expedient}`;
  } else {
    sql = "SELECT * FROM csv";
  }
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
      console.log(result);
    }
  });
};

const postIncidence = (request, response) => {
  console.log(request.body);

  let params = [
    request.body.incidence_ref,
    request.body.status_id,
    request.body.incidence_type_id,
    request.body.customer_name,
    request.body.customer_phone,
    request.body.customer_mail,
    request.body.customer_address,
    request.body.customer_cp,
    request.body.customer_city,
    // request.body.input_date,
    request.body.warehouse_id,
  ];
  let sql =
    "INSERT INTO `incidence` (`incidence_ref`, `status_id`, `incidence_type_id`, `customer_name`, `customer_phone`, `customer_mail`, `customer_address`, `customer_cp`, `customer_city`, `warehouse_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
  connection.query(sql, params, (err, result) => {
    if (err) {
      let mensaje_error;
      if (true) {
        mensaje_error = {error: "Incidencia Ya Introducida"};
      } 
      response.send(err);
      console.log(err);
    } else {
      response.send(result);
      console.log(result);
    }
  });
};

module.exports = { getIncidences, postIncidence };
