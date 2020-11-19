const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;
const _TOKEN_KEY = "secretToken";

const bcryptJwt = function() {
  return {
    convertHash,
    generateSalt,
    comparePassword,
    generateToken,
    findByToken,
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

  function generateToken(userId, expMin) {
    return new Promise((resolve) => {
      const genToken = jwt.sign({
          sub:userId,
          exp:Math.floor(Date.now() / 1000) + expMin*60
        }, _TOKEN_KEY);
      resolve(genToken);
    });
  }

  function findByToken(token){
    return new Promise((resolve) => {
        jwt.verify(token, _TOKEN_KEY, (err, decodedData) => {
            resolve(
                err && err.expiredAt ? 'TokenExpiredError' :
                err && err.inner ? 'JsonWebTokenError' :
                err && err.date ? 'NotBeforeError' :
                decodedData
            );
        })
    });
  }
  
}();

module.exports = bcryptJwt;
