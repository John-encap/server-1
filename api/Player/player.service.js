const pool=require("../../config/database");


function getCouchSessions(id){
    console.log(id)
}
module.exports = {
    // Get Batting performance for player 
    GetBattingPerformance: (email,callBack) =>{
        pool.query(
            `SELECT name, gender, nic, contact, email, address,role,password FROM user WHERE email=?`,
            [email],
             
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results[0]); 
            }
        )
        
    },


    // Get sessions for player 
    GetSessions: (body,callBack) =>{
        pool.query(
            `SELECT practice_sessions.session_id,practice_sessions.date,practice_sessions.time,practice_sessions.type,player_practice_session.user_id as player_id,practice_sessions.user_id as coach_id,user.name  FROM practice_sessions INNER JOIN player_practice_session ON practice_sessions.session_id = player_practice_session.session_id INNER JOIN user ON practice_sessions.user_id=user.user_id WHERE player_practice_session.user_id=? and date like ?` ,
            [body.user_id,body.month+'%'],
             
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results); 
            }
        )
        
    },
    GetSessionPlayers: (body,callBack) =>{
        pool.query(
            `SELECT user.name, user.user_id AS player_ids,practice_sessions.type,practice_sessions.time,practice_sessions.date FROM practice_sessions INNER JOIN player_practice_session ON practice_sessions.session_id=player_practice_session.session_id INNER JOIN user ON player_practice_session.user_id=user.user_id WHERE practice_sessions.session_id=?;` ,
            [body],
             
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results); 
            }
        )
    },

    GetSessionCoach: (body,callBack) =>{
        pool.query(
            `SELECT user.name, user.user_id AS coach_ids FROM practice_sessions INNER JOIN coach_join_practice_session ON practice_sessions.session_id=coach_join_practice_session.session_id INNER JOIN user ON coach_join_practice_session.user_id=user.user_id WHERE practice_sessions.session_id=?;` ,
            [body],
             
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results); 
            }
        )
    },

    


}