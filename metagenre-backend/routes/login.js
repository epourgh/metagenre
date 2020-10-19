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
    html: "", // html body
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
                infoObject.html = `<p>Hi ${results[0].username}!</p><p>You have requested to change your password, but first you must verify you are updating your password with this code: <b>${emailedChecksum}</b></p><p><a href="http://localhost:3000/user/forgot/code?id=${results[0].id}">localhost:3000/user/forgot/code</a></p><br> -Metagenre`;
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

router.get('/security/update', (req, res) => {
    const { username, securityQuestionId, securityQuestionResponse } = req.query;

    const SELECT_USERNAME_QUERY = `SELECT * FROM metagenre.usernames u WHERE u.username = '${username}';`;

    connection.query(SELECT_USERNAME_QUERY, (err, results) => {

        if (err) {
            return res.send(err)
        } else {

            if (
                (results[0].securityQuestion1id === securityQuestionId && results[0].securityQuestion1answer == securityQuestionResponse) 
                || (results[0].securityQuestion2id === securityQuestionId && results[0].securityQuestion2answer == securityQuestionResponse)
                ) {

                const UPDATE_USERNAME_BOOLEAN = `UPDATE metagenre.usernames u SET u.allowPasswordReset=1 WHERE u.username = ${username}`;

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
    var md5 = function (string) {

        function RotateLeft(lValue, iShiftBits) {
            return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
        }

        function AddUnsigned(lX, lY) {
            var lX4, lY4, lX8, lY8, lResult;
            lX8 = (lX & 0x80000000);
            lY8 = (lY & 0x80000000);
            lX4 = (lX & 0x40000000);
            lY4 = (lY & 0x40000000);
            lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
            if (lX4 & lY4) {
                return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
            }
            if (lX4 | lY4) {
                if (lResult & 0x40000000) {
                    return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                } else {
                    return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                }
            } else {
                return (lResult ^ lX8 ^ lY8);
            }
        }

        function F(x, y, z) {
            return (x & y) | ((~x) & z);
        }

        function G(x, y, z) {
            return (x & z) | (y & (~z));
        }

        function H(x, y, z) {
            return (x ^ y ^ z);
        }

        function I(x, y, z) {
            return (y ^ (x | (~z)));
        }

        function FF(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        function GG(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        function HH(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        function II(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        function ConvertToWordArray(string) {
            var lWordCount;
            var lMessageLength = string.length;
            var lNumberOfWords_temp1 = lMessageLength + 8;
            var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
            var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
            var lWordArray = Array(lNumberOfWords - 1);
            var lBytePosition = 0;
            var lByteCount = 0;
            while (lByteCount < lMessageLength) {
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
                lByteCount++;
            }
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
            lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
            lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
            return lWordArray;
        };

        function WordToHex(lValue) {
            var WordToHexValue = "",
                WordToHexValue_temp = "",
                lByte, lCount;
            for (lCount = 0; lCount <= 3; lCount++) {
                lByte = (lValue >>> (lCount * 8)) & 255;
                WordToHexValue_temp = "0" + lByte.toString(16);
                WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
            }
            return WordToHexValue;
        };

        function Utf8Encode(string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";

            for (var n = 0; n < string.length; n++) {

                var c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }

            return utftext;
        };

        var x = Array();
        var k, AA, BB, CC, DD, a, b, c, d;
        var S11 = 7,
            S12 = 12,
            S13 = 17,
            S14 = 22;
        var S21 = 5,
            S22 = 9,
            S23 = 14,
            S24 = 20;
        var S31 = 4,
            S32 = 11,
            S33 = 16,
            S34 = 23;
        var S41 = 6,
            S42 = 10,
            S43 = 15,
            S44 = 21;

        string = Utf8Encode(string);

        x = ConvertToWordArray(string);

        a = 0x67452301;
        b = 0xEFCDAB89;
        c = 0x98BADCFE;
        d = 0x10325476;

        for (k = 0; k < x.length; k += 16) {
            AA = a;
            BB = b;
            CC = c;
            DD = d;
            a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
            d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
            c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
            b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
            a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
            d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
            c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
            b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
            a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
            d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
            c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
            b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
            a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
            d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
            c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
            b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
            a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
            d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
            c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
            b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
            a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
            d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
            c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
            b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
            a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
            d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
            c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
            b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
            a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
            d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
            c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
            b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
            a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
            d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
            c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
            b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
            a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
            d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
            c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
            b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
            a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
            d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
            c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
            b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
            a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
            d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
            c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
            b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
            a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
            d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
            c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
            b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
            a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
            d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
            c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
            b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
            a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
            d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
            c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
            b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
            a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
            d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
            c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
            b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
            a = AddUnsigned(a, AA);
            b = AddUnsigned(b, BB);
            c = AddUnsigned(c, CC);
            d = AddUnsigned(d, DD);
        }

        var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);

        return temp.toLowerCase();
    }

    function hash(rawPassword, options = {}) {
        /**
         * salt is optional, if not provided it will be set to current timestamp
         */
        const salt = options.salt ? options.salt : new Date().getTime();

        /**
         * rounds is optional, if not provided it will be set to 10
         */
        const rounds = options.rounds ? options.rounds : 10;

        let hashed = md5(rawPassword + salt);
        for (let i = 0; i <= rounds; i++) {
            hashed = md5(hashed);
        }
        return `${salt}$${rounds}$${hashed}`;
    }

    function compare(rawPassword, hashedPassword) {
        try {
            const [salt, rounds] = hashedPassword.split('$');
            const hashedRawPassword = hash(rawPassword, {
                salt,
                rounds
            });
            return hashedPassword === hashedRawPassword;
        } catch (error) {
            throw Error(error.message);
        }
    }

    console.log(password)
    const SELECT_LOGIN_QUERY = `SELECT * FROM metagenre.usernames 
                                                 WHERE metagenre.usernames.username = '${username}'`;
    connection.query(SELECT_LOGIN_QUERY, (err, results) => {
        if (err) {
            return res.send(err)
        } else {
            console.log(results[0].password)
            console.log(compare(password, results[0].password));
            if(compare(password, results[0].password)) {
                return res.json({
                    data: results
                })
            }
        }
    });
});

module.exports = router;