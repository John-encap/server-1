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
    getDate : (date , callBack) =>{
        pool.query(
            `SELECT date FROM matches WHERE date = ?`,
            [date],
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
    }

}