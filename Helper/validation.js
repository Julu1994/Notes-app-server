/**
 * @isEmailValid
 * @Description Helper function to check if the user email is valid.
 * @Parameters email
 * @Return boolen
 **/
module.exports.isEmailValid = (email) => {
    const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email.match(pattern)) {
        return true;
    }
    return false;
};
/**
 * @isPasswordValid
 * @Description Helper function to check if the password input has number and capital letters.
 * @Parameters password
 * @Return boolen
 **/
module.exports.isPasswordValid = (password) => {
    const pattern = /^(?=.*[A-Z])(?=.*\d).+/;
    if (password.match(pattern)) {
        return true;
    }
    return false;
};
