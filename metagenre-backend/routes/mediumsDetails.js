const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.get('/mediumsDetails/:id', (req, res) => {

    const SELECT_MEDIUM_DETAILS = `
    SELECT m.title, md.shortDesc, md.description, mp.numberOfGalleryPics, mr.platformId1, mr.year, mr.month, mr.day, mr.platformId2, mr.platformId3, mr.platformId4, mr.platformId5, mr.regionId1, mr.regionId2, mr.regionId3, mr.regionId4, mr.regionId5, mr.unabridged, mr.remaster, mr.remake, mr.directorsCut
    FROM metagenre.mediumsDetails as md, metagenre.mediumsPictures as mp, metagenre.mediums as m, metagenre.mediumsReleases as mr
    WHERE md.mediumId = ${req.params.id}
    AND mp.mediumId = ${req.params.id}
    AND mr.mediumId = ${req.params.id}
    AND m.id = ${req.params.id};
    `;

    connection.query(SELECT_MEDIUM_DETAILS, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            })
        }
    })
});

router.get('/platforms', (req, res) => {

    const SELECT_PLATFORMS = `SELECT * FROM metagenre.platforms`;

    connection.query(SELECT_PLATFORMS, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            })
        }
    })
});


router.get('/regions', (req, res) => {

    const SELECT_REGIONS = `SELECT * FROM metagenre.regions`;

    connection.query(SELECT_REGIONS, (err, results) => {
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