//=======[ Settings, Imports & Data ]==========================================

var express = require('express');
var route = express.Router();

var pool = require('../../mysql/mysql-connector');

//=======[ Main module code ]==================================================

/*devuelve los registros de riego de la electrovávula
Ejemplo result:
    {
        "logRiegoId": 3,
        "apertura": 0,
        "fecha": "2021-08-31T18:31:24.000Z",
        "electrovalvulaId": 1
    },
    {
        "logRiegoId": 1,
        "apertura": 1,
        "fecha": "2021-08-31T18:18:09.000Z",
        "electrovalvulaId": 1
    }

*/

route.get('/:id', function(req, res) {
    var id=req.params.id;
    pool.query('SELECT * FROM `Log_Riegos` WHERE `electrovalvulaId` = ? ORDER BY `logRiegoId` DESC', id, function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

/* -----------------------------------------------------------------------------------------------------------
    devuelve el último registro de riego de una electroválvulas
Ejemplo result:
    {
        "logRiegoId": 3,
        "apertura": 0,
        "fecha": "2021-08-31T18:31:24.000Z",
        "electrovalvulaId": 1
    }
*/

route.get('/:id/ultimo', function(req, res) {
    var id=req.params.id;
    pool.query('SELECT * FROM `Log_Riegos` WHERE `electrovalvulaId` = ? ORDER BY`logRiegoId` DESC LIMIT 1',id , function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

/*--------------------------------------------------------------------------------------------------------------------------------------
Agrega una nueva operación de riego. Recibe id de la válvula y su estado. Id de la operación se autoincrementa y la fecha se calcula acá
Ejemplo body:
{
  "apertura": 1,
  "electrovalvulaId": 3+
}
*/
route.post('/nuevo', function(req, res) {
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


module.exports = route;



//=======[ End of file ]=======================================================
