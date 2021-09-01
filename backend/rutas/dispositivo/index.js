//=======[ Settings, Imports & Data ]==========================================

var express = require('express');
var route = express.Router();

var pool = require('../../mysql/mysql-connector');


//=======[ Main module code ]==================================================

/* devuelve lista de dispositivos
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
    }
*/
route.get('/', function(req, res) {
    pool.query('Select * from Dispositivos Where 1;', function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

/* ========================================================
 Devuelve los datos del dispositivo para un determinado id
Ejemplo result:
    {
        "dispositivoId": 1,
        "nombre": "Sensor 1",
        "ubicacion": "Patio",
        "electrovalvulaId": 1
    }

*/
route.get('/:id', function(req, res) {
    var id=req.params.id;
    pool.query('Select * from Dispositivos Where dispositivoId = ?', id,  function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

module.exports = route;
//=======[ End of file ]=======================================================
