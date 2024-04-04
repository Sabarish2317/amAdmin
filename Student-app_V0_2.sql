-- MySQL Workbench Synchronization
-- Generated: 2024-02-09 02:47
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: LENOVA
-- change department.id into department_id
-- ALTER TABLE `attendanceapp_db_v0_2`.`year_column` 
-- DROP COLUMN `Year_columncol`,
-- DROP INDEX `Year_columncol_UNIQUE` ;
-- ;
-- ALTER TABLE `attendanceapp_db_v0_2`.`subject_column` 
-- CHANGE COLUMN `Subject_code` `Subject_code` VARCHAR(8) NOT NULL ,
-- CHANGE COLUMN `Subject_Clip` `Subject_Clip` VARCHAR(5) NOT NULL ;


SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

DROP SCHEMA IF EXISTS `default_schema` ;

ALTER TABLE `AttendanceApp_db_V0_2`.`Department_column` 
CHARACTER SET = utf8 , COLLATE = utf8_general_ci ;

ALTER TABLE `AttendanceApp_db_V0_2`.`Year_column` 
CHARACTER SET = utf8 , COLLATE = utf8_general_ci ;

ALTER TABLE `AttendanceApp_db_V0_2`.`Subject_column` 
CHARACTER SET = utf8 , COLLATE = utf8_general_ci ;

