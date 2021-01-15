const express = require('express');
const router = express.Router();
const connection = require('../connection');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verify.js');



router.use(express.json());
router.post('/relationships', verifyToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            
            const { date, genreId, subgenreId, userId, symbol } = req.body;


            const symbolMath = (symbol === '-') ? '-' : '+';

            /*
            SELECT: 
            0. RelationshipsTotalTally: subgenre total votes (results[0][0])
            1. Relationship: genres voted for a subgenre (results[1][i]) WHERE a mediumGenre row (for each Medium) exists
            For vote removal only; currently separate from mediumVotesModifier()
            2. mediumGenres / Subgenres: mediumGenreId, mediumSubgenreId, mediumGenreVotes, mediumSubgenreVotes (results[2][i])
            3. Relationship: Individual Subgenre x Genre (results[3][0])
            4. Relationship: genres voted for a subgenre (results[1][i]) WHERE a mediumGenre row (for each Medium) DOES NOT exist
            For additions only; within mediumVotesModifier()
            */

            const MULTI_SELECT_RELATIONSHIP_QUERIES = `
                SELECT * FROM metagenre.relationshipsTotalTally WHERE subgenreId=${subgenreId};
                SELECT r.*, mg.id as mediumGenreId, ms.votes as mediumSubgenreVotes
                FROM metagenre.relationships as r, metagenre.mediums as m, metagenre.mediumsSubgenres as ms, metagenre.mediumsGenres as mg
                WHERE EXISTS(SELECT * FROM metagenre.mediumsGenres as mg WHERE mg.genreId = r.genreId AND mg.mediumId = m.id) AND ms.subgenreId = r.subgenreId AND m.id = ms.mediumId AND m.id = mg.mediumId AND mg.genreId = r.genreId AND r.subgenreId = ${subgenreId};
                SELECT metagenre.mediumsGenres.genreId, metagenre.mediumsSubgenres.subgenreId, metagenre.mediumsGenres.id as mediumGenreId, metagenre.mediumsSubgenres.id as mediumSubgenreId, metagenre.mediumsGenres.votes as mediumGenreVotes, metagenre.mediumsSubgenres.votes as mediumSubgenreVotes
                FROM metagenre.mediumsSubgenres, metagenre.mediumsGenres
                WHERE metagenre.mediumsSubgenres.mediumId = metagenre.mediumsGenres.mediumId AND metagenre.mediumsSubgenres.subgenreId=${subgenreId};
                SELECT * FROM metagenre.relationships WHERE genreId=${genreId} AND subgenreId=${subgenreId};
                SELECT r.*, ms.mediumId as mediumId, ms.votes as mediumSubgenreVotes
                FROM metagenre.relationships as r, metagenre.mediums as m, metagenre.mediumsSubgenres as ms
                WHERE NOT EXISTS(SELECT * FROM metagenre.mediumsGenres as mg WHERE mg.genreId = r.genreId AND mg.mediumId = m.id) AND ms.subgenreId = r.subgenreId AND m.id = ms.mediumId AND r.subgenreId = ${subgenreId} AND r.genreId=${genreId};
                SELECT * FROM metagenre.userBooleanRelationships WHERE genreId = ${genreId} AND subgenreId = ${subgenreId} AND userId = ${userId};
            `;

            connection.query(MULTI_SELECT_RELATIONSHIP_QUERIES, (err, results) => {

                if (err) {
                    return res.send(err);
                } else {

                    const [relTotal, relSubgenreMediumGenresExist, mediumsGenresSubgenres, relClicked, relSubgenreMediumGenresNotExist, userBoolean] =
                        [results[0][0], results[1], results[2], results[3][0], results[4][0], results[5][0]];
                        
                    const dispatchToDatabase = (MULTI_QUERY) => {

                        console.log('dispatching...');
                        console.log(MULTI_QUERY);

                        connection.query(MULTI_QUERY, (err, updateRes) => {
                            if (err) {
                                return res.send(err);
                            } else {
                                return res.json({
                                    data: updateRes,
                                    authData
                                })
                            }
                        })
                    };

                    const relationshipViewModelAdd = (subgenreId, genreId) => {

                        if (typeof relClicked != "undefined") {
                            // UPDATE relationship
                            return `UPDATE metagenre.relationships SET votes = votes + 1 WHERE subgenreID = ${subgenreId} AND genreID = ${genreId};`;
                        } else {
                            // INSERT relationship
                            return `INSERT INTO metagenre.relationships (subgenreId, genreId, connection, votes) VALUES(${subgenreId}, ${genreId}, 1, 1);`;
                        }

                    }

                    const relationshipViewModelSubtract = (subgenreId, genreId) => {

                        if (typeof relClicked != "undefined" && relClicked.votes > 0) {
                            // UPDATE relationship
                            return `UPDATE metagenre.relationships SET votes = votes - 1 WHERE subgenreID = ${subgenreId} AND genreID = ${genreId};`;
                        }

                    }

                    const checkPercentageGenreToTotalViewModel = (subgenreId, genreId) => {

                        console.log(`genreId: ${genreId}`)

                        let multiTempMultiQuery = '';

                        if (relClicked.connection === 0) {

                            console.log(`genreId: ${genreId}`)

                            if ((relClicked.votes + 1) / (relTotal.votes + 1) >= .5 || 
                                (relClicked.votes + 1) / (relTotal.votes + 1) == Infinity) {

                                console.log('not connected & majority')

                                // UPDATE relationship
                                multiTempMultiQuery += `UPDATE metagenre.relationships SET connection = 1 WHERE subgenreID = ${subgenreId} AND genreID = ${genreId};`;
                                multiTempMultiQuery += mediumVotesModifier(genreId, '+');

                            }

                        } else if (relClicked.connection === 1) {

                            console.log(`genreId: ${genreId}`)

                            if ((relClicked.votes + 1) / (relTotal.votes + 1) < .5) {

                                console.log('not connected & not majority')

                                multiTempMultiQuery += `UPDATE metagenre.relationships SET connection = 0 WHERE subgenreID = ${subgenreId} AND genreID = ${genreId};`;

                                multiTempMultiQuery += mediumVotesModifier(genreId, '-');

                            }

                        }

                        relSubgenreMediumGenresExist.forEach(function (genre) {

                            console.log(`${genre.genreId} != ${genreId}`);

                            if (genre.genreId != genreId &&
                                genre.votes / (relTotal.votes + 1) < .5 &&
                                genre.connection === 1) {

                                // UPDATE genre
                                multiTempMultiQuery += `UPDATE metagenre.relationships SET connection = 0 WHERE subgenreID = ${subgenreId} AND genreID = ${genre.genreId};`;

                                multiTempMultiQuery += `UPDATE metagenre.mediumsGenres SET votes = votes - ${genre.mediumSubgenreVotes} WHERE id = ${genre.mediumGenreId};`;
                            }

                        });

                        multiTempMultiQuery += `UPDATE metagenre.relationshipsTotalTally SET votes = votes + 1 WHERE subgenreID = ${subgenreId};`;
                        return multiTempMultiQuery;

                    }

                    const checkPercentageGenreToTotalViewModelSubtract = (subgenreId, genreId) => {

                        console.log(`genreId: ${genreId}`)

                        let multiTempMultiQuery = '';

                        if (relClicked.connection === 0) {

                            console.log('do nothing')

                        } else if (relClicked.connection === 1) {

                            console.log(`genreId: ${genreId}`)

                            if ((relClicked.votes - 1) / (relTotal.votes - 1) < .5) {

                                console.log('not connected & not majority')

                                multiTempMultiQuery += `UPDATE metagenre.relationships SET connection = 0 WHERE subgenreID = ${subgenreId} AND genreID = ${genreId};`;

                                multiTempMultiQuery += mediumVotesModifier(genreId, '-');

                            }

                        }

                        relSubgenreMediumGenresExist.forEach(function (genre) {

                            console.log(`${genre.genreId} != ${genreId}`);

                            if (genre.genreId != genreId &&
                                genre.votes / (relTotal.votes - 1) < .5 &&
                                genre.connection === 1) {

                                // UPDATE genre
                                multiTempMultiQuery += `UPDATE metagenre.relationships SET connection = 0 WHERE subgenreID = ${subgenreId} AND genreID = ${genre.genreId};`;

                                multiTempMultiQuery += `UPDATE metagenre.mediumsGenres SET votes = votes - ${genre.mediumSubgenreVotes} WHERE id = ${genre.mediumGenreId};`;
                            }

                        });

                        multiTempMultiQuery += `UPDATE metagenre.relationshipsTotalTally SET votes = votes - 1 WHERE subgenreID = ${subgenreId};`;
                        return multiTempMultiQuery;

                    }



                    // subgenres and genres are no longer fixed in an array

                    const mediumVotesModifier = (loopedGenreId, choice) => {

                        let stringOfUpdates = '';
                        console.log(`START: ${stringOfUpdates}`);

                        mediumsGenresSubgenres.forEach(function (mediumsGenreSubgenre) {
                            if (mediumsGenreSubgenre.genreId == loopedGenreId) {
                                stringOfUpdates += `UPDATE metagenre.mediumsGenres SET votes = votes ${choice} ${mediumsGenreSubgenre.mediumSubgenreVotes} WHERE id = ${mediumsGenreSubgenre.mediumGenreId};`;
                                console.log(`\n${choice}: ${stringOfUpdates}\n`);
                            }
                        });

                        if (choice === '+' && relSubgenreMediumGenresNotExist !== undefined) {
                            console.log('relSubgenreMediumGenresNotExist')
                            console.log(relSubgenreMediumGenresNotExist);
                            if(relSubgenreMediumGenresNotExist.length > 1) {
                                relSubgenreMediumGenresNotExist.forEach(function (mediumGenreSubgenre) {
                                    stringOfUpdates += `INSERT INTO metagenre.mediumsGenres (mediumId, genreId, votes) VALUES(${mediumGenreSubgenre.mediumId}, ${mediumGenreSubgenre.genreId}, ${mediumGenreSubgenre.mediumSubgenreVotes});`;
                                });
                            } else if (relSubgenreMediumGenresNotExist.id !== undefined) {
                                stringOfUpdates += `INSERT INTO metagenre.mediumsGenres (mediumId, genreId, votes) VALUES(${relSubgenreMediumGenresNotExist.mediumId}, ${relSubgenreMediumGenresNotExist.genreId}, ${relSubgenreMediumGenresNotExist.mediumSubgenreVotes});`;
                            }
                        }
        
                        return stringOfUpdates;

                    };

                    const userBooleanFunViewModel = (date, subgenreId, genreId, userId, symbol) => {

                        let userBooleanQuery;

                        if (typeof userBoolean != "undefined") {

                            userBooleanQuery = `DELETE FROM metagenre.userBooleanRelationships WHERE id=${userBoolean.id};`;
                        } else {
                            userBooleanQuery = `INSERT INTO metagenre.userBooleanRelationships (date, userId, subgenreId, genreId, voted) VALUES('${date}', ${userId}, ${subgenreId}, ${genreId}, 1);`
                        }

                        return userBooleanQuery;
                    }


                    // IIFE CONSTRUCTOR FUNCTION
                    ((date, subgenreId, genreId, userId, symbol) => {

                        console.log(`CONSTRUCTOR \ngenreId: ${genreId}\nsubgenreId: ${subgenreId}\nAction: ${symbolMath}`)

                        let MULTI_QUERY = userBooleanFunViewModel(date, subgenreId, genreId, userId, symbol);

                        if (symbolMath === '+') {
                            MULTI_QUERY += relationshipViewModelAdd(subgenreId, genreId, symbol);
                            MULTI_QUERY += checkPercentageGenreToTotalViewModel(subgenreId, genreId, symbol);
                        } else {
                            MULTI_QUERY += relationshipViewModelSubtract(subgenreId, genreId, symbol);
                            MULTI_QUERY += checkPercentageGenreToTotalViewModelSubtract(subgenreId, genreId, symbol);
                        }

                        dispatchToDatabase(MULTI_QUERY);
                    })(date, subgenreId, genreId, userId, symbol);


                }
            });
        }
    });

});

