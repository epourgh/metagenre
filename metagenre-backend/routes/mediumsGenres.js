const express = require('express');
const router = express.Router();
const connection = require('../connection');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verify.js');

router.get('/genresMediums/', (req, res) => {

    const {genreId} = req.query;

    const SELECT_MEDIUMGENRE_BY_GENREID_QUERY = `
    SELECT mg.*, g.name, m.id as mediumId, m.title
    FROM mediumsGenres as mg, genres as g, mediums as m
    WHERE mg.genreId = ${genreId}
    AND m.id = mg.mediumId
    AND g.id = mg.genreId;`;

    connection.query(SELECT_MEDIUMGENRE_BY_GENREID_QUERY, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            })
        }
    })
});

router.get('/subgenresMediums/', (req, res) => {

    const {subgenreId} = req.query;

    const SELECT_MEDIUMGENRE_BY_GENREID_QUERY = `
    SELECT mg.*, g.name, m.id as mediumId, m.title
    FROM mediumsSubgenres as mg, subgenres as g, mediums as m
    WHERE mg.subgenreId = ${subgenreId}
    AND m.id = mg.mediumId
    AND g.id = mg.subgenreId;`;

    connection.query(SELECT_MEDIUMGENRE_BY_GENREID_QUERY, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            })
        }
    })
});

router.get('/mediumsGenres/:id', (req, res) => {

    const SELECT_MEDIUMGENRE_BY_MEDIUMID_QUERY = `SELECT * FROM mediumsGenres WHERE id = ${req.params.id};`;
    connection.query(SELECT_MEDIUMGENRE_BY_MEDIUMID_QUERY, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            })
        }
    })
});

router.get('/mediumsSubgenres/:id', (req, res) => {

    const SELECT_MEDIUMSUBGENRE_BY_MEDIUMID_QUERY = `SELECT * FROM mediumsSubgenres WHERE id = ${req.params.id};`;
    connection.query(SELECT_MEDIUMSUBGENRE_BY_MEDIUMID_QUERY, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            })
        }
    })
});


router.get('/mediumsGenresView/', (req, res) => {
    const {mediumType} = req.query;
    const SELECT_ALL_MEDIUMGENRE_BY_MEDIUMID_QUERY = `
    SELECT metagenre.mediumsGenres.id, metagenre.mediums.id as mediumsId, metagenre.genres.id as genreId, metagenre.mediums.title, metagenre.genres.name, metagenre.mediumsGenres.votes
    FROM metagenre.mediums, metagenre.mediumsGenres, metagenre.genres
    WHERE metagenre.mediums.id = metagenre.mediumsGenres.mediumId AND metagenre.genres.id = metagenre.mediumsGenres.genreId
    AND metagenre.mediums.mediumType = '${mediumType}'
    ORDER BY metagenre.mediumsGenres.votes DESC;
    `;
    connection.query(SELECT_ALL_MEDIUMGENRE_BY_MEDIUMID_QUERY, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            })
        }
    })
});

router.get('/mediumsGenres/view/:id', (req, res) => {
    const SELECT_ALL_MEDIUMGENRE_BY_SINGLE_MEDIUMID_QUERY = `
    SELECT metagenre.mediumsGenres.id, metagenre.mediums.id as mediumsId, metagenre.mediums.title, metagenre.genres.name, metagenre.mediumsGenres.votes, metagenre.genres.id as genreId
    FROM metagenre.mediums, metagenre.mediumsGenres, metagenre.genres 
    WHERE metagenre.mediums.id = metagenre.mediumsGenres.mediumId AND metagenre.genres.id = metagenre.mediumsGenres.genreId AND metagenre.mediums.id = ${req.params.id} 
    ORDER BY metagenre.mediumsGenres.votes DESC;
    `;
    connection.query(SELECT_ALL_MEDIUMGENRE_BY_SINGLE_MEDIUMID_QUERY, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            })
        }
    })
});

router.get('/mediumsSubgenresView/', (req, res) => {
    const {mediumType} = req.query;
    const SELECT_ALL_MEDIUMSUBGENRE_BY_MEDIUMID_QUERY = `
    SELECT metagenre.mediumsSubgenres.id, metagenre.mediums.id as mediumsId, metagenre.subgenres.id as subgenreId, metagenre.mediums.title, metagenre.subgenres.name, metagenre.mediumsSubgenres.votes, metagenre.mediumsSubgenres.subgenreId
    FROM metagenre.mediums, metagenre.mediumsSubgenres, metagenre.subgenres 
    WHERE metagenre.mediums.id = metagenre.mediumsSubgenres.mediumId AND metagenre.subgenres.id = metagenre.mediumsSubgenres.subgenreId
    AND metagenre.mediums.mediumType = '${mediumType}'
    ORDER BY metagenre.mediumsSubgenres.votes DESC;
    `;
    connection.query(SELECT_ALL_MEDIUMSUBGENRE_BY_MEDIUMID_QUERY, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            })
        }
    })
});

