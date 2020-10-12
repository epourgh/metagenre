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


router.get('/userBooleanMediums/:id', (req, res) => {
    
    const SELECT_ALL_USERBOOLEANMEDIUM_QUERY = `
            SELECT id, date, mediumId, ubmg.genreId as genreId, '-' as subgenreId FROM metagenre.userBooleanMediumsGenres as ubmg WHERE userId = ${req.params.id}
            UNION 
            SELECT id, date, mediumId, '-' as genreId, ubms.subgenreId as subgenreId FROM metagenre.userBooleanMediumsSubgenres as ubms WHERE userId = ${req.params.id} ORDER BY id DESC LIMIT 10;
    `;

    connection.query(SELECT_ALL_USERBOOLEANMEDIUM_QUERY, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            })
        }
    })
});


router.get('/userBooleanRelationships/', (req, res) => {

    const {userId, genreId} = req.query;
    
    const SELECT_USERBOOLEANRELATIONSHIPS_QUERY = `SELECT s.name, ubr.genreId, ubr.subgenreId, ubr.voted FROM metagenre.userBooleanRelationships ubr, metagenre.subgenres s WHERE ubr.userId = ${userId} AND ubr.genreId = ${genreId} AND ubr.subgenreId = s.id;`;
    
    connection.query(SELECT_USERBOOLEANRELATIONSHIPS_QUERY, (err, results) => {
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