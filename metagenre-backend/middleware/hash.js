const md5 = require('./md5');

const hash = (rawPassword, options = {}) => {
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

module.exports = hash;