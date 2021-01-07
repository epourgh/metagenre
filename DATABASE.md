```sql

-- table inserts

CREATE TABLE `metagenre`.`creators` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `metagenre`.`genres` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `metagenre`.`mediums` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL,
  `mediumType` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `metagenre`.`mediumsCreators` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `creatorId` INT(11) NULL DEFAULT NULL,
  `mediumId` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `metagenre`.`mediumsDetails` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `mediumId` INT(11) NULL DEFAULT NULL,
  `shortDesc` VARCHAR(100) NULL DEFAULT NULL,
  `description` VARCHAR(500) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);


CREATE TABLE `metagenre`.`mediumsExternalLinks` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `mediumId` INT(11) NULL DEFAULT NULL,
  `amazon` VARCHAR(100) NULL DEFAULT NULL,
  `goodreads` VARCHAR(100) NULL DEFAULT NULL,
  `metacritic` VARCHAR(100) NULL DEFAULT NULL,
  `opencritic` VARCHAR(100) NULL DEFAULT NULL,
  `rateyourmusic` VARCHAR(100) NULL DEFAULT NULL,
  `imdb` VARCHAR(100) NULL DEFAULT NULL,
  `youtube` VARCHAR(100) NULL DEFAULT NULL,
  `wiki` VARCHAR(100) NULL DEFAULT NULL,
  `howlongtobeat` VARCHAR(100) NULL DEFAULT NULL,
  `fandomPrefix` VARCHAR(100) NULL DEFAULT NULL,
  `fandomSuffix` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `metagenre`.`mediumsFrontPage` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `mediumId` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `metagenre`.`mediumsGenres` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `mediumId` INT(11) NULL DEFAULT NULL,
  `genreId` INT(11) NULL DEFAULT NULL,
  `votes` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `metagenre`.`mediumsPictures` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `mediumId` INT(11) NULL DEFAULT NULL,
  `numberOfGalleryPics` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `metagenre`.`mediumsReleases` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `mediumId` INT(11) NULL DEFAULT NULL,
  `publisherId` INT(11) NULL DEFAULT NULL,
  `platformId1` INT(11) NULL DEFAULT NULL,
  `platformId2` INT(11) NULL DEFAULT NULL,
  `platformId3` INT(11) NULL DEFAULT NULL,
  `platformId4` INT(11) NULL DEFAULT NULL,
  `platformId5` INT(11) NULL DEFAULT NULL,
  `regionId1` INT(11) NULL DEFAULT NULL,
  `regionId2` INT(11) NULL DEFAULT NULL,
  `regionId3` INT(11) NULL DEFAULT NULL,
  `regionId4` INT(11) NULL DEFAULT NULL,
  `regionId5` INT(11) NULL DEFAULT NULL,
  `year` INT(11) NULL DEFAULT NULL,
  `month` INT(11) NULL DEFAULT NULL,
  `day` INT(11) NULL DEFAULT NULL,
  `unabridged` TINYINT(4) NULL DEFAULT NULL,
  `remaster` TINYINT(4) NULL DEFAULT NULL,
  `remake` TINYINT(4) NULL DEFAULT NULL,
  `directorsCut` TINYINT(4) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `metagenre`.`mediumsSeries` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `seriesId` INT(11) NULL DEFAULT NULL,
  `mediumId` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `metagenre`.`mediumsSubgenres` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `mediumId` INT(11) NULL DEFAULT NULL,
  `subgenreId` INT(11) NULL DEFAULT NULL,
  `votes` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `metagenre`.`nicknames` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `genreId` INT(11) NULL DEFAULT NULL,
  `subgenreId` INT(11) NULL DEFAULT NULL,
  `name` VARCHAR(65) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `metagenre`.`platforms` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `metagenre`.`publishers` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `metagenre`.`regions` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL DEFAULT NULL,
  `acronym` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `metagenre`.`relationships` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `subgenreId` INT(11) NULL DEFAULT NULL,
  `genreId` INT(11) NULL DEFAULT NULL,
  `connection` TINYINT(4) NULL DEFAULT NULL,
  `votes` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `metagenre`.`relationshipsTotalTally` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `subgenreId` INT(11) NULL DEFAULT NULL,
  `votes` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `metagenre`.`securityQuestions` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(120) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `metagenre`.`series` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `metagenre`.`similar` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `mediumId` INT(11) NULL DEFAULT NULL,
  `firstChoice` INT(11) NULL DEFAULT NULL,
  `firstChoicePercentage` INT(11) NULL DEFAULT NULL,
  `secondChoice` INT(11) NULL DEFAULT NULL,
  `secondChoicePercentage` INT(11) NULL DEFAULT NULL,
  `thirdChoice` VARCHAR(45) NULL DEFAULT NULL,
  `thirdChoicePercentage` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `metagenre`.`subgenres` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `metagenre`.`userBooleanMediumsGenres` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `date` DATETIME NULL DEFAULT NULL,
  `userId` INT(11) NULL DEFAULT NULL,
  `mediumId` INT(11) NULL DEFAULT NULL,
  `genreId` INT(11) NULL DEFAULT NULL,
  `voted` TINYINT(4) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `metagenre`.`userBooleanMediumsSubgenres` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `date` DATETIME NULL DEFAULT NULL,
  `userId` INT(11) NULL DEFAULT NULL,
  `mediumId` INT(11) NULL DEFAULT NULL,
  `subgenreId` INT(11) NULL DEFAULT NULL,
  `voted` TINYINT(4) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `metagenre`.`userBooleanRelationships` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `date` DATETIME NULL DEFAULT NULL,
  `userId` INT(11) NULL DEFAULT NULL,
  `subgenreId` INT(11) NULL DEFAULT NULL,
  `genreId` INT(11) NULL DEFAULT NULL,
  `voted` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `metagenre`.`userfavGenres` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `userId` INT(11) NULL DEFAULT NULL,
  `genreId` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `metagenre`.`userFavMediumTitles` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `userId` INT(11) NULL DEFAULT NULL,
  `mediumId` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `metagenre`.`userfavSubgenres` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `userId` INT(11) NULL DEFAULT NULL,
  `subgenreId` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
 
CREATE TABLE `metagenre`.`usernames` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NULL DEFAULT NULL,
  `password` VARCHAR(120) NULL DEFAULT NULL,
  `displayName` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(60) NULL DEFAULT NULL,
  `bio` VARCHAR(45) NULL DEFAULT NULL,
  `securityQuestion1id` VARCHAR(45) NULL DEFAULT NULL,
  `securityQuestion1answer` VARCHAR(45) NULL DEFAULT NULL,
  `securityQuestion2id` VARCHAR(45) NULL DEFAULT NULL,
  `securityQuestion2answer` VARCHAR(45) NULL DEFAULT NULL,
  `emailedChecksum` VARCHAR(45) NULL DEFAULT NULL,
  `verified` TINYINT(1) NULL DEFAULT NULL,
  `requestPassword` TINYINT(1) NULL DEFAULT NULL,
  `allowPasswordReset` TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
```