CREATE TABLE IF NOT EXISTS `AttendanceApp_db_V0_2`.`Class_Column` (
  `Class_id` INT(10) UNSIGNED NOT NULL,
  `Class_Name` VARCHAR(6) NOT NULL,
  `Department_id_CC` INT(10) UNSIGNED NULL DEFAULT NULL,
  `Year_id_CC` INT(10) UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`Class_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

ALTER TABLE `AttendanceApp_db_V0_2`.`Day_Column` 
CHARACTER SET = utf8 , COLLATE = utf8_general_ci ;

ALTER TABLE `AttendanceApp_db_V0_2`.`Student_Login_Table` 
CHARACTER SET = utf8 , COLLATE = utf8_general_ci ;

CREATE TABLE IF NOT EXISTS `AttendanceApp_db_V0_2`.`Student_Period_Attendance_table` (
  `Period_Attendance_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `Student_id_PAT` INT(10) UNSIGNED NULL DEFAULT NULL,
  `Subject_id_PAT` INT(10) UNSIGNED NULL DEFAULT NULL,
  `Present_Class_Count` INT(11) NULL DEFAULT NULL,
  `Total_Class_Count` INT(11) NULL DEFAULT NULL,
  `Subject_Percentage` FLOAT(11) GENERATED ALWAYS AS ((Present_Class_Count / Total_Class_Count) * 100) VIRTUAL,
  PRIMARY KEY (`Period_Attendance_id`),
  UNIQUE INDEX `idx_Id_SubId` (`Student_id_PAT` ASC, `Subject_id_PAT` ASC) VISIBLE,
  INDEX `Subject_id_PAT_idx` (`Subject_id_PAT` ASC) VISIBLE,
  CONSTRAINT `Subject_id_PAT`
    FOREIGN KEY (`Subject_id_PAT`)
    REFERENCES `AttendanceApp_db_V0_2`.`Subject_column` (`Subject.id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Student_id_PAT`
    FOREIGN KEY (`Student_id_PAT`)
    REFERENCES `AttendanceApp_db_V0_2`.`Student_Details_Table` (`Student_id_DT`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `AttendanceApp_db_V0_2`.`Schedule_table` (
  `Schedule_id` INT(10) UNSIGNED NOT NULL,
  `Year_id_ST` INT(10) UNSIGNED NOT NULL,
  `Class_id_ST` INT(10) UNSIGNED NOT NULL,
  `Day_id_ST` INT(10) UNSIGNED NOT NULL,
  `Period_No` INT(10) UNSIGNED NOT NULL,
  `Subject_id_ST` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`Schedule_id`),
  UNIQUE INDEX `idx_Schedule` (`Schedule_id` ASC, `Year_id_ST` ASC, `Class_id_ST` ASC, `Day_id_ST` ASC, `Period_No` ASC, `Subject_id_ST` ASC) VISIBLE,
  INDEX `Year_id_ST_idx` (`Year_id_ST` ASC) VISIBLE,
  INDEX `Class_id_ST_idx` (`Class_id_ST` ASC) VISIBLE,
  INDEX `Day_id_ST_idx` (`Day_id_ST` ASC) VISIBLE,
  INDEX `Subject_id_ST_idx` (`Subject_id_ST` ASC) VISIBLE,
  CONSTRAINT `Year_id_ST`
    FOREIGN KEY (`Year_id_ST`)
    REFERENCES `AttendanceApp_db_V0_2`.`Year_column` (`Year.id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Class_id_ST`
    FOREIGN KEY (`Class_id_ST`)
    REFERENCES `AttendanceApp_db_V0_2`.`Class_Column` (`Class_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Day_id_ST`
    FOREIGN KEY (`Day_id_ST`)
    REFERENCES `AttendanceApp_db_V0_2`.`Day_Column` (`Day_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Subject_id_ST`
    FOREIGN KEY (`Subject_id_ST`)
    REFERENCES `AttendanceApp_db_V0_2`.`Subject_column` (`Subject.id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `AttendanceApp_db_V0_2`.`Student_Date_Attendane_Table` (
  `Attendance_id` INT(10) UNSIGNED NOT NULL,
  `Student_id_DAT` INT(10) UNSIGNED NOT NULL,
  `Semester_No` INT(10) UNSIGNED NOT NULL,
  `Date` DATE NOT NULL,
  `Day_id_DAT` INT(10) UNSIGNED NOT NULL,
  `Period1_Status` JSON NULL,
  `Period2_status` JSON NULL,
  `Period3_Status` JSON NULL,
  `Period4_Status` JSON NULL,
  `Period5_Status` JSON NULL,
  `Period6_Status` JSON NULL,
  `Period7_Status` JSON NULL,
  `Period8_Status` JSON NULL,
  PRIMARY KEY (`Attendance_id`),
  INDEX `Student_id_DAT_idx` (`Student_id_DAT` ASC) VISIBLE,
  UNIQUE INDEX `idx_ID_DATE_DAT` (`Attendance_id` ASC, `Date` ASC) VISIBLE,
  INDEX `Day_id_DAT_idx` (`Day_id_DAT` ASC) VISIBLE,
  CONSTRAINT `Student_id_DAT`
    FOREIGN KEY (`Student_id_DAT`)
    REFERENCES `AttendanceApp_db_V0_2`.`Student_Details_Table` (`Student_id_DT`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Day_id_DAT`
    FOREIGN KEY (`Day_id_DAT`)
    REFERENCES `AttendanceApp_db_V0_2`.`Day_Column` (`Day_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `AttendanceApp_db_V0_2`.`Staff_Login_Table` (
  `Mail_id` VARCHAR(40) NOT NULL,
  `Password_Hash` VARCHAR(60) NOT NULL,
  `Staff_id` INT(10) UNSIGNED NULL DEFAULT NULL,
  UNIQUE INDEX `Mail_id_UNIQUE` (`Mail_id` ASC) VISIBLE,
  UNIQUE INDEX `Staff_id_UNIQUE` (`Staff_id` ASC) VISIBLE,
  PRIMARY KEY (`Mail_id`),
  CONSTRAINT `Staff_idLT`
    FOREIGN KEY (`Staff_id`)
    REFERENCES `AttendanceApp_db_V0_2`.`Staff_Details_Table` (`Staff_id_DT`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `AttendanceApp_db_V0_2`.`Staff_Details_Table` (
  `Staff_id_DT` INT(10) UNSIGNED NOT NULL,
  `Staff_Name` VARCHAR(45) NULL DEFAULT NULL,
  `Staff_RegNo` VARCHAR(11) NULL DEFAULT NULL,
  PRIMARY KEY (`Staff_id_DT`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
