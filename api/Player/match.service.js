const pool=require("../../config/database");



module.exports = {
    
    // Get sessions for player 
    GetMatches: (body,callBack) =>{
        console.log(body.month+"jn")
        pool.query(
            `SELECT * FROM matches WHERE date > ?` ,
            [body.month],
             
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                console.log(results)
                return callBack(null,results); 
            }

        )
        
    },
    

    GetPastMatches: (body,callBack) =>{
        pool.query(
            `SELECT *, SUM(player_play_matches.runs) AS total , SUM(outt) AS wkts, SUM(no_of_balls_faced) AS balls FROM matches INNER JOIN player_play_matches ON matches.match_id=player_play_matches.match_id WHERE marked = ? GROUP BY player_play_matches.match_id;` ,
            [1],
             
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results); 
            }

        )
        
    },
    
    
}