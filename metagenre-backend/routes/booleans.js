const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.get('/userBooleanMediumsGenres/', (req, res) => {

    const {userId, mediumId} = req.query;
    
    const SELECT_ALL_USERBOOLEANMEDIUMGENRES_QUERY = `
        SELECT ubmg.genreId
        FROM metagenre.userBooleanMediumsGenres as ubmg
        WHERE mediumId = ${mediumId}
        AND userId = ${userId};
    `;

    connection.query(SELECT_ALL_USERBOOLEANMEDIUMGENRES_QUERY, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            })
        }
    })
});

router.get('/userBooleanMediumsSubgenres/', (req, res) => {

    const {userId, mediumId} = req.query;
    
    const SELECT_ALL_USERBOOLEANMEDIUMGENRES_QUERY = `
        SELECT ubmg.subgenreId
        FROM metagenre.userBooleanMediumsSubgenres as ubmg
        WHERE mediumId = ${mediumId}
        AND userId = ${userId};
    `;

    connection.query(SELECT_ALL_USERBOOLEANMEDIUMGENRES_QUERY, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            })
        }
    })
});

module.exports = router;