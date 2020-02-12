
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
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
CREATE TABLE `queveo`.`genero` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`));
ALTER TABLE `queveo`.`pelicula` 
ADD COLUMN `genero_id` INT NULL AFTER `trama`,
CHANGE COLUMN `id` `id` INT(11) NOT NULL;
CREATE TABLE `queveo`.`actor` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(70) NOT NULL,
  PRIMARY KEY (`id`));
CREATE TABLE `queveo`.`actor_pelicula` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `actor_id` INT NULL,
  `pelicula_id` INT NULL,
  PRIMARY KEY (`id`));
