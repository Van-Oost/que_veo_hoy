CREATE TABLE `basedeprueba1`.`pelicula` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(100) NOT NULL,
  `duracion` INT(5) NULL,
  `director` VARCHAR(400) NULL,
  `anio` INT(5) NULL,
  `fecha_lanzamiento` DATE NULL,
  `puntuacion` INT(2) NULL,
  `poster` VARCHAR(300) NULL,
  `trama` VARCHAR(700) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
CREATE TABLE `queveo`.`pelicula` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(100) NOT NULL,
  `duracion` INT(5) NULL,
  `director` VARCHAR(400) NULL,
  `anio` INT(5) NULL,
  `fecha_lanzamiento` DATE NULL,
  `puntuacion` INT(2) NULL,
  `poster` VARCHAR(300) NULL,
  `trama` VARCHAR(700) NULL,
  PRIMARY KEY (`id`));
