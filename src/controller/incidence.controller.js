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

const getIncidenceProcessed = (request, response) => {   let sql;
  if (request.query.incidence_ref) {
   sql = `SELECT i.incidence_id , i.incidence_ref, s.name AS status, t.name AS incidence_type, i.customer_name, i.customer_phone, i.customer_mail, i.customer_address,
  i.customer_cp, i.customer_city, i.input_date, i.output_date, i.next_delivery, i.delivery_time_id, w.name AS warehouse, i.warehouse_id, i.status_id, i.incidence_type_id FROM incidence AS i 
  INNER JOIN status AS s ON(i.status_id = s.status_id)
  INNER JOIN incidence_type AS t ON(i.incidence_type_id = t.incidence_type_id)
  INNER JOIN warehouses AS w ON(i.warehouse_id = w.warehouse_id)
  WHERE (i.input_date IS NULL OR i.input_date IS NOT NULL)
  AND (i.output_date IS NULL OR i.output_date IS NOT NULL)
  AND (i.next_delivery IS NULL OR i.next_delivery IS NOT NULL)
  AND (i.delivery_time_id IS NULL OR i.delivery_time_id IS NOT NULL)
  AND (i.incidence_ref = ${request.query.incidence_ref})`;
  } else {
    sql = `SELECT i.incidence_id , i.incidence_ref, s.name AS status, t.name AS incidence_type, i.customer_name, i.customer_phone, i.customer_mail, i.customer_address,
  i.customer_cp, i.customer_city, i.input_date, i.output_date, i.next_delivery, i.delivery_time_id, w.name AS warehouse, i.warehouse_id, i.status_id, i.incidence_type_id FROM incidence AS i 
  INNER JOIN status AS s ON(i.status_id = s.status_id)
  INNER JOIN incidence_type AS t ON(i.incidence_type_id = t.incidence_type_id)
  INNER JOIN warehouses AS w ON(i.warehouse_id = w.warehouse_id)
  WHERE (i.input_date IS NULL OR i.input_date IS NOT NULL)
  AND (i.output_date IS NULL OR i.output_date IS NOT NULL)
  AND (i.next_delivery IS NULL OR i.next_delivery IS NOT NULL)
  AND (i.delivery_time_id IS NULL OR i.delivery_time_id IS NOT NULL)`;
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
    request.body.input_date,
    request.body.warehouse_id,
  ];
  let sql =
    "INSERT INTO `incidence` (`incidence_ref`, `status_id`, `incidence_type_id`, `customer_name`, `customer_phone`, `customer_mail`, `customer_address`, `customer_cp`, `customer_city`,`input_date`, `warehouse_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
  connection.query(sql, params, (err, result) => {
    if (err) {
      let mensaje_error;
      if (true) {
        mensaje_error = { error: "Incidencia Ya Introducida" };
      }
      response.send(err);
      console.log(err);
    } else {
      response.send(result);
      console.log(result);
    }
  });
};

const getIncidenceSolved = (request, response) => {

  let params = [
    request.query.since,
    request.query.until
  ];

  let sql = `SELECT i.incidence_id , i.incidence_ref, s.name AS status, t.name AS incidence_type, i.customer_name, i.customer_phone, i.customer_mail, i.customer_address, i.customer_cp, i.customer_city, i.input_date, i.output_date, i.next_delivery, i.delivery_time_id, w.name AS warehouse FROM incidence AS i  INNER JOIN status AS s ON(i.status_id = s.status_id) INNER JOIN incidence_type AS t ON(i.incidence_type_id = t.incidence_type_id) INNER JOIN warehouses AS w ON(i.warehouse_id = w.warehouse_id) WHERE (i.input_date IS NULL OR i.input_date IS NOT NULL) AND (i.output_date IS NULL OR i.output_date IS NOT NULL) AND (i.next_delivery IS NULL OR i.next_delivery IS NOT NULL) AND (i.delivery_time_id IS NULL OR i.delivery_time_id IS NOT NULL) AND (i.next_delivery BETWEEN ? AND ?) AND (i.status_id = 2)`;

  connection.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
      console.log(result);
    }
  });
}

const getIncidenceToReturn = (request, response) => {
  let params = [request.query.since, request.query.until];

  let sql = `SELECT i.incidence_id , i.incidence_ref, s.name AS status, t.name AS incidence_type, i.customer_name, i.customer_phone, i.customer_mail, i.customer_address, i.customer_cp, i.customer_city, i.input_date, i.output_date, i.next_delivery, i.delivery_time_id, w.name AS warehouse FROM incidence AS i  INNER JOIN status AS s ON(i.status_id = s.status_id) INNER JOIN incidence_type AS t ON(i.incidence_type_id = t.incidence_type_id) INNER JOIN warehouses AS w ON(i.warehouse_id = w.warehouse_id) WHERE (i.input_date IS NULL OR i.input_date IS NOT NULL) AND (i.output_date IS NULL OR i.output_date IS NOT NULL) AND (i.next_delivery IS NULL OR i.next_delivery IS NOT NULL) AND (i.delivery_time_id IS NULL OR i.delivery_time_id IS NOT NULL) AND (i.input_date BETWEEN ? AND ?) AND (i.status_id = 1)`;

  connection.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
      console.log(result);
    }
  });
};

module.exports = {
  getIncidences,
  getIncidenceProcessed,
  postIncidence,
  getIncidenceSolved,
  getIncidenceToReturn,
};
