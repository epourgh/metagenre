const express = require('express');
const router = express.Router();
const connection = require('../connection');
const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
const transporterObject = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'doscaseal@gmail.com',
        pass: '',
    },
};

let infoObject = {
    from: '"Metagenre" <doscaseal@gmail.com>', // sender address
    to: "", // list of receivers
    subject: "METAGENRE TEST", // Subject line
    text: "", // plain text body
    html: "<b>Hello world?</b>", // html body
};

router.get('/mail/', (req, res) => {

    async function main() {

        console.log('start')

        
        let transporter = nodemailer.createTransport(transporterObject);

        infoObject.to = "ampourgh@gmail.com, doscaseal@gmail.com";

        // send mail with defined transport object
        let info = await transporter.sendMail(infoObject);

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    }

    main().catch(console.error);

})

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
    const { username, password, email } = req.query;


    function createRandomAlphaNumChecksum(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }
    var emailedChecksum = createRandomAlphaNumChecksum(6, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

    const INSERT_MEDIUM_QUERY = `INSERT INTO usernames (username, password, email, emailedChecksum, verified) VALUES('${username}', '${password}', '${email}', '${emailedChecksum}', 0)`;

    async function main() {

        infoObject.to = `${email}, doscaseal@gmail.com`;
        infoObject.text = `Hi ${name}!\nYour one time verification code is: ${emailedChecksum}\n-Metagenre`;

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport(transporterObject);
        

        // send mail with defined transport object
        let info = await transporter.sendMail(infoObject);

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    }

    main().catch(console.error);

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