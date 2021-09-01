//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var app     = express();
const cors = require('cors');

// hacemos los require para obtener la funcionalidad de los módulos

var dispositivo = require('./rutas/dispositivo');
var medicion = require('./rutas/medicion');
var riego = require('./rutas/riego');



app.use(express.json());

let corsOptions = {
	origin: "*",
	optionsSucessStatus: 200
};
app.use(cors(corsOptions));

// se especifican las rutas
app.use("/dispositivo", dispositivo);
app.use("/medicion", medicion);
app.use("/riego", riego);



// inicia el servidor y escucha en el puerto especificaco
app.listen(PORT, function(req, res) {
    console.log("API TP DAM corriendo OK! ");
});



//=======[ End of file ]=======================================================
