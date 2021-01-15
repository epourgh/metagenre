const hash = require('./hash');

const compare = (rawPassword, hashedPassword) => {
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

module.exports = compare;