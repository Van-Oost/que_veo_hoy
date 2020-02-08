
var conexion = require("../lib/conexionbd")

function peliculas(req, res) {
    var sql = "select * from queveo.pelicula"
    conexion.query(sql, function(error, resultado, fields){
      if(error){
        console.log("Hubo un error en la consulta", error.message);
        return res.status(404).send("Hubo un error en la consulta");
      }
      var response = {
        "peliculas" : resultado
      };

      res.send(JSON.stringify(response));
    });
}

function genero(req, res) {
  var sql = "select * from queveo.genero"
  conexion.query(sql, function(error, resultado, fields){
    if(error){
      console.log("Hubo un error en la consulta", error.message);
      return res.status(404).send("Hubo un error en la consulta");
    }
    var response = {
      "genero" : resultado
    };

    res.send(JSON.stringify(response));
  });
}


module.exports = {
  peliculas : peliculas
  genero : genero
}
