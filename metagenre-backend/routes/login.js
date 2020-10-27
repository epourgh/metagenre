const express = require('express');
const router = express.Router();
const connection = require('../connection');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const compare = require('../middleware/comparePasswords');


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
    html: "", // html body
};

createRandomAlphaNumChecksum = (length, chars) => {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}


// @route   GET smtp
// @desc    Test mailing service
// @access  Public
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
    const { username, displayName, password, email, securityQuestion1id, securityQuestion1answer, securityQuestion2id, securityQuestion2answer } = req.query;

    var emailedChecksum = createRandomAlphaNumChecksum(6, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

    const INSERT_MEDIUM_QUERY = `INSERT INTO usernames (username, password, displayName, email, emailedChecksum, securityQuestion1id, securityQuestion1answer, securityQuestion2id, securityQuestion2answer, verified) VALUES('${username}', '${password}', '${displayName}', '${email}', '${emailedChecksum}', ${securityQuestion1id}, '${securityQuestion1answer}', ${securityQuestion2id}, '${securityQuestion2answer}', 0)`;

    async function main() {

        infoObject.to = `${email}, doscaseal@gmail.com`;
        infoObject.text = `Hi ${username}!\nYour one time verification code is: ${emailedChecksum}\nVerify your account here: http://localhost:3000/user/forgot/code\n-Metagenre`;
        infoObject.html = `<p>Hi ${username}!</p><p>Your one time verification code is: <b>${emailedChecksum}</b></p><p>Verify your account <a href="http://localhost:3000/user/forgot/code?id=0&username=${username}&retrieve=verification">here</a></p><br> -Metagenre`
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

    const SELECT_USERNAME_QUERY = `SELECT * FROM metagenre.usernames u WHERE u.username='${username}';`;

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
    
                const UPDATE_USERNAME_BOOLEAN = `UPDATE metagenre.usernames u SET u.verified = 1 WHERE u.id = ${results[0].id}`;
    
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

router.get('/retrieve/password', (req, res) => {

    const { usernameOrEmail } = req.query;
    
    var emailedChecksum = createRandomAlphaNumChecksum(6, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    
    function validateEmail(elementValue) {
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(elementValue);
    }

    const queryFilter = (validateEmail(usernameOrEmail))?`email='${usernameOrEmail}'`:`username='${usernameOrEmail}'`;

    
    const SELECT_USERNAME_BOOLEAN = `SELECT * FROM metagenre.usernames WHERE ${queryFilter};`;
    
    console.log(SELECT_USERNAME_BOOLEAN)
    connection.query(SELECT_USERNAME_BOOLEAN, (err, results) => {

        console.log(results)
        if (err) {
            return res.send(err)
        } else {
            async function main() {
                infoObject.to = `${results[0].email}, doscaseal@gmail.com`;
                infoObject.text = `Hi ${results[0].username}! You have requested to change your password, but first you must verify you are updating your password with this code: ${emailedChecksum} http://localhost:3000/user/forgot/code -Metagenre`;
                infoObject.html = `<p>Hi ${results[0].username}!</p><p>You have requested to change your password, but first you must verify you are updating your password with this code: <b>${emailedChecksum}</b></p><p><a href="http://localhost:3000/user/forgot/code?id=${results[0].id}&username=${results[0].username}&retrieve=password">localhost:3000/user/forgot/code</a></p><br> -Metagenre`;
                let transporter = nodemailer.createTransport(transporterObject);
                let info = await transporter.sendMail(infoObject);
                console.log("Message sent: %s", info.messageId);
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            }

            main().catch(console.error);

            const UPDATE_USERNAME_BOOLEAN = `UPDATE metagenre.usernames SET requestPassword=1, emailedChecksum='${emailedChecksum}' WHERE ${queryFilter}`

            connection.query(UPDATE_USERNAME_BOOLEAN, (err, results) => {
                if (err) {
                    return res.send(err)
                } else {
                    return res.send('Requested password.')
                }
            });
        }
    });

});


router.get('/userSelectedSecurityQuestions/', (req, res) => {

    const { usernameOrEmail } = req.query;
    
    function validateEmail(elementValue) {
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(elementValue);
    }

    const queryFilter = (validateEmail(usernameOrEmail))?`email='${usernameOrEmail}'`:`username='${usernameOrEmail}'`;

    const SELECT_USERNAME_BOOLEAN = `SELECT * FROM metagenre.usernames WHERE ${queryFilter};`;

    connection.query(SELECT_USERNAME_BOOLEAN, (err, results) => {
        console.log(results)
        if (err) {
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });

});

router.get('/userSelectedSecurityQuestions/check', (req, res) => {
    const { id, sq1r, sq2r } = req.query;
    
    const SELECT_USERNAME_BOOLEAN = `SELECT * FROM metagenre.usernames WHERE id=${id} AND securityQuestion1answer='${sq1r}' AND securityQuestion2answer='${sq2r}';`;

    connection.query(SELECT_USERNAME_BOOLEAN, (err, results) => {

        if (results.length === 1) {
            const UPDATE_USERNAME_BOOLEAN = `UPDATE metagenre.usernames SET requestPassword=0, allowPasswordReset=1 WHERE id=${id}`;

            connection.query(UPDATE_USERNAME_BOOLEAN, (err, results) => {
                if (err) {
                    return res.send(err)
                } else {
                    return res.send('good')
                }
            });
        }

    });
});

router.get('/retrieve/update', (req, res) => {
    const { userId, inputChecksum } = req.query;

    const SELECT_USERNAME_QUERY = `SELECT * FROM metagenre.usernames WHERE id=${userId};`;

    connection.query(SELECT_USERNAME_QUERY, (err, results) => {

        console.log(`${results[0].requestPassword} === 1 && ${results[0].emailedChecksum} == ${inputChecksum}`)

        if (err) {
            return res.send(err)
        } else {

            if (results[0].requestPassword === 1 && results[0].emailedChecksum == inputChecksum) {

                const UPDATE_USERNAME_BOOLEAN = `UPDATE metagenre.usernames SET requestPassword=0, allowPasswordReset=1 WHERE id=${userId}`;

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
    const {userId, password} = req.query;

    const SELECT_USERNAME_QUERY = `SELECT * FROM metagenre.usernames WHERE id = '${userId}';`;

    connection.query(SELECT_USERNAME_QUERY, (err, results) => {

        if (err) {
            return res.send(err)
        } else {

            if (results[0].allowPasswordReset === 1) {

                const UPDATE_USERNAME_BOOLEAN = `UPDATE metagenre.usernames SET password='${password}', allowPasswordReset=0 WHERE id = ${userId}`;

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

    console.log(password)
    const SELECT_LOGIN_QUERY = `SELECT * FROM metagenre.usernames WHERE metagenre.usernames.username = '${username}'`;
    connection.query(SELECT_LOGIN_QUERY, (err, results) => {
        if (err) {
            return res.send(err)
        } else {
            console.log(results[0].password)
            console.log(compare(password, results[0].password));
            if(compare(password, results[0].password)) {
                jwt.sign({username: username, password: password}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
                    return res.json({
                        data: results,
                        token: token
                    });
                });
            }
        }
    });

});

module.exports = router;