router.get('/mediumsSubgenres/view/:id', (req, res) => {
    const SELECT_ALL_MEDIUMSUBGENRE_BY_SINGLE_MEDIUMID_QUERY = `
    SELECT metagenre.mediumsSubgenres.id, metagenre.mediums.id as mediumsId, metagenre.mediums.title, metagenre.subgenres.name, metagenre.mediumsSubgenres.votes, metagenre.mediumsSubgenres.subgenreId 
    FROM metagenre.mediums, metagenre.mediumsSubgenres, metagenre.subgenres 
    WHERE metagenre.mediums.id = metagenre.mediumsSubgenres.mediumId AND metagenre.subgenres.id = metagenre.mediumsSubgenres.subgenreId AND metagenre.mediums.id = ${req.params.id}
    ORDER BY metagenre.mediumsSubgenres.votes DESC;`
    ;
    connection.query(SELECT_ALL_MEDIUMSUBGENRE_BY_SINGLE_MEDIUMID_QUERY, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            })
        }
    })
});

// http://localhost:4000/username/login?username=something&password=something

router.get('/mediumsGenres/update/:id', verifyToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            const {date, votes, symbol, userId, mediumId, genreId} = req.query;
            
            const symbolMath = (symbol === '-')? '-':'+';
        
            let UPDATE_MEDIUMGENRE_QUERY = `UPDATE metagenre.mediumsGenres SET metagenre.mediumsGenres.votes=${votes}${symbolMath}1 WHERE metagenre.mediumsGenres.id = ${req.params.id};`;
        
            if (symbolMath === '-') {
                UPDATE_MEDIUMGENRE_QUERY += `DELETE FROM metagenre.userBooleanMediumsGenres 
                                            WHERE userId = ${userId}
                                            AND mediumId = ${mediumId}
                                            AND genreId = ${genreId};`;
            } else if (symbolMath === '+') {
                UPDATE_MEDIUMGENRE_QUERY += `INSERT INTO metagenre.userBooleanMediumsGenres(date, userId, mediumId, genreId, voted) 
                                            VALUES('${date}', ${userId}, ${mediumId}, ${genreId}, 1);`;
            }
            console.log(UPDATE_MEDIUMGENRE_QUERY)
            connection.query(UPDATE_MEDIUMGENRE_QUERY, (err, results) => {
                if (err) {
                    return res.send(err)
                } else {
                    res.json({
                        message: 'successfully added new mediumGenre',
                        authData
                    });
                }
            });
        }

    });
});

router.get('/mediumsSubgenres/update/:id', (req, res) => {
    const {date, votes, symbol, userId, mediumId, genreId} = req.query;

    const symbolMath = (symbol === '-') ? '-' : '+';

    /*
        0: UPDATE subgenreId selected
        1: SELECT existing genreIds in mediumGenres
        2: SELECT nonexistent genreId in mediumGenres
    */
    let UPDATE_MEDIUMSUBGENRE_QUERY = `UPDATE metagenre.mediumsSubgenres SET metagenre.mediumsSubgenres.votes=${votes}${symbolMath}1 WHERE metagenre.mediumsSubgenres.id = ${req.params.id};
                                         SELECT r.genreId
                                         FROM metagenre.relationships as r
                                         WHERE EXISTS(SELECT *
                                             FROM metagenre.mediumsGenres as mg WHERE mg.genreId = r.genreId AND mg.mediumId = ${mediumId}) AND r.subgenreId = ${genreId} and r.connection = 1;
                                        SELECT r.genreId
                                        FROM metagenre.relationships as r
                                        WHERE NOT EXISTS(SELECT *
                                        FROM metagenre.mediumsGenres as mg WHERE mg.genreId = r.genreId AND mg.mediumId = ${mediumId}) AND r.subgenreId = ${genreId} and r.connection = 1;`;

    if (symbolMath === '-') {
        UPDATE_MEDIUMSUBGENRE_QUERY += `DELETE FROM metagenre.userBooleanMediumsSubgenres 
                                        WHERE userId = ${userId}
                                        AND mediumId = ${mediumId}
                                        AND subgenreId = ${genreId};`;

        console.log(UPDATE_MEDIUMSUBGENRE_QUERY)
    } else if (symbolMath === '+') {
        UPDATE_MEDIUMSUBGENRE_QUERY += `INSERT INTO metagenre.userBooleanMediumsSubgenres(date, userId, mediumId, subgenreId, voted) 
                                        VALUES('${date}', ${userId}, ${mediumId}, ${genreId}, 1);`;
        console.log(UPDATE_MEDIUMSUBGENRE_QUERY)
    }

    connection.query(UPDATE_MEDIUMSUBGENRE_QUERY, (err, results) => {
        if (err) {
            return res.send(err)
        } else {
            console.log('2')

            const [genreIdsNeedUpdateExist, genreIdsNeedUpdateNonExist] = [results[1], results[2]];

            let UDPATE_AND_INSERT_MEDIUMGENRES = '';
            let i = 0;

            if (genreIdsNeedUpdateExist.length > 0) {
                genreIdsNeedUpdateExist.forEach(function (relationship) {
                    UDPATE_AND_INSERT_MEDIUMGENRES += `UPDATE metagenre.mediumsGenres SET votes = votes ${symbolMath} 1 WHERE genreId = ${relationship.genreId} AND mediumId=${mediumId};`;
                    console.log(`\n${UDPATE_AND_INSERT_MEDIUMGENRES}\n`);
                });
            }

            if (genreIdsNeedUpdateNonExist.length > 0 && symbolMath == '+') {
                genreIdsNeedUpdateNonExist.forEach(function (relationship) {
                    UDPATE_AND_INSERT_MEDIUMGENRES += `INSERT INTO metagenre.mediumsGenres(mediumId, genreId, votes) VALUES(${mediumId}, ${relationship.genreId}, 1);`;

                    console.log(`\n${UDPATE_AND_INSERT_MEDIUMGENRES}\n`);
                });
            }

            connection.query(UDPATE_AND_INSERT_MEDIUMGENRES, (err, results) => {
                if (err) {
                    return res.send(err)
                } else {
                    return res.json({
                        data: results
                    })
                }
            });
        }
    });
});

