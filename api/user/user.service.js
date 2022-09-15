const pool = require("../../config/database");
const { genSaltSync, hashSync } = require("bcrypt");
const lankaNIC = require("lanka-nic");

module.exports = {
  create: (data, callBack) => {
    let { gender } = lankaNIC.getInfoFromNIC(data.nic);
    const salt = genSaltSync(10);
    const password = hashSync(data.nic, salt);
    if (
      data.role == "bawling" ||
      data.role == "batting" ||
      data.role == "allrounder"
    ) {
      data.role = "player";
    }
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
  
    const currentDate = `${year}-${month}-${day}`;

    console.log(currentDate);
    console.log(data.name);
    pool.query(
      `INSERT INTO user ( name,nic,contact,email,address,role,gender,password,date) VALUES ( ?,?,?,?,?,?,?,?,?)`,
      [
        data.name,
        data.nic,
        data.contact,
        data.e_mail,
        data.address,
        data.role,
        gender,
        password,
        currentDate,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },


  getEmployee: (callBack) => {
    pool.query(
      `SELECT user_id, name, gender, nic, contact, email, address,role FROM user WHERE role='coach' OR role='manager'`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getPlayer: (callBack) => {
    pool.query(
      `SELECT user_id, name, gender, nic, contact, email, address,role FROM user WHERE role='player'`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  login: (email, callBack) => {
    pool.query(
      `SELECT name, gender, nic, contact, email, address,role,password FROM user WHERE email=?`,
      [email],

      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  select_contact: (data, callBack) => {
    pool.query(
      `SELECT contact FROM user WHERE contact = ? `,
      [data.contact],
      (error, results, fields) => {
        if (error) {
          console.log("select_contact error :", error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  select_email: (data, callBack) => {
    pool.query(
      `SELECT email FROM user WHERE email = ? `,
      [data.e_mail],
      (error, results, fields) => {
        if (error) {
          console.log("select_email error :", error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  select_nic: (data, callBack) => {
    pool.query(
      `SELECT nic FROM user WHERE nic = ? `,
      [data.nic],
      (error, results, fields) => {
        if (error) {
          console.log("select_nic error :", error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  select_player: (data, callBack) => {
    pool.query(
      `SELECT name , role,contact, email, role ,address FROM user WHERE user_id = ? `,
      [data.user_id],
      (error, results, fields) => {
        if (error) {
          console.log("select_nic error :", error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