/* 
 *
--------------------------------------------------------------------------------------------------------------------------------------------
 *
 */

router.get('/genreSubgenres', (req, res) => {

            const {genreId} = req.query;


            const GENRE_SUBGENRES_QUERY = `
                SELECT r.id, r.genreId, g.name as genreName, r.subgenreId, s.name as subgenreName, r.votes, rtt.votes as totalVotesInSubgenre
                FROM metagenre.relationships r, metagenre.genres g, metagenre.subgenres s, metagenre.relationshipsTotalTally RTT
                WHERE r.subgenreId = s.id AND r.genreId = g.id AND rtt.id = s.id
                AND r.genreId = ${genreId} AND r.votes > (rtt.votes / 2);
            `;

            connection.query(GENRE_SUBGENRES_QUERY, (err, results) => {
                if (err) {
                    return res.send(err);
                } else {
                    return res.json({
                        data: results
                    })
                }
            });
});

router.get('/genreSubgenresDesc', (req, res) => {

            const {genreId} = req.query;

            const GENRE_SUBGENRES_QUERY = `
                SELECT r.subgenreId, s.name, r.votes, rtt.votes totalVotes FROM metagenre.relationships r, metagenre.relationshipsTotalTally rtt, metagenre.subgenres s
                WHERE genreId = ${genreId} AND r.subgenreId = rtt.subgenreId AND s.id = r.subgenreId ORDER BY r.votes DESC;
            `;

            connection.query(GENRE_SUBGENRES_QUERY, (err, results) => {
                if (err) {
                    return res.send(err);
                } else {
                    return res.json({
                        data: results
                    })
                }
            });
});

module.exports = router;