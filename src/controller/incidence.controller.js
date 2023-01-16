const connection = require("../database");

const getIncidences = (request, response) => {
  let sql;
  if (request.query) {
    sql = `SELECT * FROM railway.csv WHERE number_expedient = ${request.query.number_expedient}`;
  } else {
    sql = "SELECT  * FROM railway.csv";
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

const getIncidenceProcessed = (request, response) => {
  let sql;
  console.log(request.query.since);
  console.log(request.query.until);
  if (request.query.incidence_ref) {
    sql = `SELECT i.incidence_id , i.incidence_ref, s.name AS status, t.name AS incidence_type, i.customer_name, i.customer_phone, i.customer_mail, i.customer_address,
  i.customer_cp, i.customer_city, i.input_date, i.output_date, i.next_delivery, i.delivery_time_id, d.name AS delivery_time, w.name AS warehouse, i.warehouse_id, i.status_id, i.incidence_type_id, i.location_id, l.name AS location FROM railway.incidence AS i 
  LEFT JOIN status AS s ON(i.status_id = s.status_id)
  LEFT JOIN incidence_type AS t ON(i.incidence_type_id = t.incidence_type_id)
  LEFT JOIN warehouses AS w ON(i.warehouse_id = w.warehouse_id)
  LEFT JOIN delivery_time AS d ON(i.delivery_time_id = d.delivery_time_id)
	LEFT JOIN locations AS l ON(i.location_id = l.location_id)
  WHERE (i.incidence_ref = ${request.query.incidence_ref})`;
  } else if (request.query.since && request.query.until) {
    sql = `SELECT i.incidence_id , i.incidence_ref, s.name AS status, t.name AS incidence_type, i.customer_name, i.customer_phone, i.customer_mail, i.customer_address,
  i.customer_cp, i.customer_city, i.input_date, i.output_date, i.next_delivery, i.delivery_time_id, d.name AS delivery_time, w.name AS warehouse, i.warehouse_id, i.status_id, i.incidence_type_id, i.location_id, l.name AS location FROM railway.incidence AS i 
  LEFT JOIN status AS s ON(i.status_id = s.status_id)
  LEFT JOIN incidence_type AS t ON(i.incidence_type_id = t.incidence_type_id)
  LEFT JOIN warehouses AS w ON(i.warehouse_id = w.warehouse_id)
  LEFT JOIN delivery_time AS d ON(i.delivery_time_id = d.delivery_time_id)
	LEFT JOIN locations AS l ON(i.location_id = l.location_id)
  WHERE (i.input_date BETWEEN "${request.query.since}" AND "${request.query.until}")`;
  } else {
    sql = `SELECT i.incidence_id , i.incidence_ref, s.name AS status, t.name AS incidence_type, i.customer_name, i.customer_phone, i.customer_mail, i.customer_address,
  i.customer_cp, i.customer_city, i.input_date, i.output_date, i.next_delivery, i.delivery_time_id, d.name AS delivery_time, w.name AS warehouse, i.warehouse_id, i.status_id, i.incidence_type_id, i.location_id, l.name AS location FROM railway.incidence AS i 
  LEFT JOIN status AS s ON(i.status_id = s.status_id)
  LEFT JOIN incidence_type AS t ON(i.incidence_type_id = t.incidence_type_id)
  LEFT JOIN warehouses AS w ON(i.warehouse_id = w.warehouse_id)
  LEFT JOIN delivery_time AS d ON(i.delivery_time_id = d.delivery_time_id)
	LEFT JOIN locations AS l ON(i.location_id = l.location_id)`;
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
    request.body.location_id,
  ];
  let sql =
    "INSERT INTO `railway.incidence` (`incidence_ref`, `status_id`, `incidence_type_id`, `customer_name`, `customer_phone`, `customer_mail`, `customer_address`, `customer_cp`, `customer_city`,`input_date`, `warehouse_id`, `location_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
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

  let sql = `SELECT i.incidence_id , i.incidence_ref, s.name AS status, t.name AS incidence_type, i.customer_name, i.customer_phone, i.customer_mail, i.customer_address,
  i.customer_cp, i.customer_city, i.input_date, i.output_date, i.next_delivery, i.delivery_time_id, d.name AS delivery_time, w.name AS warehouse, i.warehouse_id, i.status_id, i.incidence_type_id, i.location_id, l.name AS location FROM railway.incidence AS i 
  LEFT JOIN status AS s ON(i.status_id = s.status_id)
  LEFT JOIN incidence_type AS t ON(i.incidence_type_id = t.incidence_type_id)
  LEFT JOIN warehouses AS w ON(i.warehouse_id = w.warehouse_id)
  LEFT JOIN delivery_time AS d ON(i.delivery_time_id = d.delivery_time_id)
	LEFT JOIN locations AS l ON(i.location_id = l.location_id) WHERE (i.next_delivery BETWEEN ? AND ?) AND (i.status_id = 2)`;

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

  let sql = `SELECT i.incidence_id , i.incidence_ref, s.name AS status, t.name AS incidence_type, i.customer_name, i.customer_phone, i.customer_mail, i.customer_address,
  i.customer_cp, i.customer_city, i.input_date, i.output_date, i.next_delivery, i.delivery_time_id, d.name AS delivery_time, w.name AS warehouse, i.warehouse_id, i.status_id, i.incidence_type_id, i.location_id, l.name AS location FROM railway.incidence AS i 
  LEFT JOIN status AS s ON(i.status_id = s.status_id)
  LEFT JOIN incidence_type AS t ON(i.incidence_type_id = t.incidence_type_id)
  LEFT JOIN warehouses AS w ON(i.warehouse_id = w.warehouse_id)
  LEFT JOIN delivery_time AS d ON(i.delivery_time_id = d.delivery_time_id)
	LEFT JOIN locations AS l ON(i.location_id = l.location_id) WHERE (i.input_date BETWEEN ? AND ?) AND (i.status_id = 1)`;

  connection.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
      console.log(result);
    }
  });
};

