const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.get('/mediumsCreatorsSeries/view/:id', (req, res) => {

    const SELECT_MEDIUMSSERIESCREATORS = `
        SELECT metagenre.mediumsSeries.seriesId, metagenre.series.name as seriesName, metagenre.mediumsCreators.creatorId, metagenre.creators.name as creatorName, metagenre.mediumsSeries.mediumId, metagenre.mediums.title, mr.year
        FROM metagenre.mediumsSeries, metagenre.mediumsCreators, metagenre.series, metagenre.creators, metagenre.mediums, metagenre.mediumsDetails, metagenre.mediumsReleases as mr
        WHERE metagenre.mediumsSeries.seriesId in (select metagenre.mediumsSeries.seriesId from metagenre.mediumsSeries where metagenre.mediumsSeries.mediumId = ${req.params.id})
        AND metagenre.mediumsCreators.creatorId in (select metagenre.mediumsCreators.creatorId from metagenre.mediumsCreators where metagenre.mediumsCreators.mediumId = ${req.params.id})
        AND metagenre.series.id = metagenre.mediumsSeries.seriesId
        AND metagenre.creators.id = metagenre.mediumsCreators.creatorId
        AND metagenre.mediums.id = metagenre.mediumsCreators.mediumId
        AND metagenre.mediums.id = metagenre.mediumsSeries.mediumId
        AND metagenre.mediums.id = mr.mediumId
        AND metagenre.mediums.id = metagenre.mediumsDetails.mediumId;
    `;

    connection.query(SELECT_MEDIUMSSERIESCREATORS, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            })
        }
    })
});

router.get('/series/:id', (req, res) => {

    const SELECT_MEDIUMSSERIESCREATORS = `
        SELECT s.id as seriesId, m.id as mediumId, c.id as creatorId, m.title, c.name as creatorName, s.name as seriesName, mr.year
        FROM metagenre.mediumsSeries as ms, metagenre.mediumsCreators as mc, metagenre.series as s, metagenre.creators as c, metagenre.mediums as m, metagenre.mediumsDetails as md, metagenre.mediumsReleases as mr
        WHERE
        ms.mediumId = m.id
        AND mc.mediumId = m.id
        AND ms.seriesId = s.id
        AND mc.creatorId = c.id
        AND md.mediumId = m.id
        AND mr.mediumId = m.id
        AND seriesId = ${req.params.id};
    `;

    connection.query(SELECT_MEDIUMSSERIESCREATORS, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            })
        }
    })
});

router.get('/creators/:id', (req, res) => {

    const SELECT_MEDIUMSSERIESCREATORS = `
        SELECT s.id as seriesId, m.id as mediumId, c.id as creatorId, m.title, c.name as creatorName, s.name as seriesName, mr.year
        FROM metagenre.mediumsSeries as ms, metagenre.mediumsCreators as mc, metagenre.series as s, metagenre.creators as c, metagenre.mediums as m, metagenre.mediumsDetails as md, metagenre.mediumsReleases as mr
        WHERE
        ms.mediumId = m.id
        AND mc.mediumId = m.id
        AND ms.seriesId = s.id
        AND mc.creatorId = c.id
        AND md.mediumId = m.id
        AND mr.mediumId = m.id
        AND creatorId = ${req.params.id};
    `;

    connection.query(SELECT_MEDIUMSSERIESCREATORS, (err, results) => {
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