var conexion = require("../lib/conexionbd");

function peliculas(req, res) {

  var anio = req.query.anio;
  var titulo = req.query.titulo;
  var genero = req.query.genero;
  var columnaOrden = req.query.columna_orden;
  var tipoOrden = req.query.tipo_orden;
  var pagina = req.query.pagina;
  var cantidad = req.query.cantidad;
  
  var sql = `SELECT * FROM pelicula`;

  if(genero||anio||titulo){
    
    sql += ` WHERE `
    
    if(genero){
   
      sql += `genero_id = ${ genero }`

      if (anio){
        sql += ` AND anio= '${ anio }' `
      
        if (titulo){
          sql += ` AND titulo LIKE "%${ titulo }%"`
        } 
      } 
      if (titulo){
        sql += ` AND titulo LIKE "%${ titulo }%"`
      }; 

    } else if(anio){
      
      sql += `anio= ${ anio } `
      
      if(titulo){
        sql += ` AND titulo LIKE "%${ titulo }%"`
      } 

    } else sql += ` titulo LIKE "%${ titulo }%"`
  };
  
  var offset = 0

  if(pagina!=1){
    offset = (pagina  - 1) * cantidad
  };
  
           
  sql += ` ORDER BY ${ columnaOrden } ${ tipoOrden } LIMIT 10000 OFFSET ${ offset }`//  `;
 
  conexion.query(sql, function(error, resultado, fields) {
    if (error) {
      console.log("Hubo un error en la consulta", error.message);
      return res.status(404).send("Hubo un error en la consulta");
    }
    var cantidadResultados = 0
    resultado.forEach(function(){
      cantidadResultados++
    });

    var response = {
      peliculas: resultado,
      total : cantidadResultados
    };

    res.send(JSON.stringify(response));
  });
}

function generos(req, res) {
  var sql = "select * from genero";
  conexion.query(sql, function(error, resultado, fields) {
    if (error) {
      console.log("Hubo un error en la consulta", error.message);
      return res.status(404).send("Hubo un error en la consulta");
    }
    var response = {
      generos: resultado
    };

    res.send(JSON.stringify(response));
  });
};


function recomendar(req, res) {

  var genero = req.query.genero;
  var anio_inicio = req.query.anio_inicio;
  var anio_fin = req.query.anio_fin;
  var puntuacion = req.query.puntuacion;

  var sql = `SELECT * FROM pelicula JOIN genero ON pelicula.genero_id = genero.id`;
  
  if(genero||anio_inicio||puntuacion){
    sql += ` WHERE `
  }

  if(genero){
    sql += `genero.nombre = "${ genero }"`;
  };

  if(anio_inicio){
    if(genero){
      sql += ` AND `;
    }
    sql += `pelicula.anio BETWEEN ${ anio_inicio } AND ${ anio_fin }`;
  };

  if(puntuacion){
    if(genero||anio_inicio){
      sql += ` AND `;
    }
    sql += `puntuacion = ${ puntuacion }`;
  };

  conexion.query(sql, function(error, resultado, fields) {
    if (error) {
      console.log("Hubo un error en la consulta", error.message);
      return res.status(404).send("Hubo un error en la consulta");
    }
    
    var response = {
      peliculas: resultado
    };

    res.send(JSON.stringify(response));
  });
};

function idPelicula(req, res) {
  var id = req.params.id;
  var sql = `SELECT pelicula.anio, pelicula.director, pelicula.duracion, pelicula.fecha_lanzamiento, pelicula.genero_id, pelicula.id, pelicula.poster, pelicula.puntuacion, pelicula.titulo, pelicula.trama, actor.nombre, genero.nombre AS genero
            FROM pelicula
            JOIN actor_pelicula ON actor_pelicula.pelicula_id = pelicula.id
            JOIN actor ON actor.id = actor_pelicula.actor_id
            JOIN genero ON genero.id = pelicula.genero_id
            WHERE pelicula.id = `+ id;

  conexion.query(sql, function(error, resultado, fields) {
    if (error) {
      console.log("Hubo un error en la consulta", error.message);
      return res.status(404).send("Hubo un error en la consulta");
    }
    
    var genero = resultado[0].genero
    var actores = []
    var pelicula = resultado[0]

    for (i = 0; i < resultado.length; i++) {
      actores.push({
        nombre: (resultado[i].nombre)
      });
    }

    var response = {
      pelicula : pelicula,
      actores : actores,
      genero: genero
    };

    res.send(JSON.stringify(response)); 
  })
};


module.exports = {
  peliculas: peliculas,
  generos: generos,
  recomendar : recomendar,
  idPelicula : idPelicula
};
