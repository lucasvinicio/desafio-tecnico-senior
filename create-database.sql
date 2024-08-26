-- -----------------------------------------------------
-- Schema pomar
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `pomar` DEFAULT CHARACTER SET utf8 ;
USE `pomar` ;

-- -----------------------------------------------------
-- Table `pomar`.`especie`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pomar`.`especie` (
  `especie_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(100) NOT NULL,
  `descricao` VARCHAR(1000) NULL,
  PRIMARY KEY (`especie_id`),
  UNIQUE INDEX `codigo_UNIQUE` (`codigo` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pomar`.`arvore`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pomar`.`arvore` (
  `arvore_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(100) NOT NULL,
  `descricao` VARCHAR(1000) NULL,
  `idade` INT NULL,
  `especie_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`arvore_id`, `especie_id`),
  INDEX `fk_arvore_especie_especie_id_idx` (`especie_id` ASC) VISIBLE,
  UNIQUE INDEX `codigo_UNIQUE` (`codigo` ASC) VISIBLE,
  CONSTRAINT `fk_arvore_especie_especie_id`
    FOREIGN KEY (`especie_id`)
    REFERENCES `pomar`.`especie` (`especie_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pomar`.`grupo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pomar`.`grupo` (
  `grupo_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(100) NOT NULL,
  `nome` VARCHAR(200) NULL,
  `descricao` VARCHAR(1000) NULL,
  PRIMARY KEY (`grupo_id`),
  UNIQUE INDEX `codigo_UNIQUE` (`codigo` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pomar`.`grupo_arvore`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pomar`.`grupo_arvore` (
  `grupo_arvore_id` INT NOT NULL AUTO_INCREMENT,
  `grupo_id` INT UNSIGNED NOT NULL,
  `arvore_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`grupo_arvore_id`, `grupo_id`, `arvore_id`),
  INDEX `fk_grupo_arvore_grupo_grupo_id_idx` (`grupo_id` ASC) VISIBLE,
  INDEX `fk_grupo_arvore_arvore_arvore_id_idx` (`arvore_id` ASC) VISIBLE,
  CONSTRAINT `fk_grupo_arvore_has_arvore_grupo_arvore_grupo_arvore_id`
    FOREIGN KEY (`grupo_id`)
    REFERENCES `pomar`.`grupo` (`grupo_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_grupo_arvore_has_arvore_arvore_arvore_id`
    FOREIGN KEY (`arvore_id`)
    REFERENCES `pomar`.`arvore` (`arvore_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pomar`.`colheita`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pomar`.`colheita` (
  `colheita_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `informacoes` VARCHAR(1000) NULL,
  `data` DATE NOT NULL,
  `peso_bruto` DECIMAL(7,2) UNSIGNED NULL,
  `arvore_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`colheita_id`, `arvore_id`),
  INDEX `fk_colheira_arvore_arvore_id_idx` (`arvore_id` ASC) VISIBLE,
  CONSTRAINT `fk_colheira_arvore_arvore_id`
    FOREIGN KEY (`arvore_id`)
    REFERENCES `pomar`.`arvore` (`arvore_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

