const express = require("express")
const cors = require("cors")
const locationsRouters = require('./routers/locations.router')
const warehousesRouters = require("./routers/warehouses.router")
const rolesRouters = require("./routers/roles.router");
const usersRouters = require("./routers/users.router");
const incidenceRouters = require("./routers/incidence.router");
const incidence_typeRouters = require("./routers/incidence_type.router");

const errorHandling = require('./error/errorHandling')

const app = express()

// app.set("port", process.env.PORT || 3000);

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//routers
app.use(locationsRouters);
app.use(warehousesRouters);
app.use(rolesRouters);
app.use(usersRouters);
app.use(incidenceRouters);
app.use(incidence_typeRouters);

app.use((req, res, next) => {
    res.status(404).json({
        error: true,
        codigo: 404,
        message: "Endpoint doesnt found"
    })
})

app.use(errorHandling)

module.exports = app