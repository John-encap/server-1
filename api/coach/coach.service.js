const pool = require("../../config/database");

module.exports = {
    
    getSessionToday: (user_id,callBack) =>{

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;

        console.log(today)

        // console.log(user_id)
        pool.query(
            `SELECT session_id, type, date, time FROM practice_sessions WHERE user_id = ? AND date = ?` ,
            [user_id,today], 
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results); 
            }
        )
        
    },

    getSessionAll: (user_id,callBack) =>{

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;

        console.log(today)

        //console.log(user_id)
        pool.query(
            `SELECT session_id, type, date, time FROM practice_sessions WHERE user_id = ? AND date != ?` ,
            [user_id,today], 
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results); 
            }
        )
        
    },

    getPastMatchesD: callBack =>{

        pool.query(
            `SELECT match_id, op_team_name, title, date FROM matches WHERE data_enter_status = ?` ,
            [1], 
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results); 
            }
        )
        
    },

    getAssignedMatches: (user_id,callBack) =>{

        pool.query(
            `SELECT match_id, op_team_name, title, date FROM matches WHERE data_enter_status = ? AND user_id = ?` ,
            [0, user_id], 
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results); 
            }
        )
        
    },

    getAppoinments: (user_id,callBack) =>{
        //not completed
        pool.query(
            `SELECT subject, date, time, accepted FROM appointment WHERE user_id = ?` ,
            [user_id], 
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results); 
            }
        )
        
    },

}