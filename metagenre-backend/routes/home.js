const express = require('express');
const router = express.Router();
const connection = require('../connection');
const { route } = require('./relationships');

router.get('/mediumsFrontPage/', (req, res) => {
    const SELECT_MEDIUMSFRONTPAGE_QUERY = `
        SELECT concat(m.title, ' - ', (SELECT count(  DISTINCT ( mg2.votes ) ) FROM metagenre.mediumsGenres AS mg2 WHERE mg2.mediumId = mg.mediumId AND mg2.votes >= mg.votes)) as rank, m.id, m.title, m.mediumType, mg.id as mediumGenreId, g.name, mg.votes, md.shortDesc, mel.amazon, mel.goodreads, mel.metacritic, mel.opencritic, mel.rateyourmusic, mel.youtube, mel.wiki, mel.howlongtobeat, mel.fandomPrefix, mel.fandomSuffix
        FROM metagenre.mediumsGenres AS mg, metagenre.genres AS g, metagenre.mediums AS m, metagenre.mediumsFrontPage AS mfp, metagenre.mediumsDetails AS md, metagenre.mediumsExternalLinks AS mel
        WHERE(SELECT count(  DISTINCT ( mg2.votes ) ) FROM metagenre.mediumsGenres AS mg2 WHERE mg2.mediumId = mg.mediumId AND mg2.votes >= mg.votes) <= 2
        AND mg.genreId = g.id AND mg.mediumId = m.id
        AND mfp.mediumId = m.id
        AND md.mediumId = m.id
        AND mel.mediumId = m.id
        ORDER BY rank;
    `;
    connection.query(SELECT_MEDIUMSFRONTPAGE_QUERY, (err, results) => {
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
