const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.get('/securityQuestions', (req, res) => {

    const SELECT_ALL_SECURITY_QUESTIONS_QUERY = `SELECT * FROM metagenre.securityQuestions;`;
    connection.query(SELECT_ALL_SECURITY_QUESTIONS_QUERY, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            })
        }
    })
});


router.get('/username/add', (req, res) => {
    const { username, password } = req.query;
    const INSERT_MEDIUM_QUERY = `INSERT INTO usernames (username, password) VALUES('${username}', '${password}')`;
    connection.query(INSERT_MEDIUM_QUERY, (err, results) => {
        if (err) {
            return res.send(err)
        } else {
            return res.send('successfully registered.')
        }
    });
});


router.get('/username/login', (req, res) => {
    const { username, password } = req.query;
    const SELECT_LOGIN_QUERY = `SELECT * FROM metagenre.usernames 
                                                 WHERE metagenre.usernames.username = '${username}'
                                                 AND metagenre.usernames.password = '${password}'`;
    connection.query(SELECT_LOGIN_QUERY, (err, results) => {
        if (err) {
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });
});

module.exports = router;