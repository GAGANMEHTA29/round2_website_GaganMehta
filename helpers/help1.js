const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword; 
    } catch (error) {
        console.log("some error occurred while encrypting password")
        res.send({
            success: false,
            message: "some error occurred while encrypting password"
        })
    }
}

const comparePassword = async (password, hashedPassword) => {
    try {
        return bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.log("some error occurred while decrypting password")
        res.send({
            success: false,
            message: "some error occurred while decrypting password"
        })
    }

}

module.exports = {
    hashPassword,
    comparePassword
}
