const app = require('./app')

app.listen(process.env.PORT || 3000)

console.log(`Servidor escuchando en el puerto ${app.get('port')}`);