router.get('/mediumsGenresChecker', (req, res) => {

    const {date, genreName, userId, mediumId, mediumType} = req.query;

    const genres = mediumType === 'genre' ? 'genres' : 'subgenres';
    const subgenres = mediumType === 'genre' ? 'subgenres' : 'genres';
    const mediumsGenres = mediumType === 'genre' ? 'mediumsGenres' : 'mediumsSubgenres';
    const userBoolean = mediumType === 'genre' ? 'userBooleanMediumsGenres' : 'userBooleanMediumsSubgenres';
    const genreId = mediumType === 'genre' ? 'genreId' : 'subgenreId';
    const subgenreId = mediumType === 'genre' ? 'subgenreId' : 'genreId';

    //.replace(/[\/.;! ,:-]+/g, "").toLowerCase().toString();

    let abridgedName = genreName;

    /*
        SELECT:
        0. mediumGenres x genres --> check for name in mediumGenres
        1. genres for searched name --> check for name in genre
        2. mediumsGenre x nicknames x genres --> check for nickname in mediumGenres
        3. genres x nickname --> check for nickname in genres
        4. all genres
        5. all subgenres
        6. Did user already vote?
    */

    const GENRES_AND_MEDIUMSGENRES = `
            SELECT metagenre.${mediumsGenres}.id as mediumGenreId, metagenre.${genres}.name, metagenre.${mediumsGenres}.mediumId, metagenre.${mediumsGenres}.${genreId}, metagenre.${mediumsGenres}.votes as mediumGenreVotes
            FROM metagenre.${mediumsGenres}, metagenre.${genres}
            WHERE metagenre.${mediumsGenres}.${genreId} = metagenre.${genres}.id AND metagenre.${mediumsGenres}.mediumId = ${mediumId} AND metagenre.${genres}.name = '${abridgedName}';

            SELECT * from metagenre.${genres} WHERE metagenre.${genres}.name = '${abridgedName}';

            SELECT metagenre.${mediumsGenres}.id as mediumGenreId, metagenre.${genres}.name as genreName, metagenre.${mediumsGenres}.mediumId, metagenre.${genres}.id as ${genreId}, metagenre.${mediumsGenres}.votes as mediumGenreVotes
            FROM metagenre.${mediumsGenres}, metagenre.${genres}, metagenre.nicknames
            WHERE metagenre.nicknames.${genreId} = metagenre.${genres}.id AND metagenre.${mediumsGenres}.${genreId} = metagenre.${genres}.id AND metagenre.${mediumsGenres}.mediumId = ${mediumId} AND metagenre.nicknames.name = '${abridgedName}';

            SELECT metagenre.${genres}.id
            FROM metagenre.nicknames, metagenre.${genres}
            WHERE metagenre.nicknames.${genreId} = metagenre.${genres}.id AND metagenre.nicknames.name = '${abridgedName}';
            
            SELECT * FROM metagenre.${genres};

            SELECT * FROM metagenre.${subgenres};

            SELECT ubmg.*, g.name
            FROM metagenre.${userBoolean} as ubmg, metagenre.${genres} as g
            WHERE g.id = ubmg.${genreId}
            AND ubmg.userId = ${userId}
            AND g.name = '${abridgedName}'
            AND ubmg.mediumId = ${mediumId}
            UNION
            SELECT ubmg.*, nn.name
            FROM metagenre.${userBoolean} as ubmg, metagenre.nicknames as nn
            WHERE nn.${genreId} = ubmg.${genreId}
            AND ubmg.userId = ${userId}
            AND nn.name = '${abridgedName}'
            AND ubmg.mediumId = ${mediumId};
        
            SELECT ubmg.*
            FROM metagenre.${userBoolean} as ubmg
            WHERE ubmg.userId = ${userId}
            AND ubmg.mediumId = ${mediumId};
        `;

    connection.query(GENRES_AND_MEDIUMSGENRES, (err, results) => {


        if (err) {
            console.log(err)
            return res.send(err)
        } else {
            /*
                if mediumGenre doesn't exist but genre does --> INSERT mediumGenre
                if mediumGenre genre does exist --> UPDATE mediumGenre
                if genre can't be located --> INSERT genre, mediumGenre, relationship (subgenres x new genre)

            */

            let INSERT_MEDIUMGENRE_QUERY;
            let foundOrNewGenreId = 0;
            console.log('attempted?')

            if (results[0].length == 0 && results[1].length == 1) {
                console.log(`abridged: ${results[1][0].name}`);

                INSERT_MEDIUMGENRE_QUERY = `INSERT INTO ${mediumsGenres} (mediumId, ${genreId}, votes) VALUES(${mediumId}, ${results[1][0].id}, 1);`;
                foundOrNewGenreId = results[1][0].id;

            } else if (results[0].length == 1 && results[1].length == 1) {

                INSERT_MEDIUMGENRE_QUERY = `UPDATE metagenre.${mediumsGenres} SET metagenre.${mediumsGenres}.votes=${results[0][0].mediumGenreVotes + 1} WHERE metagenre.${mediumsGenres}.id = ${results[0][0].mediumGenreId};`;
                foundOrNewGenreId = (results[0][0].subgenreId === undefined)?results[0][0].genreId:results[0][0].subgenreId;

            } else if (results[2].length == 0 && results[3].length == 1) {
                INSERT_MEDIUMGENRE_QUERY = `INSERT INTO ${mediumsGenres} (mediumId, ${genreId}, votes) VALUES(${mediumId}, ${results[3][0].id}, 1);`;
                foundOrNewGenreId = results[3][0].id;

            } else if (results[2].length == 1 && results[3].length == 1) {

                INSERT_MEDIUMGENRE_QUERY = `UPDATE metagenre.${mediumsGenres} SET metagenre.${mediumsGenres}.votes=${results[2][0].mediumGenreVotes + 1} WHERE metagenre.${mediumsGenres}.id = ${results[2][0].mediumGenreId};`;
            
                foundOrNewGenreId = (results[2][0].subgenreId === undefined)?results[2][0].genreId:results[2][0].subgenreId;

            } else if (results[0].length == 0 && results[1].length == 0 && results[2].length == 0 && results[3].length == 0) {
                const newGenreAdditionId = results[4].length + 1;

                console.log(`creating new genre: (id: ${newGenreAdditionId}, name: ${abridgedName})`);

                INSERT_MEDIUMGENRE_QUERY = `INSERT INTO metagenre.${genres} (name) VALUES('${abridgedName}');
                                            INSERT INTO metagenre.${mediumsGenres} (mediumId, ${genreId}, votes) VALUES(${mediumId}, ${newGenreAdditionId}, 1);`;

                foundOrNewGenreId = newGenreAdditionId;


                results[5].forEach(result => {
                    INSERT_MEDIUMGENRE_QUERY += `INSERT INTO metagenre.relationships (${subgenreId}, ${genreId}, connection, votes) VALUES(${result.id}, ${newGenreAdditionId}, 0, 0);`;
                });

            } 

            if (results[6].length > 0 || results[7].length >= 3) {
                INSERT_MEDIUMGENRE_QUERY = ``;
            } else if (foundOrNewGenreId !== 0) {
                INSERT_MEDIUMGENRE_QUERY += `INSERT INTO metagenre.${userBoolean}(date, userId, mediumId, ${genreId}, voted) 
                                             VALUES('${date}', ${userId}, ${mediumId}, ${foundOrNewGenreId}, 1);`;
            }


            connection.query(INSERT_MEDIUMGENRE_QUERY, (err, results) => {
                if (err) {
                    return res.send(err)
                } else {
                    console.log(`successfully added ${genres}.`);
                    return res.send(`successfully added ${genres}.`)
                }
            });

        }
    });

});


module.exports = router;