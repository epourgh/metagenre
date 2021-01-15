const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.get('/mediumExternalLinks/:id', (req, res) => {
    const SELECT_MEDIUM_EXT_LINKS_QUERY = `
    SELECT mel.amazon, mel.goodreads, mel.metacritic, mel.opencritic, mel.rateyourmusic, mel.youtube, mel.wiki, mel.fandomPrefix, mel.fandomSuffix
    FROM metagenre.mediumsExternalLinks as mel
    WHERE mel.mediumId = ${req.params.id};
    `;
    connection.query(SELECT_MEDIUM_EXT_LINKS_QUERY, (err, results) => {
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
