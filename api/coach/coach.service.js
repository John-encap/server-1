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

    checkDateTimePracticeSession: (date, time, callBack) =>{

        pool.query(
            "SELECT * FROM practice_sessions WHERE time = ? AND date = ?",
            [time, date],
            (error, results, fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results.length);
            }
        )

    },

    addDateTime: (id, type, date, time, callBack) => {
        pool.query(
            "INSERT INTO practice_sessions (time, type, user_id, date) VALUES (?,?,?,?)",
            [time, type, id, date],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
            
                return callBack(null, results);
            }
        )
    },

    getPlayers: (date, time) => { //should test
        pool.query(
            "SELECT user.user_id, user.name FROM user INNER JOIN player ON user.user_id = player.user_id INNER JOIN player_practice_session ON player.user_id = player_practice_session.user_id INNER JOIN practice_sessions ON player_practice_session.session_id = practice_sessions.session_id WHERE practice_sessions.time != ? AND practice_sessions.date != ?;",
            [time, date],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
            
                return callBack(null, results);
            }
        )
    },

    getCoaches: (date, time) => { //should test
        pool.query(
            "SELECT user.user_id, user.name FROM user INNER JOIN coach ON user.user_id = coach.user_id INNER JOIN coach_join_practice_session ON coach.user_id = coach_join_practice_session.user_id INNER JOIN practice_sessions ON coach_join_practice_session.session_id = practice_sessions.session_id WHERE practice_sessions.time != ? AND practice_sessions.date != ?;",
            [time, date],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
            
                return callBack(null, results);
            }
        )
    },

    getAssignedPlayers: (id) => {
        pool.query(
            "SELECT user.name FROM user INNER JOIN player ON user.user_id = player.user_id INNER JOIN player_practice_session ON player.user_id = player_practice_session.user_id INNER JOIN practice_sessions ON player_practice_session.session_id = practice_sessions.session_id WHERE player_practice_session.session_id = ?;",
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
            
                return callBack(null, results);
            }
        )
    },

    getAssignedCoaches: (id) => {
        pool.query(
            "SELECT user.name FROM user INNER JOIN coach ON user.user_id = coach.user_id INNER JOIN coach_join_practice_session ON coach.user_id = coach_join_practice_session.user_id INNER JOIN practice_sessions ON coach_join_practice_session.session_id = practice_sessions.session_id WHERE practice_sessions.session_id = ?;",
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
            
                return callBack(null, results);
            }
        )
    },

    markSessionAttendance: (session_id, player_id, attendance, battingShotes, bowlingVariant, feedback) => {
        pool.query(
            "UPDATE player_practice_session SET batting_shotes = batting_shotes, bowling_variant = bowlingVariant, attendance = attendance, feedback = feedback WHERE session_id = ? AND user_id = ?;",
            [battingShotes, bowlingVariant, attendance, feedback, session_id, player_id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
            
                return callBack(null, results);
            }
        )
    },
    
    allTeamA: ()=>{
        
        pool.query(
            "SELECT * FROM achievements",//db wens karapn
            [],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
            
                return callBack(null, results);
            }
        )

    },

    pastAndMark: ()=>{
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;

        pool.query(
            "SELECT match_id, date, time, op_team_name, title, match_format, ground FROM matches WHERE marked = ? AND date < ?;",
            [1, today],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);
            }
        )

    },
    checkSessionExist: (data, callBack) => {
        pool.query(
          `SELECT title, date FROM counseling_session WHERE date = ?`,
          [data.date],
          (error, results, fields) => {
            if (error) {
              return callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
      checkEventExist: (data, callBack) => {
        pool.query(
          `SELECT event_name, date FROM events WHERE date = ?`,
          [data.date],
          (error, results, fields) => {
            if (error) {
              return callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
      checkMatchExist: (data, callBack) => {
        pool.query(
          `SELECT date, match_format FROM matches WHERE date = ?`,
          [data.date],
          (error, results, fields) => {
            if (error) {
              console.log("get match error : ", error);
              return callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
      checkPracticeSessionsExist : (data, callBack) => {
        pool.query(
            `SELECT date, type FROM practice_sessions WHERE date = ?`,
          [data.date],
          (error, results, fields) => {
            if (error) {
              console.log("get match error : ", error);
              return callBack(error);
            }
            return callBack(null, results);
          }
        )
      },
      addPracticeSession : (data, callBack) => {
        pool.query(
            `INSERT INTO practice_sessions `
        )
      }

}