const getFilteredIncidences = (request, response) => {
  let params = [request.query.col, request.query.value]
  let sql = `SELECT * FROM railway.csv WHERE ? = ?`;
  connection.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      response.send(result);
      console.log(result);
    }
  });
}
const putIncidence = (req, res) => {
  let answer;
  let sql;
  let incidence = {
    incidence_ref: req.body.incidence_ref,
    customer_name: req.body.customer_name,
    customer_phone: req.body.customer_phone,
    customer_mail: req.body.customer_mail,
    customer_address: req.body.customer_address,
    customer_cp: req.body.customer_cp,
    customer_city: req.body.customer_city,
    next_delivery: req.body.next_delivery,
    delivery_time_id: req.body.delivery_time_id,
    status_id: req.body.status_id
  }
  if (incidence != null) {
    console.log(req.body);
    sql = `UPDATE railway.incidence SET 
    status_id = \"${incidence.status_id}\", 
    customer_name = \"${incidence.customer_name}\", 
    customer_phone = \"${incidence.customer_phone}\",
    customer_mail = \"${incidence.customer_mail}\", 
    customer_address = \"${incidence.customer_address}\", 
    customer_cp = \"${incidence.customer_cp}\", 
    customer_city = \"${incidence.customer_city}\", 
    next_delivery= \"${incidence.next_delivery}\",
    delivery_time_id= \"${incidence.delivery_time_id}\"
    WHERE incidence_ref = \"${incidence.incidence_ref}\"`;
    answer = { error: false, code: 200, message: 'Incidence updated', result: incidence }
  } else {
    console.log('Please fill all the inputs');
    answer = { error: true, code: 200, message: 'Please fill al the inputs' }
  }
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      answer = err
    } else {
      console.log('Query done');
      console.log(result);
    }
    res.send(answer)
  })
}
const getIncidenceDashboard = (request, response) => {

  console.log(request.query.since, request.query.until);
  let sql = `SELECT i.incidence_id , i.incidence_ref, s.name AS status, t.name AS incidence_type, i.customer_name, i.customer_phone, i.customer_mail, i.customer_address,
  i.customer_cp, i.customer_city, i.input_date, i.output_date, i.next_delivery, i.delivery_time_id, d.name AS delivery_time, w.name AS warehouse, i.warehouse_id, i.status_id, i.incidence_type_id, i.location_id, l.name AS location FROM railway.incidence AS i 
  LEFT JOIN status AS s ON(i.status_id = s.status_id)
  LEFT JOIN incidence_type AS t ON(i.incidence_type_id = t.incidence_type_id)
  LEFT JOIN warehouses AS w ON(i.warehouse_id = w.warehouse_id)
  LEFT JOIN delivery_time AS d ON(i.delivery_time_id = d.delivery_time_id)
  LEFT JOIN locations AS l ON(i.location_id = l.location_id) 
   WHERE (input_date BETWEEN "${request.query.since}" AND "${request.query.until}")`;

  connection.query(sql, (err, result) => {
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
  getFilteredIncidences,
  putIncidence,
  getIncidenceDashboard,
};
