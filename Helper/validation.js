export const isEmailValid = (email) => {
    const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email.match(pattern)) {
        return true;
    }
    return false;
};
export const isPasswordValid = (password) => {
    const pattern = /^(?=.*[A-Z])(?=.*\d).+/;
    if (password.match(pattern)) {
        return true;
    }
    return false;
};
