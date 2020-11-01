const usernameRe = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRe = [];

const isValidUsername = (username) => {
    return usernameRe.test(String(username).toLowerCase());
}

const isValidEmail = (email) => {
    return emailRe.test(String(email).toLowerCase());
}
// TODO Complete
const isValidPassword = (password) => {
    return passwordRe.test(String(password))
}

module.exports = {
    isValidUsername,
    isValidEmail,
    isValidPassword
}
