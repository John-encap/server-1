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
      `INSERT INTO user ( name,nic,contact,email,address,role,gender,password,date,image) VALUES ( ?,?,?,?,?,?,?,?,?,?)`,
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
        data.image,
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
      `SELECT user_id, name, gender, nic, contact, email, address,role FROM user WHERE role <> ? AND status=?`,
      ["player", "1"],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        console.log(results);
        return callBack(null, results);
      }
    );
  },

  getPlayer: (callBack) => {
    pool.query(
      `SELECT user_id, name, gender, nic, contact, email, address,role FROM user WHERE role='player' AND status = 1`,
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
      `SELECT user_id, name, gender, nic, contact, email, address,role,password FROM user WHERE email=?`,
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
      `SELECT name , role,contact, email, role ,address, image FROM user WHERE user_id = ? `,
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

  deleteEmployee: (data, callBack) => {
    pool.query(
      `UPDATE user SET status='0' WHERE user_id=?`,
      [data.user_id],
      (error, results,fields) => {
        if(error){
          console.log("delete employee error :",error);
          return callBack(error);
        }
        return callBack(null,results);
      }
    );
  },

  updateEmployee: (data,callBack) => {
    pool.query(
      'UPDATE user SET email = ? , contact = ? , address = ? , image = ? WHERE user_id = ?',
      [data.e_mail, data.contact , data.address , data.image , data.user_id],
      (error, results,fields) => {
        if(error){
          console.log("delete employee error :",error);
          return callBack(error);
        }
        return callBack(null,results);
      }
    )
  }
};
