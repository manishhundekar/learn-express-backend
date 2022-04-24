var CryptoJS = require("crypto-js");

const secretkey = "manishhundekar"
const encrypt = (data) => {
    var ciphertext = CryptoJS.AES.encrypt(data, secretkey).toString()
    console.log(ciphertext)
    return ciphertext
}
const decrypt = (data) => {
    var orginalText = CryptoJS.AES.decrypt(data, secretkey).toString(CryptoJS.enc.Utf8)
    console.log(orginalText)
    return orginalText
}

module.exports = {encrypt, decrypt}