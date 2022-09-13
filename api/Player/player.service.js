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
            `SELECT * FROM practice_sessions WHERE user_id=? and date like ?` ,
            [body.user_id,body.month+'%'],
             
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results); 
            }
        )
        
    },
    GetSessionDetails: (body,callBack) =>{
        // pool.query(
        //     `SELECT * FROM practice_sessions WHERE user_id=? and date like ?` ,
        //     [body.user_id,body.month+'%'],
             
        //     (error,results,fields)=>{
        //         if(error){
        //             return callBack(error);
        //         }
        //         return callBack(null,results); 
        //     }
        // )

        
        console.log(7)
        
        
    },


}