```sql

-- Table row inserts

INSERT INTO `metagenre`.`creators` (`id`, `name`) VALUES ('1', 'Brandon Sanderson');
INSERT INTO `metagenre`.`creators` (`id`, `name`) VALUES ('2', 'From Software');
INSERT INTO `metagenre`.`creators` (`id`, `name`) VALUES ('3', 'Intelligent Systems');
INSERT INTO `metagenre`.`creators` (`id`, `name`) VALUES ('4', 'Team Ninja');
INSERT INTO `metagenre`.`creators` (`id`, `name`) VALUES ('5', 'Square Enix ');

INSERT INTO `metagenre`.`genres` (`id`, `name`) VALUES ('1', 'fantasy');
INSERT INTO `metagenre`.`genres` (`id`, `name`) VALUES ('2', 'slice of life');
INSERT INTO `metagenre`.`genres` (`id`, `name`) VALUES ('3', 'sci-fi');
INSERT INTO `metagenre`.`genres` (`id`, `name`) VALUES ('4', 'drama');
INSERT INTO `metagenre`.`genres` (`id`, `name`) VALUES ('5', 'horror');

INSERT INTO `metagenre`.`mediums` (`id`, `title`, `mediumType`) VALUES ('1', 'Dune', 'film');
INSERT INTO `metagenre`.`mediums` (`id`, `title`, `mediumType`) VALUES ('2', 'Sekiro', 'game');
INSERT INTO `metagenre`.`mediums` (`id`, `title`, `mediumType`) VALUES ('3', 'Super Mario Odyssey', 'game');
INSERT INTO `metagenre`.`mediums` (`id`, `title`, `mediumType`) VALUES ('4', 'Witcher 3', 'tv show');
INSERT INTO `metagenre`.`mediums` (`id`, `title`, `mediumType`) VALUES ('5', 'Blade Runner 2049', 'film');
INSERT INTO `metagenre`.`mediums` (`id`, `title`, `mediumType`) VALUES ('6', 'Parasite', 'film');
INSERT INTO `metagenre`.`mediums` (`id`, `title`, `mediumType`) VALUES ('7', 'Fire Emblem 3 Houses', 'game');
INSERT INTO `metagenre`.`mediums` (`id`, `title`, `mediumType`) VALUES ('8', 'Overwatch 2', 'game');
INSERT INTO `metagenre`.`mediums` (`id`, `title`, `mediumType`) VALUES ('9', 'Final Fantasy XIV', 'game');
INSERT INTO `metagenre`.`mediums` (`id`, `title`, `mediumType`) VALUES ('10', 'Nioh', 'game');
INSERT INTO `metagenre`.`mediums` (`id`, `title`, `mediumType`) VALUES ('11', 'Super Mario RPG', 'game');
INSERT INTO `metagenre`.`mediums` (`id`, `title`, `mediumType`) VALUES ('12', 'Final Fantasy XV', 'game');
INSERT INTO `metagenre`.`mediums` (`id`, `title`, `mediumType`) VALUES ('13', 'Pokemon Red ', 'game');
INSERT INTO `metagenre`.`mediums` (`id`, `title`, `mediumType`) VALUES ('14', 'Nioh 2', 'game');
INSERT INTO `metagenre`.`mediums` (`id`, `title`, `mediumType`) VALUES ('15', 'The Way of Kings', 'book');
INSERT INTO `metagenre`.`mediums` (`id`, `title`, `mediumType`) VALUES ('16', 'Words of Radiance', 'book');
INSERT INTO `metagenre`.`mediums` (`id`, `title`, `mediumType`) VALUES ('17', 'Oathbringer', 'book');
INSERT INTO `metagenre`.`mediums` (`id`, `title`, `mediumType`) VALUES ('18', 'Rhythm of War', 'book');
INSERT INTO `metagenre`.`mediums` (`id`, `title`, `mediumType`) VALUES ('19', 'Fire Emblem Awakening', 'game');

INSERT INTO `metagenre`.`mediumsCreators` (`id`, `creatorId`, `mediumId`) VALUES ('1', '1', '15');
INSERT INTO `metagenre`.`mediumsCreators` (`id`, `creatorId`, `mediumId`) VALUES ('2', '1', '16');
INSERT INTO `metagenre`.`mediumsCreators` (`id`, `creatorId`, `mediumId`) VALUES ('3', '1', '17');
INSERT INTO `metagenre`.`mediumsCreators` (`id`, `creatorId`, `mediumId`) VALUES ('4', '1', '18');
INSERT INTO `metagenre`.`mediumsCreators` (`id`, `creatorId`, `mediumId`) VALUES ('5', '3', '7');

INSERT INTO `metagenre`.`mediumsDetails` (`id`, `mediumId`, `shortDesc`, `description`) VALUES ('1', '1', 'short desc', 'This is the long description.');
INSERT INTO `metagenre`.`mediumsDetails` (`id`, `mediumId`, `shortDesc`, `description`) VALUES ('2', '2', 'short desc', 'This is the long description.');
INSERT INTO `metagenre`.`mediumsDetails` (`id`, `mediumId`, `shortDesc`, `description`) VALUES ('3', '3', 'short desc', 'This is the long description.');
INSERT INTO `metagenre`.`mediumsDetails` (`id`, `mediumId`, `shortDesc`, `description`) VALUES ('4', '4', 'short desc', 'This is the long description.');
INSERT INTO `metagenre`.`mediumsDetails` (`id`, `mediumId`, `shortDesc`, `description`) VALUES ('5', '5', 'short desc', 'This is the long description.');
INSERT INTO `metagenre`.`mediumsDetails` (`id`, `mediumId`, `shortDesc`, `description`) VALUES ('6', '6', 'short desc', 'This is the long description.');
INSERT INTO `metagenre`.`mediumsDetails` (`id`, `mediumId`, `shortDesc`, `description`) VALUES ('7', '7', 'short desc', 'This is the long description.');
INSERT INTO `metagenre`.`mediumsDetails` (`id`, `mediumId`, `shortDesc`, `description`) VALUES ('8', '8', 'short desc', 'This is the long description.');
INSERT INTO `metagenre`.`mediumsDetails` (`id`, `mediumId`, `shortDesc`, `description`) VALUES ('9', '9', 'short desc', 'This is the long description.');
INSERT INTO `metagenre`.`mediumsDetails` (`id`, `mediumId`, `shortDesc`, `description`) VALUES ('10', '10', 'short desc', 'This is the long description.');
INSERT INTO `metagenre`.`mediumsDetails` (`id`, `mediumId`, `shortDesc`, `description`) VALUES ('11', '11', 'short desc', 'This is the long description.');
INSERT INTO `metagenre`.`mediumsDetails` (`id`, `mediumId`, `shortDesc`, `description`) VALUES ('12', '12', 'short desc', 'This is the long description.');
INSERT INTO `metagenre`.`mediumsDetails` (`id`, `mediumId`, `shortDesc`, `description`) VALUES ('13', '13', 'short desc', 'This is the long description.');
INSERT INTO `metagenre`.`mediumsDetails` (`id`, `mediumId`, `shortDesc`, `description`) VALUES ('14', '14', 'short desc', 'This is the long description.');
INSERT INTO `metagenre`.`mediumsDetails` (`id`, `mediumId`, `shortDesc`, `description`) VALUES ('15', '15', 'short desc', 'This is the long description.');
INSERT INTO `metagenre`.`mediumsDetails` (`id`, `mediumId`, `shortDesc`, `description`) VALUES ('16', '16', 'short desc', 'This is the long description.');
INSERT INTO `metagenre`.`mediumsDetails` (`id`, `mediumId`, `shortDesc`, `description`) VALUES ('17', '17', 'short desc', 'This is the long description.');
INSERT INTO `metagenre`.`mediumsDetails` (`id`, `mediumId`, `shortDesc`, `description`) VALUES ('18', '18', 'short desc', 'This is the long description.');
INSERT INTO `metagenre`.`mediumsDetails` (`id`, `mediumId`, `shortDesc`, `description`) VALUES ('19', '19', 'short desc', 'This is the long description.');

INSERT INTO `metagenre`.`mediumsExternalLinks` (`id`, `mediumId`) VALUES ('1', '1');
INSERT INTO `metagenre`.`mediumsExternalLinks` (`id`, `mediumId`) VALUES ('2', '2');
INSERT INTO `metagenre`.`mediumsExternalLinks` (`id`, `mediumId`) VALUES ('3', '3');
INSERT INTO `metagenre`.`mediumsExternalLinks` (`id`, `mediumId`) VALUES ('4', '4');
INSERT INTO `metagenre`.`mediumsExternalLinks` (`id`, `mediumId`) VALUES ('5', '5');
INSERT INTO `metagenre`.`mediumsExternalLinks` (`id`, `mediumId`) VALUES ('6', '6');
INSERT INTO `metagenre`.`mediumsExternalLinks` (`id`, `mediumId`) VALUES ('7', '7');
INSERT INTO `metagenre`.`mediumsExternalLinks` (`id`, `mediumId`) VALUES ('8', '8');
INSERT INTO `metagenre`.`mediumsExternalLinks` (`id`, `mediumId`) VALUES ('9', '9');
INSERT INTO `metagenre`.`mediumsExternalLinks` (`id`, `mediumId`) VALUES ('10', '10');
INSERT INTO `metagenre`.`mediumsExternalLinks` (`id`, `mediumId`) VALUES ('11', '11');
INSERT INTO `metagenre`.`mediumsExternalLinks` (`id`, `mediumId`) VALUES ('12', '12');
INSERT INTO `metagenre`.`mediumsExternalLinks` (`id`, `mediumId`) VALUES ('13', '13');
INSERT INTO `metagenre`.`mediumsExternalLinks` (`id`, `mediumId`) VALUES ('14', '14');
INSERT INTO `metagenre`.`mediumsExternalLinks` (`id`, `mediumId`, `amazon`, `goodreads`, `youtube`, `wiki`, `fandomPrefix`, `fandomSuffix`) VALUES ('15', '15', 'the+way+of+kings', '7235533-the-way-of-kings', 'the+way+of+kings', 'The_Way_of_Kings', 'stormlightarchive', 'The_Way_of_Kings');
INSERT INTO `metagenre`.`mediumsExternalLinks` (`id`, `mediumId`) VALUES ('16', '16');
INSERT INTO `metagenre`.`mediumsExternalLinks` (`id`, `mediumId`) VALUES ('17', '17');
INSERT INTO `metagenre`.`mediumsExternalLinks` (`id`, `mediumId`) VALUES ('18', '18');

INSERT INTO `metagenre`.`mediumsFrontPage` (`id`, `mediumId`) VALUES ('1', '1');
INSERT INTO `metagenre`.`mediumsFrontPage` (`id`, `mediumId`) VALUES ('2', '2');
INSERT INTO `metagenre`.`mediumsFrontPage` (`id`, `mediumId`) VALUES ('3', '15');
INSERT INTO `metagenre`.`mediumsFrontPage` (`id`, `mediumId`) VALUES ('4', '5');
INSERT INTO `metagenre`.`mediumsFrontPage` (`id`, `mediumId`) VALUES ('5', '7');
INSERT INTO `metagenre`.`mediumsFrontPage` (`id`, `mediumId`) VALUES ('6', '8');

INSERT INTO `metagenre`.`mediumsGenres` (`id`, `mediumId`, `genreId`, `votes`) VALUES ('1', '1', '1', '24');
INSERT INTO `metagenre`.`mediumsGenres` (`id`, `mediumId`, `genreId`, `votes`) VALUES ('2', '1', '2', '62');
INSERT INTO `metagenre`.`mediumsGenres` (`id`, `mediumId`, `genreId`, `votes`) VALUES ('3', '1', '3', '32');
INSERT INTO `metagenre`.`mediumsGenres` (`id`, `mediumId`, `genreId`, `votes`) VALUES ('4', '2', '2', '65');
INSERT INTO `metagenre`.`mediumsGenres` (`id`, `mediumId`, `genreId`, `votes`) VALUES ('6', '8', '1', '12');
INSERT INTO `metagenre`.`mediumsGenres` (`id`, `mediumId`, `genreId`, `votes`) VALUES ('7', '1', '4', '23');
INSERT INTO `metagenre`.`mediumsGenres` (`id`, `mediumId`, `genreId`, `votes`) VALUES ('9', '1', '5', '17');
INSERT INTO `metagenre`.`mediumsGenres` (`id`, `mediumId`, `genreId`, `votes`) VALUES ('10', '3', '1', '12');
INSERT INTO `metagenre`.`mediumsGenres` (`id`, `mediumId`, `genreId`, `votes`) VALUES ('11', '2', '3', '47');
INSERT INTO `metagenre`.`mediumsGenres` (`id`, `mediumId`, `genreId`, `votes`) VALUES ('12', '4', '1', '1');
INSERT INTO `metagenre`.`mediumsGenres` (`id`, `mediumId`, `genreId`, `votes`) VALUES ('13', '2', '1', '14');
INSERT INTO `metagenre`.`mediumsGenres` (`id`, `mediumId`, `genreId`, `votes`) VALUES ('14', '2', '4', '15');
INSERT INTO `metagenre`.`mediumsGenres` (`id`, `mediumId`, `genreId`, `votes`) VALUES ('15', '5', '3', '3');
INSERT INTO `metagenre`.`mediumsGenres` (`id`, `mediumId`, `genreId`, `votes`) VALUES ('16', '7', '1', '4');
INSERT INTO `metagenre`.`mediumsGenres` (`id`, `mediumId`, `genreId`, `votes`) VALUES ('17', '15', '1', '3');
INSERT INTO `metagenre`.`mediumsGenres` (`id`, `mediumId`, `genreId`, `votes`) VALUES ('18', '2', '5', '2');

INSERT INTO `metagenre`.`mediumsPictures` (`id`, `mediumId`, `numberOfGalleryPics`) VALUES ('1', '1', '0');
INSERT INTO `metagenre`.`mediumsPictures` (`id`, `mediumId`, `numberOfGalleryPics`) VALUES ('2', '2', '4');
INSERT INTO `metagenre`.`mediumsPictures` (`id`, `mediumId`, `numberOfGalleryPics`) VALUES ('3', '3', '0');
INSERT INTO `metagenre`.`mediumsPictures` (`id`, `mediumId`, `numberOfGalleryPics`) VALUES ('4', '4', '0');
INSERT INTO `metagenre`.`mediumsPictures` (`id`, `mediumId`, `numberOfGalleryPics`) VALUES ('5', '5', '0');
INSERT INTO `metagenre`.`mediumsPictures` (`id`, `mediumId`, `numberOfGalleryPics`) VALUES ('6', '6', '0');
INSERT INTO `metagenre`.`mediumsPictures` (`id`, `mediumId`, `numberOfGalleryPics`) VALUES ('7', '7', '0');
INSERT INTO `metagenre`.`mediumsPictures` (`id`, `mediumId`, `numberOfGalleryPics`) VALUES ('8', '8', '0');
INSERT INTO `metagenre`.`mediumsPictures` (`id`, `mediumId`, `numberOfGalleryPics`) VALUES ('9', '9', '0');
INSERT INTO `metagenre`.`mediumsPictures` (`id`, `mediumId`, `numberOfGalleryPics`) VALUES ('10', '10', '0');
INSERT INTO `metagenre`.`mediumsPictures` (`id`, `mediumId`, `numberOfGalleryPics`) VALUES ('11', '11', '0');
INSERT INTO `metagenre`.`mediumsPictures` (`id`, `mediumId`, `numberOfGalleryPics`) VALUES ('12', '12', '0');
INSERT INTO `metagenre`.`mediumsPictures` (`id`, `mediumId`, `numberOfGalleryPics`) VALUES ('13', '13', '0');
INSERT INTO `metagenre`.`mediumsPictures` (`id`, `mediumId`, `numberOfGalleryPics`) VALUES ('14', '14', '0');
INSERT INTO `metagenre`.`mediumsPictures` (`id`, `mediumId`, `numberOfGalleryPics`) VALUES ('15', '15', '0');
INSERT INTO `metagenre`.`mediumsPictures` (`id`, `mediumId`, `numberOfGalleryPics`) VALUES ('16', '16', '0');
INSERT INTO `metagenre`.`mediumsPictures` (`id`, `mediumId`, `numberOfGalleryPics`) VALUES ('17', '17', '0');
INSERT INTO `metagenre`.`mediumsPictures` (`id`, `mediumId`, `numberOfGalleryPics`) VALUES ('18', '18', '0');

INSERT INTO `metagenre`.`mediumsReleases` (`id`, `mediumId`) VALUES ('1', '1');
INSERT INTO `metagenre`.`mediumsReleases` (`id`, `mediumId`, `platformId1`, `platformId2`, `platformId3`, `year`, `month`, `day`) VALUES ('2', '2', '1', '2', '4', '2019', '3', '22');
INSERT INTO `metagenre`.`mediumsReleases` (`id`, `mediumId`) VALUES ('3', '3');
INSERT INTO `metagenre`.`mediumsReleases` (`id`, `mediumId`) VALUES ('4', '4');
INSERT INTO `metagenre`.`mediumsReleases` (`id`, `mediumId`) VALUES ('5', '5');
INSERT INTO `metagenre`.`mediumsReleases` (`id`, `mediumId`) VALUES ('6', '6');
INSERT INTO `metagenre`.`mediumsReleases` (`id`, `mediumId`) VALUES ('7', '7');
INSERT INTO `metagenre`.`mediumsReleases` (`id`, `mediumId`) VALUES ('8', '8');
INSERT INTO `metagenre`.`mediumsReleases` (`id`, `mediumId`) VALUES ('9', '9');
INSERT INTO `metagenre`.`mediumsReleases` (`id`, `mediumId`) VALUES ('10', '10');
INSERT INTO `metagenre`.`mediumsReleases` (`id`, `mediumId`) VALUES ('11', '11');
INSERT INTO `metagenre`.`mediumsReleases` (`id`, `mediumId`) VALUES ('12', '12');
INSERT INTO `metagenre`.`mediumsReleases` (`id`, `mediumId`) VALUES ('13', '13');
INSERT INTO `metagenre`.`mediumsReleases` (`id`, `mediumId`) VALUES ('14', '14');
INSERT INTO `metagenre`.`mediumsReleases` (`id`, `mediumId`, `year`, `month`, `day`) VALUES ('15', '15', '2010', '8', '31');
INSERT INTO `metagenre`.`mediumsReleases` (`id`, `mediumId`, `year`, `month`, `day`) VALUES ('16', '16', '2014', '3', '4');
INSERT INTO `metagenre`.`mediumsReleases` (`id`, `mediumId`, `year`, `month`, `day`) VALUES ('17', '17', '2017', '11', '14');
INSERT INTO `metagenre`.`mediumsReleases` (`id`, `mediumId`, `year`, `month`, `day`) VALUES ('18', '18', '2020', '11', '17');
INSERT INTO `metagenre`.`mediumsReleases` (`id`, `mediumId`) VALUES ('19', '19');
INSERT INTO `metagenre`.`mediumsReleases` (`id`, `mediumId`, `regionId1`, `regionId2`, `regionId3`, `regionId4`) VALUES ('20', '2', '1', '2', '3', '4');

INSERT INTO `metagenre`.`mediumsSeries` (`id`, `seriesId`, `mediumId`) VALUES ('1', '1', '15');
INSERT INTO `metagenre`.`mediumsSeries` (`id`, `seriesId`, `mediumId`) VALUES ('2', '1', '16');
INSERT INTO `metagenre`.`mediumsSeries` (`id`, `seriesId`, `mediumId`) VALUES ('3', '1', '17');
INSERT INTO `metagenre`.`mediumsSeries` (`id`, `seriesId`, `mediumId`) VALUES ('4', '1', '18');
INSERT INTO `metagenre`.`mediumsSeries` (`id`, `seriesId`, `mediumId`) VALUES ('5', '2', '7');
INSERT INTO `metagenre`.`mediumsSeries` (`id`, `seriesId`, `mediumId`) VALUES ('6', '2', '19');

INSERT INTO `metagenre`.`mediumsSubgenres` (`id`, `mediumId`, `subgenreId`, `votes`) VALUES ('1', '1', '1', '7');
INSERT INTO `metagenre`.`mediumsSubgenres` (`id`, `mediumId`, `subgenreId`, `votes`) VALUES ('2', '1', '2', '6');
INSERT INTO `metagenre`.`mediumsSubgenres` (`id`, `mediumId`, `subgenreId`, `votes`) VALUES ('3', '1', '3', '5');
INSERT INTO `metagenre`.`mediumsSubgenres` (`id`, `mediumId`, `subgenreId`, `votes`) VALUES ('4', '1', '4', '5');
INSERT INTO `metagenre`.`mediumsSubgenres` (`id`, `mediumId`, `subgenreId`, `votes`) VALUES ('5', '1', '5', '16');
INSERT INTO `metagenre`.`mediumsSubgenres` (`id`, `mediumId`, `subgenreId`, `votes`) VALUES ('6', '1', '6', '14');
INSERT INTO `metagenre`.`mediumsSubgenres` (`id`, `mediumId`, `subgenreId`, `votes`) VALUES ('7', '2', '1', '22');
INSERT INTO `metagenre`.`mediumsSubgenres` (`id`, `mediumId`, `subgenreId`, `votes`) VALUES ('8', '2', '2', '7');
INSERT INTO `metagenre`.`mediumsSubgenres` (`id`, `mediumId`, `subgenreId`, `votes`) VALUES ('9', '2', '3', '23');
INSERT INTO `metagenre`.`mediumsSubgenres` (`id`, `mediumId`, `subgenreId`, `votes`) VALUES ('10', '2', '4', '14');
INSERT INTO `metagenre`.`mediumsSubgenres` (`id`, `mediumId`, `subgenreId`, `votes`) VALUES ('11', '2', '5', '11');
INSERT INTO `metagenre`.`mediumsSubgenres` (`id`, `mediumId`, `subgenreId`, `votes`) VALUES ('12', '2', '6', '4');
INSERT INTO `metagenre`.`mediumsSubgenres` (`id`, `mediumId`, `subgenreId`, `votes`) VALUES ('13', '2', '7', '1');

INSERT INTO `metagenre`.`nicknames` (`id`, `genreId`, `name`) VALUES ('1', '3', 'science fiction');
INSERT INTO `metagenre`.`nicknames` (`id`, `genreId`, `name`) VALUES ('2', '3', 'science-fiction');
INSERT INTO `metagenre`.`nicknames` (`id`, `genreId`, `name`) VALUES ('3', '3', 'scifi');
INSERT INTO `metagenre`.`nicknames` (`id`, `genreId`, `name`) VALUES ('4', '3', 'sci fi');

INSERT INTO `metagenre`.`platforms` (`id`, `name`) VALUES ('1', 'Playstation 4');
INSERT INTO `metagenre`.`platforms` (`id`, `name`) VALUES ('2', 'Xbox One');
INSERT INTO `metagenre`.`platforms` (`id`, `name`) VALUES ('3', 'Switch');
INSERT INTO `metagenre`.`platforms` (`id`, `name`) VALUES ('4', 'Windows');
INSERT INTO `metagenre`.`platforms` (`id`, `name`) VALUES ('5', 'Mac');
INSERT INTO `metagenre`.`platforms` (`id`, `name`) VALUES ('6', 'Playstation 5');
INSERT INTO `metagenre`.`platforms` (`id`, `name`) VALUES ('7', 'Xbox Series X');

INSERT INTO `metagenre`.`regions` (`id`, `name`, `acronym`) VALUES ('1', 'North America', 'NA');
INSERT INTO `metagenre`.`regions` (`id`, `name`, `acronym`) VALUES ('2', 'Japan', 'JP');
INSERT INTO `metagenre`.`regions` (`id`, `name`, `acronym`) VALUES ('3', 'Europe', 'EU');
INSERT INTO `metagenre`.`regions` (`id`, `name`, `acronym`) VALUES ('4', 'Australia', 'AU');

INSERT INTO `metagenre`.`relationships` (`id`, `subgenreId`, `genreId`, `connection`, `votes`) VALUES ('37', '1', '1', '0', '5');
INSERT INTO `metagenre`.`relationships` (`id`, `subgenreId`, `genreId`, `connection`, `votes`) VALUES ('38', '1', '2', '0', '0');
INSERT INTO `metagenre`.`relationships` (`id`, `subgenreId`, `genreId`, `connection`, `votes`) VALUES ('39', '1', '3', '0', '10');
INSERT INTO `metagenre`.`relationships` (`id`, `subgenreId`, `genreId`, `connection`, `votes`) VALUES ('40', '1', '4', '0', '12');
INSERT INTO `metagenre`.`relationships` (`id`, `subgenreId`, `genreId`, `connection`, `votes`) VALUES ('41', '2', '1', '1', '4');
INSERT INTO `metagenre`.`relationships` (`id`, `subgenreId`, `genreId`, `connection`, `votes`) VALUES ('42', '2', '2', '0', '0');
INSERT INTO `metagenre`.`relationships` (`id`, `subgenreId`, `genreId`, `connection`, `votes`) VALUES ('43', '2', '3', '0', '0');
INSERT INTO `metagenre`.`relationships` (`id`, `subgenreId`, `genreId`, `connection`, `votes`) VALUES ('44', '2', '4', '0', '0');
INSERT INTO `metagenre`.`relationships` (`id`, `subgenreId`, `genreId`, `connection`, `votes`) VALUES ('45', '3', '1', '0', '1');
INSERT INTO `metagenre`.`relationships` (`id`, `subgenreId`, `genreId`, `connection`, `votes`) VALUES ('46', '3', '2', '0', '0');
INSERT INTO `metagenre`.`relationships` (`id`, `subgenreId`, `genreId`, `connection`, `votes`) VALUES ('47', '3', '3', '1', '3');
INSERT INTO `metagenre`.`relationships` (`id`, `subgenreId`, `genreId`, `connection`, `votes`) VALUES ('48', '3', '4', '0', '0');
INSERT INTO `metagenre`.`relationships` (`id`, `subgenreId`, `genreId`, `connection`, `votes`) VALUES ('49', '4', '1', '0', '1');
INSERT INTO `metagenre`.`relationships` (`id`, `subgenreId`, `genreId`, `connection`, `votes`) VALUES ('50', '4', '2', '0', '0');
INSERT INTO `metagenre`.`relationships` (`id`, `subgenreId`, `genreId`, `connection`, `votes`) VALUES ('51', '4', '3', '1', '2');
INSERT INTO `metagenre`.`relationships` (`id`, `subgenreId`, `genreId`, `connection`, `votes`) VALUES ('52', '4', '4', '0', '0');
INSERT INTO `metagenre`.`relationships` (`id`, `subgenreId`, `genreId`, `connection`, `votes`) VALUES ('53', '5', '1', '0', '2');
INSERT INTO `metagenre`.`relationships` (`id`, `subgenreId`, `genreId`, `connection`, `votes`) VALUES ('54', '5', '2', '0', '1');
INSERT INTO `metagenre`.`relationships` (`id`, `subgenreId`, `genreId`, `connection`, `votes`) VALUES ('55', '5', '3', '0', '0');
INSERT INTO `metagenre`.`relationships` (`id`, `subgenreId`, `genreId`, `connection`, `votes`) VALUES ('56', '5', '4', '1', '4');
INSERT INTO `metagenre`.`relationships` (`id`, `subgenreId`, `genreId`, `connection`, `votes`) VALUES ('57', '6', '1', '0', '0');
INSERT INTO `metagenre`.`relationships` (`id`, `subgenreId`, `genreId`, `connection`, `votes`) VALUES ('58', '6', '2', '0', '0');
INSERT INTO `metagenre`.`relationships` (`id`, `subgenreId`, `genreId`, `connection`, `votes`) VALUES ('59', '6', '3', '0', '0');
INSERT INTO `metagenre`.`relationships` (`id`, `subgenreId`, `genreId`, `connection`, `votes`) VALUES ('60', '6', '4', '0', '0');
INSERT INTO `metagenre`.`relationships` (`id`, `subgenreId`, `genreId`, `connection`, `votes`) VALUES ('61', '1', '5', '0', '0');
INSERT INTO `metagenre`.`relationships` (`id`, `subgenreId`, `genreId`, `connection`, `votes`) VALUES ('62', '2', '5', '0', '0');
INSERT INTO `metagenre`.`relationships` (`id`, `subgenreId`, `genreId`, `connection`, `votes`) VALUES ('63', '3', '5', '0', '0');
INSERT INTO `metagenre`.`relationships` (`id`, `subgenreId`, `genreId`, `connection`, `votes`) VALUES ('64', '4', '5', '0', '0');
INSERT INTO `metagenre`.`relationships` (`id`, `subgenreId`, `genreId`, `connection`, `votes`) VALUES ('65', '5', '5', '0', '0');
INSERT INTO `metagenre`.`relationships` (`id`, `subgenreId`, `genreId`, `connection`, `votes`) VALUES ('66', '6', '5', '0', '0');
INSERT INTO `metagenre`.`relationships` (`id`, `subgenreId`, `genreId`, `connection`, `votes`) VALUES ('67', '7', '1', '0', '0');
INSERT INTO `metagenre`.`relationships` (`id`, `subgenreId`, `genreId`, `connection`, `votes`) VALUES ('68', '7', '2', '0', '0');
INSERT INTO `metagenre`.`relationships` (`id`, `subgenreId`, `genreId`, `connection`, `votes`) VALUES ('69', '7', '3', '0', '0');
INSERT INTO `metagenre`.`relationships` (`id`, `subgenreId`, `genreId`, `connection`, `votes`) VALUES ('70', '7', '4', '0', '0');
INSERT INTO `metagenre`.`relationships` (`id`, `subgenreId`, `genreId`, `connection`, `votes`) VALUES ('71', '7', '5', '0', '0');

INSERT INTO `metagenre`.`relationshipsTotalTally` (`id`, `subgenreId`, `votes`) VALUES ('2', '1', '27');
INSERT INTO `metagenre`.`relationshipsTotalTally` (`id`, `subgenreId`, `votes`) VALUES ('3', '2', '4');
INSERT INTO `metagenre`.`relationshipsTotalTally` (`id`, `subgenreId`, `votes`) VALUES ('4', '3', '4');
INSERT INTO `metagenre`.`relationshipsTotalTally` (`id`, `subgenreId`, `votes`) VALUES ('5', '4', '3');
INSERT INTO `metagenre`.`relationshipsTotalTally` (`id`, `subgenreId`, `votes`) VALUES ('6', '5', '7');
INSERT INTO `metagenre`.`relationshipsTotalTally` (`id`, `subgenreId`, `votes`) VALUES ('7', '6', '0');

INSERT INTO `metagenre`.`securityQuestions` (`id`, `content`) VALUES ('1', 'What is your oldest cousin’s first name?');
INSERT INTO `metagenre`.`securityQuestions` (`id`, `content`) VALUES ('2', 'What was your first car’s make and model?');
INSERT INTO `metagenre`.`securityQuestions` (`id`, `content`) VALUES ('3', 'What is your birth month?');

INSERT INTO `metagenre`.`series` (`id`, `name`) VALUES ('1', 'Stormlight Archives');
INSERT INTO `metagenre`.`series` (`id`, `name`) VALUES ('2', 'Fire Emblem');

INSERT INTO `metagenre`.`similar` (`id`, `mediumId`, `firstChoice`, `firstChoicePercentage`, `secondChoice`, `secondChoicePercentage`, `thirdChoice`, `thirdChoicePercentage`) VALUES ('1', '1', '2', '30', '3', '10', '8', '10');
INSERT INTO `metagenre`.`similar` (`id`, `mediumId`, `firstChoice`, `firstChoicePercentage`, `secondChoice`, `secondChoicePercentage`, `thirdChoice`, `thirdChoicePercentage`) VALUES ('2', '2', '1', '30', '3', '10', '8', '10');
INSERT INTO `metagenre`.`similar` (`id`, `mediumId`, `firstChoice`, `firstChoicePercentage`, `secondChoice`, `secondChoicePercentage`, `thirdChoice`, `thirdChoicePercentage`) VALUES ('3', '3', '2', '10', '1', '10', '8', '10');
INSERT INTO `metagenre`.`similar` (`id`, `mediumId`, `firstChoice`, `firstChoicePercentage`, `secondChoice`, `secondChoicePercentage`, `thirdChoice`, `thirdChoicePercentage`) VALUES ('4', '4', '2', '10', '1', '10', '3', '10');
INSERT INTO `metagenre`.`similar` (`id`, `mediumId`, `firstChoice`, `firstChoicePercentage`, `secondChoice`, `secondChoicePercentage`, `thirdChoice`, `thirdChoicePercentage`) VALUES ('5', '5', '2', '10', '1', '10', '3', '10');
INSERT INTO `metagenre`.`similar` (`id`, `mediumId`, `firstChoice`, `firstChoicePercentage`, `secondChoice`, `secondChoicePercentage`, `thirdChoice`, `thirdChoicePercentage`) VALUES ('6', '6', '0', '0', '0', '0', '0', '0');
INSERT INTO `metagenre`.`similar` (`id`, `mediumId`, `firstChoice`, `firstChoicePercentage`, `secondChoice`, `secondChoicePercentage`, `thirdChoice`, `thirdChoicePercentage`) VALUES ('7', '7', '2', '10', '1', '10', '3', '10');
INSERT INTO `metagenre`.`similar` (`id`, `mediumId`, `firstChoice`, `firstChoicePercentage`, `secondChoice`, `secondChoicePercentage`, `thirdChoice`, `thirdChoicePercentage`) VALUES ('8', '8', '2', '10', '1', '10', '3', '10');
INSERT INTO `metagenre`.`similar` (`id`, `mediumId`, `firstChoice`, `firstChoicePercentage`, `secondChoice`, `secondChoicePercentage`, `thirdChoice`, `thirdChoicePercentage`) VALUES ('9', '9', '0', '0', '0', '0', '0', '0');
INSERT INTO `metagenre`.`similar` (`id`, `mediumId`, `firstChoice`, `firstChoicePercentage`, `secondChoice`, `secondChoicePercentage`, `thirdChoice`, `thirdChoicePercentage`) VALUES ('10', '10', '0', '0', '0', '0', '0', '0');
INSERT INTO `metagenre`.`similar` (`id`, `mediumId`, `firstChoice`, `firstChoicePercentage`, `secondChoice`, `secondChoicePercentage`, `thirdChoice`, `thirdChoicePercentage`) VALUES ('11', '11', '0', '0', '0', '0', '0', '0');
INSERT INTO `metagenre`.`similar` (`id`, `mediumId`, `firstChoice`, `firstChoicePercentage`, `secondChoice`, `secondChoicePercentage`, `thirdChoice`, `thirdChoicePercentage`) VALUES ('12', '12', '0', '0', '0', '0', '0', '0');
INSERT INTO `metagenre`.`similar` (`id`, `mediumId`, `firstChoice`, `firstChoicePercentage`, `secondChoice`, `secondChoicePercentage`, `thirdChoice`, `thirdChoicePercentage`) VALUES ('13', '13', '0', '0', '0', '0', '0', '0');
INSERT INTO `metagenre`.`similar` (`id`, `mediumId`, `firstChoice`, `firstChoicePercentage`, `secondChoice`, `secondChoicePercentage`, `thirdChoice`, `thirdChoicePercentage`) VALUES ('14', '14', '0', '0', '0', '0', '0', '0');
INSERT INTO `metagenre`.`similar` (`id`, `mediumId`, `firstChoice`, `firstChoicePercentage`, `secondChoice`, `secondChoicePercentage`, `thirdChoice`, `thirdChoicePercentage`) VALUES ('15', '15', '2', '10', '1', '10', '3', '10');
INSERT INTO `metagenre`.`similar` (`id`, `mediumId`, `firstChoice`, `firstChoicePercentage`, `secondChoice`, `secondChoicePercentage`, `thirdChoice`, `thirdChoicePercentage`) VALUES ('16', '16', '0', '0', '0', '0', '0', '0');
INSERT INTO `metagenre`.`similar` (`id`, `mediumId`, `firstChoice`, `firstChoicePercentage`, `secondChoice`, `secondChoicePercentage`, `thirdChoice`, `thirdChoicePercentage`) VALUES ('17', '17', '0', '0', '0', '0', '0', '0');
INSERT INTO `metagenre`.`similar` (`id`, `mediumId`, `firstChoice`, `firstChoicePercentage`, `secondChoice`, `secondChoicePercentage`, `thirdChoice`, `thirdChoicePercentage`) VALUES ('18', '18', '0', '0', '0', '0', '0', '0');
INSERT INTO `metagenre`.`similar` (`id`, `mediumId`, `firstChoice`, `firstChoicePercentage`, `secondChoice`, `secondChoicePercentage`, `thirdChoice`) VALUES ('19', '19', '0', '0', '0', '0', '0');

INSERT INTO `metagenre`.`subgenres` (`id`, `name`) VALUES ('1', 'low fantasy');
INSERT INTO `metagenre`.`subgenres` (`id`, `name`) VALUES ('2', 'high fantasy');
INSERT INTO `metagenre`.`subgenres` (`id`, `name`) VALUES ('3', 'cyberpunk');
INSERT INTO `metagenre`.`subgenres` (`id`, `name`) VALUES ('4', 'scientific realism');
INSERT INTO `metagenre`.`subgenres` (`id`, `name`) VALUES ('5', 'modern');
INSERT INTO `metagenre`.`subgenres` (`id`, `name`) VALUES ('6', 'historic');
INSERT INTO `metagenre`.`subgenres` (`id`, `name`) VALUES ('7', 'epic fantasy');

INSERT INTO `metagenre`.`userBooleanMediumsGenres` (`id`, `date`, `userId`, `mediumId`, `genreId`, `voted`) VALUES ('31', '2020-07-31 19:15:44', '11', '1', '1', '1');
INSERT INTO `metagenre`.`userBooleanMediumsGenres` (`id`, `date`, `userId`, `mediumId`, `genreId`, `voted`) VALUES ('32', '2020-07-31 19:15:46', '11', '1', '4', '1');
INSERT INTO `metagenre`.`userBooleanMediumsGenres` (`id`, `date`, `userId`, `mediumId`, `genreId`, `voted`) VALUES ('33', '2020-07-31 19:15:54', '11', '2', '2', '1');
INSERT INTO `metagenre`.`userBooleanMediumsGenres` (`id`, `date`, `userId`, `mediumId`, `genreId`, `voted`) VALUES ('34', '2020-07-31 19:15:55', '11', '2', '3', '1');
INSERT INTO `metagenre`.`userBooleanMediumsGenres` (`id`, `date`, `userId`, `mediumId`, `genreId`, `voted`) VALUES ('36', '2020-10-21 20:33:58', '11', '5', '3', '1');
INSERT INTO `metagenre`.`userBooleanMediumsGenres` (`id`, `date`, `userId`, `mediumId`, `genreId`, `voted`) VALUES ('37', '2020-10-23 05:00:13', '15', '7', '1', '1');
INSERT INTO `metagenre`.`userBooleanMediumsGenres` (`id`, `date`, `userId`, `mediumId`, `genreId`, `voted`) VALUES ('38', '2020-10-23 16:19:09', '15', '2', '2', '1');
INSERT INTO `metagenre`.`userBooleanMediumsGenres` (`id`, `date`, `userId`, `mediumId`, `genreId`, `voted`) VALUES ('39', '2020-10-23 16:19:10', '15', '2', '1', '1');
INSERT INTO `metagenre`.`userBooleanMediumsGenres` (`id`, `date`, `userId`, `mediumId`, `genreId`, `voted`) VALUES ('40', '2020-10-23 16:19:10', '15', '2', '4', '1');
INSERT INTO `metagenre`.`userBooleanMediumsGenres` (`id`, `date`, `userId`, `mediumId`, `genreId`, `voted`) VALUES ('41', '2020-10-28 03:52:19', '11', '7', '1', '1');
INSERT INTO `metagenre`.`userBooleanMediumsGenres` (`id`, `date`, `userId`, `mediumId`, `genreId`, `voted`) VALUES ('42', '2020-10-28 21:51:18', '11', '1', '3', '1');
INSERT INTO `metagenre`.`userBooleanMediumsGenres` (`id`, `date`, `userId`, `mediumId`, `genreId`, `voted`) VALUES ('44', '2020-12-08 06:03:49', '11', '2', '4', '1');

INSERT INTO `metagenre`.`userBooleanMediumsSubgenres` (`id`, `date`, `userId`, `mediumId`, `subgenreId`, `voted`) VALUES ('19', '2020-07-31 19:15:47', '11', '1', '5', '1');
INSERT INTO `metagenre`.`userBooleanMediumsSubgenres` (`id`, `date`, `userId`, `mediumId`, `subgenreId`, `voted`) VALUES ('20', '2020-07-31 19:15:58', '11', '2', '3', '1');
INSERT INTO `metagenre`.`userBooleanMediumsSubgenres` (`id`, `date`, `userId`, `mediumId`, `subgenreId`, `voted`) VALUES ('22', '2020-07-31 19:16:01', '11', '2', '5', '1');
INSERT INTO `metagenre`.`userBooleanMediumsSubgenres` (`id`, `date`, `userId`, `mediumId`, `subgenreId`, `voted`) VALUES ('24', '2020-10-21 01:45:52', '11', '2', '1', '1');
INSERT INTO `metagenre`.`userBooleanMediumsSubgenres` (`id`, `date`, `userId`, `mediumId`, `subgenreId`, `voted`) VALUES ('25', '2020-10-28 22:21:22', '11', '1', '6', '1');

INSERT INTO `metagenre`.`userBooleanRelationships` (`id`, `date`, `userId`, `subgenreId`, `genreId`, `voted`) VALUES ('3', '2020-10-13 21:34:13', '1', '1', '1', '1');
INSERT INTO `metagenre`.`userBooleanRelationships` (`id`, `date`, `userId`, `subgenreId`, `genreId`, `voted`) VALUES ('5', '2020-10-13 21:34:13', '2', '1', '1', '1');
INSERT INTO `metagenre`.`userBooleanRelationships` (`id`, `date`, `userId`, `subgenreId`, `genreId`, `voted`) VALUES ('37', '2020-10-13 21:34:19', '11', '2', '1', '1');
INSERT INTO `metagenre`.`userBooleanRelationships` (`id`, `date`, `userId`, `subgenreId`, `genreId`, `voted`) VALUES ('38', '2020-10-13 21:34:26', '11', '3', '1', '1');
INSERT INTO `metagenre`.`userBooleanRelationships` (`id`, `date`, `userId`, `subgenreId`, `genreId`, `voted`) VALUES ('54', '2020-10-29 04:45:39', '11', '1', '1', '1');

INSERT INTO `metagenre`.`usernames` (`id`, `username`, `password`) VALUES ('1', 'EmersonPour', 'password');
INSERT INTO `metagenre`.`usernames` (`id`, `username`, `password`) VALUES ('2', 'Emerson', 'pass');
INSERT INTO `metagenre`.`usernames` (`id`, `username`, `password`) VALUES ('3', 'Dalinar', 'pass');
INSERT INTO `metagenre`.`usernames` (`id`, `username`, `password`) VALUES ('4', 'Dal', 'pass');
INSERT INTO `metagenre`.`usernames` (`id`, `username`, `password`) VALUES ('5', 'kal', '1588297477219$10$98caf5e7a8ca4f86c4fbebf8c7851643');
INSERT INTO `metagenre`.`usernames` (`id`, `username`, `password`) VALUES ('6', 'kalidan', '1588297525101$10$24d6791ff2f1013c713f6346696a99c3');
INSERT INTO `metagenre`.`usernames` (`id`, `username`, `password`) VALUES ('7', 'wit', '1588297538728$10$de0fd5920d408143f798e11f28727122');
INSERT INTO `metagenre`.`usernames` (`id`, `username`, `password`) VALUES ('8', 'jenny', '1588297626997$10$86e12206d4e25f31e19f408c5ba22898');
INSERT INTO `metagenre`.`usernames` (`id`, `username`, `password`) VALUES ('9', 'james', '1588297816852$10$5e775c606fd90d8976b089e70bd8ca65');
INSERT INTO `metagenre`.`usernames` (`id`, `username`, `password`) VALUES ('10', 'jenzie', '1592364877153$10$560786030ffaafefbd18bb9f61841958');
INSERT INTO `metagenre`.`usernames` (`id`, `username`, `password`, `displayName`, `email`, `securityQuestion1id`, `securityQuestion1answer`, `securityQuestion2id`, `securityQuestion2answer`, `emailedChecksum`, `requestPassword`, `allowPasswordReset`) VALUES ('11', 'something', '1603405417351$10$e6410ea9ddfba89ff72a51619e531db3', 'Emerson Pourghaed', 'doscaseal@gmail.com', '2', 'jeep', '3', 'august', 'kXxy0F', '1', '0');
INSERT INTO `metagenre`.`usernames` (`id`, `username`, `password`, `displayName`, `email`, `securityQuestion1id`, `securityQuestion1answer`, `securityQuestion2id`, `securityQuestion2answer`, `emailedChecksum`, `verified`) VALUES ('15', 'epourgh', '1603425160029$10$7d2a881a038998088e0fb2061b91a24f', 'Emerson Pourghaed', 'epourgh@gmail.com', '2', 'jeep', '2', 'august', 'PIztb4', '1');

```