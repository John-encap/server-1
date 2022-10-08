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

    GetCouncelling:(body,callBack) =>{
        pool.query(
            `SELECT * FROM counseling_session;` ,
            [body],
             
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results); 
            }
        )
    },
    
    
    GetEvents:(body,callBack) =>{
        pool.query(
            `SELECT * FROM events;` ,
            [body],
             
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results); 
            }
        )
    },
    GetEventDetails:(data,callBack) =>{
        console.log('jjj')
        pool.query(
            `SELECT * FROM events WHERE event_id=?` ,
            [data],
            
             
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results); 
            }
        )
    },
    GetPayments:(data,callBack) =>{
        console.log('jjj')
        pool.query(
            `SELECT * FROM payment WHERE user_id=?` ,
            [data],
            
             
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results ); 
            }
        )
    },
    GetMatchPlayers: (body,callBack) =>{
        pool.query(
            `SELECT * FROM matches INNER JOIN player_play_matches on matches.match_id=player_play_matches.match_id INNER JOIN user ON user.user_id=player_play_matches.user_id WHERE matches.match_id=? AND matches.marked=?`,
            [body.match_id,body.statuss],
             
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results); 
            }
        )
    },

    GetMatchCoach: (body,callBack) =>{
        pool.query(
            `SELECT * FROM matches INNER JOIN couch_join_match on matches.match_id=couch_join_match.match_id INNER JOIN user ON user.user_id=couch_join_match.user_id WHERE matches.match_id=? AND matches.marked=?` ,
            [body,"pending"],
             
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results); 
            }
        )
    },
    

    


}