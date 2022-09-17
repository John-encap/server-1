const pool=require("../../config/database");
// const {genSaltSync,hashSync}=require("bcrypt");
// const lankaNIC = require("lanka-nic");

module.exports = {
    create: (data, callBack) => {

        pool.query(
            `INSERT INTO matches (match_format, ground, date, time, op_team_name ) VALUES (?,?,?,?,?) `,
            [
                data.match_format,
                data.ground,
                // data.man_of_the_match,
                data.date,
                data.time,
                data.op_team_name
            ],
            (error,results,fields) =>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },
    getMatch: callBack =>{
        
        pool.query(
            `SELECT * FROM matches `,
            [],
            (error,results,fields)=>{
                if(error){
                    console.log("getMatch error", error)
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
        
    },
    checkDateGround : (data , callBack) =>{
        pool.query(
            `SELECT date,ground FROM matches WHERE date = ? && ground = ?`,
            [
                data.date,
                data.ground
            ],
            (error,results,fields) => {
                if(error){
                    console.log("getDate error :" , error);
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getGround : (ground, callBack) =>{
        pool.query(
            `SELECT ground FROM matches WHERE ground = ?`,
            [ground],
            (error,results,fields) => {
                if(error){
                    console.log("getGround error :" , error);
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    addSession : (data, callBack) => {
        pool.query(
            `INSERT INTO counseling_session (date, time, mentor, mentor_details, title, place ) VALUES (?,?,?,?,?,?) `,
            [
                data.date,
                data.time,
                data.mentor,
                data.mentor_details,
                data.title,
                data.place
            ],
            (error,results,fields) =>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },
    selectPaidPlayer: callBack =>{
        pool.query(
            `SELECT user.user_id, payment.total_amount, user.name,user.role, user.image, payment.date FROM payment INNER JOIN user ON payment.user_id = user.user_id WHERE user.role = ?`,
        
            ["player"],
            (error,results,fields)=>{
                if(error){
                    console.log("getMatch error", error)
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },
    selectUnpaidPlayer: callBack => {
        pool.query(
            // `SELECT user.user_id, payment.total_amount, user.name,user.role, user.image FROM payment INNER JOIN user ON payment.user_id = user.user_id WHERE user.role = ?`,
            // `SELECT user.user_id, payment.payment_id FROM payment FULL JOIN user ON payment.user_id = user.user_id WHERE user.role = ? `,
            `SELECT name , user_id, role
            FROM user
            WHERE NOT EXISTS (SELECT user_id FROM payment WHERE payment.user_id = user.user_id)`,
            [],
            (error,results,fields)=>{
                if(error){
                    console.log("getMatch error", error)
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },
    getPassword:(data , callBack) =>{
        pool.query(
            `SELECT password FROM user WHERE nic = ?`,
            [
                data.nic
            ],
            (error,results,fields) => {
                if(error){
                    console.log("getDate error :" , error);
                    return callBack(error);
                }
                return callBack(null, results);
            }

        )
    },
    checkMatchExist:(data ,callBack) => {
        pool.query(
            `SELECT date, match_format FROM matches WHERE date = ?`,
            [data.date],
            (error,results,fields) => {
                if(error){
                    console.log("get match error : ", error);
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    checkEventExist:(data,callBack)=>{
        pool.query(
            `SELECT event_name, date FROM events WHERE date = ?`,
            [data.date],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    insertEvent:(data, callBack)=>{

        pool.query(
            `INSERT INTO events (event_name, date, time, description) VALUES (?,?,?,?) `,
            [
                data.name,
                data.date,
                data.time,
                data.description,
            ],
            (error,results,fields) =>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },
    checkSessionExist: (data, callBack)=>{
        pool.query(
            `SELECT title, date FROM counseling_session WHERE date = ?`,
            [data.date],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getUpcommingEvent:(data,callBack)=>{
        
        pool.query(
            `SELECT * FROM events WHERE date >= ?`,
            [data],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getOldEvent:(data,callBack)=>{
        pool.query(
            `SELECT * FROM events WHERE date < ?`,
            [data],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getUpcommingSession:(data,callBack)=>{
        pool.query(
            `SELECT * FROM counseling_session WHERE date >= ?`,
            [data],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getOldSession:(data,callBack)=>{
        pool.query(
            `SELECT * FROM counseling_session WHERE date < ?`,
            [data],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    }

}