const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.get('/genres/', (req, res) => {

    const SELECT_ALL_MEDIUMS_QUERY = `SELECT * FROM genres;`;

    connection.query(SELECT_ALL_MEDIUMS_QUERY, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            })
        }
    })
});

router.get('/subgenres/', (req, res) => {

    const SELECT_ALL_MEDIUMS_QUERY = `SELECT * FROM subgenres;`;

    connection.query(SELECT_ALL_MEDIUMS_QUERY, (err, results) => {
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