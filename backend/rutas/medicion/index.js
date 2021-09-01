//=======[ Settings, Imports & Data ]==========================================

var express = require('express');
var route = express.Router();

var pool = require('../../mysql/mysql-connector');


//=======[ Main module code ]==================================================


/* ========================================================================
devuelve todas las mediciones de todos los dispositivos
Ejemplo result:
{
        "dispositivoId": 1,
        "nombre": "Sensor 1",
        "ubicacion": "Patio",
        "electrovalvulaId": 1
    },
    {
        "dispositivoId": 2,
        "nombre": "Sensor 2",
        "ubicacion": "Cocina",
        "electrovalvulaId": 2
    },
    {
        "dispositivoId": 3,
        "nombre": "Sensor 3",
        "ubicacion": "Jardin Delantero",
        "electrovalvulaId": 3
    }
*/
route.get('/', function(req, res) {
    pool.query('Select * from Mediciones where 1', function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

/*========================================================================
devuelve la última de todas las mediciones de todos los dispositivos
Ejemplo result:
{
    "medicionId": 11,
    "fecha": "2020-11-26T21:19:41.000Z",
    "valor": "12",
    "dispositivoId": 2    
}

*/
route.get('/ultima', function(req, res) {
    pool.query('SELECT * FROM `Mediciones` ORDER by medicionId DESC LIMIT 1 ', function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});



/*========================================================================
devuelve todas las mediciones del dispositivo especificado
Ejemplo result:
    {
        "medicionId": 8,
        "fecha": "2020-11-26T21:19:41.000Z",
        "valor": "20",
        "dispositivoId": 1
    },
    {
        "medicionId": 2,
        "fecha": "2020-11-26T21:19:41.000Z",
        "valor": "40",
        "dispositivoId": 1
    },
    {
        "medicionId": 1,
        "fecha": "2020-11-26T21:19:41.000Z",
        "valor": "60",
        "dispositivoId": 1
    }
*/
route.get('/:id', function(req, res) {
    var id=req.params.id;
    pool.query('SELECT * FROM `Mediciones` WHERE `dispositivoId` = ? ORDER BY `medicionId` DESC', id, function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

/*========================================================================
devuelve la última medicion del dispositivo especificado
Ejemplo result:
    {
        "medicionId": 8,
        "fecha": "2020-11-26T21:19:41.000Z",
        "valor": "20",
        "dispositivoId": 1
    }
*/
route.get('/:id/ultima', function(req, res) {
    var id=req.params.id;
    pool.query('SELECT * FROM `Mediciones` WHERE `dispositivoId` = ? ORDER BY `medicionId` DESC LIMIT 1', id, function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});




/*==========================================================================
Agrega una nueva mediciónm recibe por parámetro id dispositivo y valor, el id se autoincrementa y la fecha la calculamos acá
Ejemplo body:
{
"valor": "20",
"dispositivoId": 1
}
*/
route.post('/nueva', function(req, res) {
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


module.exports = route;

//=======[ End of file ]=======================================================
