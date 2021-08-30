//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var app     = express();
const cors = require('cors');
const dam   = require('./mysql-connector');
//var sql=require(./)

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

let corsOptions = {
	origin: "*",
	optionsSucessStatus: 200
};
app.use(cors(corsOptions));

var pool = require('./mysql-connector');

//=======[ Main module code ]==================================================

/* 
app.get('/test', function(req, res, next) {
    SVGPathSegCurvetoQuadraticRel
    res.send(JSON.stringify(devices)).status(200);
});
*/
app.get('/test/', function(req, res, next) {
    res.send("Cambio realizado");
});

// consulta lista de dispositivos
app.get('/dispositivo/', function(req, res) {
    pool.query('Select * from Dispositivos Where 1;', function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

// consulta dispositivo por su id
app.get('/dispositivo/:id', function(req, res) {
    var id=req.params.id;
    pool.query('Select * from Dispositivos Where dispositivoId = ?;', id,  function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

// devuelve todas las mediciones
app.get('/mediciones/', function(req, res) {
    pool.query('Select * from Mediciones where 1', function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

// devuelve la última medicion
app.get('/mediciones/ultima', function(req, res) {
    pool.query('SELECT * FROM `Mediciones` ORDER by medicionId DESC LIMIT 1 ', function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

//Agrega una nueva mediciónm recibe por parámetro id dispositivo y valor, el id se autoincrementa y la fecha la calculamos acá
app.post('/mediciones/add', function(req, res) {
    var fecha = new Date();
    var valor = req.body.valor;
    var id = req.body.dispositivoId;
    pool.query('INSERT INTO `Mediciones` (`fecha`,`valor`,`dispositivoId`) values (?,?,?)', [fecha,valor,id], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});



// devuelve los registros de riego de la electrovávula
app.get('/riego_evId/:id', function(req, res) {
    var id=req.params.id;
    pool.query('SELECT * FROM `Log_Riegos` WHERE `electrovalvulaId` = ? ORDER BY `logRiegoId` DESC', id, function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});
// devuelve el último registro de riego registrado de todos los registros de todas las electroválvulas
app.get('/riego_ultimo/', function(req, res) {
    pool.query('SELECT * FROM `Log_Riegos` ORDER BY`logRiegoId` DESC LIMIT 1', function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

// devuelve el último registro de riego de una electroválvulas
app.get('/riego_ultimo_evId/:id', function(req, res) {
    var id=req.params.id;
    pool.query('SELECT * FROM `Log_Riegos` WHERE `electrovalvulaId` = ? ORDER BY`logRiegoId` DESC LIMIT 1',id , function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

//Agrega una nueva operación de riego. Recibe id de la válvula y su estado. Id de la operación se autoincrementa y la fecha se calcula acá
app.post('/riego_add/', function(req, res) {
    var fecha = new Date();
    var apertura = req.body.apertura;
    var id = req.body.electrovalvulaId;
    pool.query('INSERT INTO `Log_Riegos` (`apertura`,`fecha`,`electrovalvulaId`) values (?,?,?)', [apertura, fecha, id], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});


app.listen(PORT, function(req, res) {
    console.log("API running correctly");
});



//=======[ End of file ]=======================================================
