const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const bcryptJwt = function() {
  return {
    convertHash,
    generateSalt,
    comparePassword,
    generateToken,
  };

  function convertHash(saltKey, orginPwd) {
    return new Promise((resolve) => {
      bcrypt.hash(orginPwd, saltKey, (err, hash) => {
        if (err) return;
        resolve(hash);
      });
    });
  }

  function generateSalt() {
    return new Promise((resolve) => {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) return;
        resolve(salt);
      });
    });
  }

  function comparePassword(inputPwd, dbPwd) {
    return new Promise((resolve) => {
      bcrypt.compare(inputPwd, dbPwd, (err, isMatch) => {
        if (err) return;
        resolve(isMatch);
      });
    });
  }

  function generateToken(userId) {
    return new Promise((resolve) => {
      console.log(userId)
      const genToken = jwt.sign(userId, "secretToken");
      console.log(genToken)
      resolve(genToken);
    });
  }
}();

module.exports = bcryptJwt;
