const express = require('express');
const router = express.Router();
const connection = require('../connection');
const { route } = require('./relationships');

router.get('/mediumsFrontPage/', (req, res) => {
    const SELECT_MEDIUMSFRONTPAGE_QUERY = `
    select m.id, m.title, m.mediumType, mg.id as mediumGenreId, g.name, mg.votes, md.shortDesc, mel.amazon, mel.goodreads, mel.metacritic, mel.opencritic, mel.rateyourmusic, mel.youtube, mel.wiki, mel.howlongtobeat, mel.fandomPrefix, mel.fandomSuffix
    from metagenre.mediumsGenres as mg, metagenre.genres as g, metagenre.mediums as m, metagenre.mediumsFrontPage as mfp, metagenre.mediumsDetails as md, metagenre.mediumsExternalLinks as mel
    where(select count( * ) from metagenre.mediumsGenres as mg2 where mg2.mediumId = mg.mediumId and mg2.votes >= mg.votes) <= 2
    AND mg.genreId = g.id AND mg.mediumId = m.id
    AND mfp.mediumId = m.id
    AND md.mediumId = m.id
    AND mel.mediumId = m.id;
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
