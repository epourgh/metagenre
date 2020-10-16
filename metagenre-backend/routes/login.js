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

createRandomAlphaNumChecksum = (length, chars) => {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

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

    var emailedChecksum = createRandomAlphaNumChecksum(6, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

    const INSERT_MEDIUM_QUERY = `INSERT INTO usernames (username, password, email, emailedChecksum, verified) VALUES('${username}', '${password}', '${email}', '${emailedChecksum}', 0)`;

    async function main() {

        infoObject.to = `${email}, doscaseal@gmail.com`;
        infoObject.text = `Hi ${username}!\nYour one time verification code is: ${emailedChecksum}\n-Metagenre`;

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


router.get('/verified/', (req, res) => {
    const { username, inputChecksum } = req.query;

    const SELECT_USERNAME_QUERY = `SELECT * FROM metagenre.usernames u WHERE u.username = '${username}';`;

    connection.query(SELECT_USERNAME_QUERY, (err, results) => {

        if (err) {
            return res.send(err)
        } else {

            if (results[0].verified === 1) {
                return res.send('User is already verified.')
            } else if (inputChecksum === results[0].emailedChecksum) {
                async function main() {
                    infoObject.to = `${results[0].email}, doscaseal@gmail.com`;
                    infoObject.text = `Hi ${results[0].username}!\nYou have verified your account.\n-Metagenre`;
                    let transporter = nodemailer.createTransport(transporterObject);
                    let info = await transporter.sendMail(infoObject);
                    console.log("Message sent: %s", info.messageId);
                    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                }
    
                main().catch(console.error);
    
                const UPDATE_USERNAME_BOOLEAN = `UPDATE metagenre.usernames u SET u.verfied = 1 WHERE u.id = ${results[0].id}`;
    
                connection.query(UPDATE_USERNAME_BOOLEAN, (err, results) => {
                    if (err) {
                        return res.send(err)
                    } else {
                        return res.send('successfully verified.')
                    }
                });
            }

        }
    });
});

router.get('/retrieve/add', (req, res) => {
    requestedPasswordrequestedPassword

    var emailedChecksum = createRandomAlphaNumChecksum(6, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

    const UPDATE_USERNAME_BOOLEAN = `UPDATE metagenre.usernames u SET u.requestedPassword=1, u.emailedChecksum=${emailedChecksum} WHERE u.username = ${username}`;

    async function main() {
        infoObject.to = `${results[0].email}, doscaseal@gmail.com`;
        infoObject.text = `Hi ${results[0].username}!\nYou have requested to change your password, update with this code: ${emailedChecksum}.\n-Metagenre`;
        let transporter = nodemailer.createTransport(transporterObject);
        let info = await transporter.sendMail(infoObject);
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

    connection.query(UPDATE_USERNAME_BOOLEAN, (err, results) => {
        if (err) {
            return res.send(err)
        } else {
            return res.send('Requested password.')
        }
    });
    
});

router.get('/retrieve/update', (req, res) => {
    const { username, inputChecksum } = req.query;

    const SELECT_USERNAME_QUERY = `SELECT * FROM metagenre.usernames u WHERE u.username = '${username}';`;

    connection.query(SELECT_USERNAME_QUERY, (err, results) => {

        if (err) {
            return res.send(err)
        } else {

            if (results[0].requestedPassword === 1 && results[0].emailedChecksum == inputChecksum) {

                const UPDATE_USERNAME_BOOLEAN = `UPDATE metagenre.usernames u SET u.requestedPassword=0, u.allowPasswordReset=1 WHERE u.username = ${username}`;

                connection.query(UPDATE_USERNAME_BOOLEAN, (err, results) => {
                    if (err) {
                        return res.send(err)
                    } else {
                        return res.send('good')
                    }
                });

            }
        }
    });

});


router.get('/password/update', (req, res) => {
    const {username, password} = req.query;

    const SELECT_USERNAME_QUERY = `SELECT * FROM metagenre.usernames u WHERE u.username = '${username}';`;

    connection.query(SELECT_USERNAME_QUERY, (err, results) => {

        if (err) {
            return res.send(err)
        } else {

            if (results[0].allowPasswordRese === 1) {

                const UPDATE_USERNAME_BOOLEAN = `UPDATE metagenre.usernames u SET u.password=${password} WHERE u.username = ${username}`;

                connection.query(UPDATE_USERNAME_BOOLEAN, (err, results) => {
                    if (err) {
                        return res.send(err)
                    } else {
                        return res.send('Password changed.')
                    }
                });

            }
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