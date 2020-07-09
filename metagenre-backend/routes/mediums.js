const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.get('/mediums/', (req, res) => {

    const {mediumType} = req.query;
    const SELECT_ALL_MEDIUMS_QUERY = `SELECT * FROM mediums WHERE mediumType = '${mediumType}';`;

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

router.get('/mediumsForSearch/', (req, res) => {

    const SELECT_ALL_MEDIUMS_QUERY = `SELECT m.id, m.title FROM mediums as m;`;

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

router.get('/mediums/genreless/', (req, res) => {

    const {mediumType} = req.query;
    
    const SELECT_ALL_MEDIUMS_QUERY = `
    SELECT m.*
        FROM metagenre.mediums as m
    WHERE
    NOT EXISTS(SELECT ms.*
        FROM metagenre.mediumsSubgenres as ms WHERE ms.mediumId = m.id)
    AND
    NOT EXISTS(SELECT mg.*
               FROM metagenre.mediumsGenres as mg WHERE mg.mediumId = m.id)
    AND
    m.mediumType = '${mediumType}';
    `;

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

router.get('/mediums/add', (req, res) => {
    const { title, mediumType } = req.query;
    const INSERT_MEDIUM_QUERY = `INSERT INTO mediums (title, mediumType) VALUES('${title}', '${mediumType}')`;
    connection.query(INSERT_MEDIUM_QUERY, (err, results) => {
        if (err) {
            return res.send(err)
        } else {
            return res.send('successfully added new medium')
        }
    });
});

module.exports = router;