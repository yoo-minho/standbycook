const config = require("../config/key");
const { Client } = require("pg");
const common = require("./module/common");

const userData = (function () {
  return {
    findPassword,
    findProfileData,
    findTokenData,
    updateTokenData,
    insertData,
  };

  function findPassword(userId) {
    return new Promise((resolve) => {
      const client = new Client(config.postgresqlInfo);
      client.connect();
      const sql = common.json2query({
        mode: "SELECT",
        tableName: "user_data",
        column: ["password"],
        where: ["and id = $1", "limit 1"],
      });
      client.query(sql, [userId], (err, qres) => {
        client.end();
        if (err) {
          resolve("");
        } else {
          resolve(qres.rows[0].password);
        }
      });
    });
  }

  function findProfileData(userId) {
    return new Promise((resolve) => {
      const client = new Client(config.postgresqlInfo);
      client.connect();
      const sql = common.json2query({
        mode: "SELECT",
        tableName: "user_data",
        column: ["name, profile_url, role"],
        where: ["and id = $1", "limit 1"],
      });
      client.query(sql, [userId], (err, qres) => {
        client.end();
        if (err) {
          resolve({ isAuth: false, isAdmin: false, err, sql });
        } else {
          const userData = qres.rows[0];
          if (userData) {
            resolve({
              isAuth: true,
              isAdmin: userData && userData.role === 0 ? true : false,
              id: userData.id,
              name: userData.name,
              role: userData.role,
              image: userData.profile_url,
            });
          } else {
            //console.log(qres, sql, userId);
            resolve({ isAuth: false });
          }
        }
      });
    });
  }

  function findTokenData(userId) {
    return new Promise((resolve) => {
      const client = new Client(config.postgresqlInfo);
      client.connect();
      const sql = common.json2query({
        mode: "SELECT",
        tableName: "user_data",
        column: ["token, token_exp"],
        where: ["and id = $1", "limit 1"],
      });
      client.query(sql, [userId], (err, qres) => {
        client.end();
        if (err) {
          resolve({});
        } else {
          resolve(qres.rows[0]);
        }
      });
    });
  }

  function updateTokenData(userId, token) {
    return new Promise((resolve) => {
      const client = new Client(config.postgresqlInfo);
      client.connect();
      const sql = common.json2query({
        mode: "UPDATE",
        tableName: "user_data",
        column: ["token", "token_exp"],
        value: ["$1", "to_char(now(), 'yyyymmddhh24miss')"],
        where: ["and id = $2"],
      });
      const isLogin = "" !== token;
      client.query(sql, [token, userId], (err, qres) => {
        client.end();
        if (err) {
          resolve(
            isLogin
              ? {
                  loginSuccess: false,
                  loginMessage: "로그인 처리가 제대로 되지 않았습니다!",
                  err,
                  sql,
                }
              : {
                  loginoutSuccess: false,
                  loginoutMessage: "로그아웃 처리가 제대로 되지 않았습니다!",
                  err,
                  sql,
                }
          );
        } else {
          resolve(
            isLogin
              ? {
                  loginSuccess: true,
                  loginMessage: "로그인되었습니다",
                  userId,
                }
              : {
                  loginoutSuccess: true,
                  loginoutMessage: "로그아웃되었습니다!",
                }
          );
        }
      });
    });
  }

  function insertData(userId, name, password) {
    return new Promise((resolve) => {
      const client = new Client(config.postgresqlInfo);
      client.connect();
      const sql = common.json2query({
        mode: "INSERT",
        tableName: "user_data",
        column: ["id", "name", "password", "register_datetime"],
        value: ["$1", "$2", "$3", "to_char(now(), 'yyyymmddhh24miss')"],
      });
      client.query(sql, [userId, name, password], (err, qres) => {
        client.end();
        if (err) {
          resolve({ success: false, err, sql, values });
        } else {
          resolve({ success: true, qres });
        }
      });
    });
  }
})();

module.exports = userData;
