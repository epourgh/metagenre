const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.get('/similar/:id', (req, res) => {

    const SELECT_SIMILAR_QUERY = `
        SELECT m.id, m.title, s.firstChoicePercentage percentage
        FROM metagenre.similar s, metagenre.mediums m
        WHERE m.id = s.firstChoice
        AND s.mediumId = ${req.params.id};
        SELECT m.id, m.title, s.secondChoicePercentage percentage
        FROM metagenre.similar s, metagenre.mediums m
        WHERE m.id = s.secondChoice
        AND s.mediumId = ${req.params.id};
        SELECT m.id, m.title, s.thirdChoicePercentage percentage
        FROM metagenre.similar s, metagenre.mediums m
        WHERE m.id = s.thirdChoice
        AND s.mediumId = ${req.params.id};
    `;

    connection.query(SELECT_SIMILAR_QUERY, (err, results) => {

        console.log(results);

        if (err) {
            return res.send(err);
        } else {
           return res.json({
               data: results
           })
        }
    })
});

// SELECT g.name, ranked.mediumId, ranked.votes
// FROM metagenre.genres g,
//     (SELECT * ,
//         @count: = IF(@currentMediumId = mg.mediumId, @count + 1, 1) AS count,
//         @currentMediumId: = mg.mediumId FROM metagenre.mediumsGenres mg ORDER BY mg.mediumId DESC, mg.votes DESC
//     ) ranked
// WHERE count <= 2 AND ranked.genreId = g.id
// UNION
// SELECT s.name, ranked2.mediumId, ranked2.votes
// FROM metagenre.subgenres s,
//     (SELECT * ,
//         @count: = IF(@currentMediumId = ms.mediumId, @count + 1, 1) AS count,
//         @currentMediumId: = ms.mediumId FROM metagenre.mediumsSubgenres ms ORDER BY ms.mediumId DESC, ms.votes DESC
//     ) ranked2
// WHERE count <= 2 AND ranked2.subgenreId = s.id
// ORDER BY votes DESC, mediumId ASC;

router.get('/similar/', (req, res) => {

    const SELECT_ALL_MEDIUMS_QUERY = `
            SELECT g.name, ranked.mediumId, ranked.votes
            FROM metagenre.genres g, metagenre.mediumsGenres ranked
            WHERE(select count( * ) from metagenre.mediumsGenres as mg2 where mg2.mediumId = ranked.mediumId and mg2.votes >= ranked.votes) <= 3
            AND ranked.genreId = g.id
            UNION
            SELECT s.name, ranked2.mediumId, ranked2.votes
            FROM metagenre.subgenres s, metagenre.mediumsSubgenres ranked2
            WHERE(select count( * ) from metagenre.mediumsGenres as mg2 where mg2.mediumId = ranked2.mediumId and mg2.votes >= ranked2.votes) <= 3
            AND ranked2.subgenreId = s.id
            ORDER BY votes DESC, mediumId ASC;
        `;

    
    connection.query(SELECT_ALL_MEDIUMS_QUERY, (err, results) => {

        setup = (mySQLArray) => {

            console.log(mySQLArray);

            let uniqueMediumIds = [];
            let obj = [];

            for (var i in mySQLArray) {

                if (obj[mySQLArray[i].mediumId] === undefined) {
                    obj[mySQLArray[i].mediumId] = {
                        mediumId: mySQLArray[i].mediumId,
                        array: []
                    };

                    uniqueMediumIds.push(mySQLArray[i].mediumId);

                };

                obj[mySQLArray[i].mediumId].array.push({
                    n: mySQLArray[i].title
                });

            }

            return [uniqueMediumIds, obj];
        };

        organizeArray = (ogArray) => {
            var ogArrayIndexed = ogArray.concat([]);

            // sorting
            ogArrayIndexed.sort(function (left, right) {
                return right.n - left.n;
            });

            return ogArrayIndexed;

        }

        indexComparison = (ogArray, ogArrayIndexed, secondArray, secondArrayIndexed, id1, id2) => {

            let [score, i, j] = [0, 0, 0];
            let [iTotal, jTotal] = [ogArray.length, secondArray.length];

            // asc values, 
            do {
                if (ogArray[i].n === secondArray[j].n) {

                    let addition = 10 - Math.abs((1 + ogArrayIndexed.indexOf(ogArray[i])) - (1 + secondArrayIndexed.indexOf(secondArray[j])));
                    score += addition;

                    j++;
                    i++;
                } else if (ogArray[i].n > secondArray[j].n &&
                    j < jTotal) {
                    j++;
                } else if (ogArray[i].n < secondArray[j].n &&
                    i < iTotal) {
                    i++;
                } else if (i == iTotal) {
                    j = jTotal;
                } else if (j == jTotal) {
                    i = iTotal
                }
            } while (i < iTotal && j < jTotal)

            return {
                id: id2,
                n: score
            };
        }

        let [mediumIds, obj] = setup(results);
        let indexComparisonArrayToOrder = [];
        let completeQuery = '';

        for (let i = 0; i < mediumIds.length; i++) {

            indexComparisonArrayToOrder[mediumIds[i]] = {
                array: []
            };

            let tempArray = [];

            for (let j = 0; j < mediumIds.length; j++) {
                if (i !== j) {
                    // indexComparison(object1, orgObj1, object1, orgObj1, 1, 1)
                    tempArray.push(indexComparison(obj[mediumIds[i]].array, organizeArray(obj[mediumIds[i]].array), obj[mediumIds[j]].array, organizeArray(obj[mediumIds[j]].array), mediumIds[i], mediumIds[j]));
                }
            }

            indexComparisonArrayToOrder[mediumIds[i]].array.push(organizeArray(tempArray))

            let tempQueryString = `UPDATE metagenre.similar SET `;

            if (indexComparisonArrayToOrder[mediumIds[i]].array[0][0] !== undefined) {
                tempQueryString += `firstChoice = ${indexComparisonArrayToOrder[mediumIds[i]].array[0][0].id}, `;
                tempQueryString += `firstChoicePercentage = ${indexComparisonArrayToOrder[mediumIds[i]].array[0][0].n}, `;
            }

            if (indexComparisonArrayToOrder[mediumIds[i]].array[0][1] !== undefined) {
                tempQueryString += `secondChoice = ${indexComparisonArrayToOrder[mediumIds[i]].array[0][1].id}, `;
                tempQueryString += `secondChoicePercentage = ${indexComparisonArrayToOrder[mediumIds[i]].array[0][1].n}, `;
            }

            if (indexComparisonArrayToOrder[mediumIds[i]].array[0][1] !== undefined) {
                tempQueryString += `thirdChoice = ${indexComparisonArrayToOrder[mediumIds[i]].array[0][2].id}, `;
                tempQueryString += `thirdChoicePercentage = ${indexComparisonArrayToOrder[mediumIds[i]].array[0][2].n}`;
            }

            tempQueryString += ` WHERE mediumId=${mediumIds[i]};`;

            completeQuery += tempQueryString;

            j = 0;
        }

        console.log('push these genres/subgenres:');

        console.log(completeQuery);

        connection.query(completeQuery, (err, results) => {
            if (err) {
                return res.send(err);
            } else {
                return res.json({
                    data: results
                })
            }
        })

    })


});


module.exports = router;