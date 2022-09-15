const pool=require("../../config/database");



module.exports = {
    
    // Get sessions for player 
    GetMatches: (body,callBack) =>{
        pool.query(
            `SELECT * FROM matches WHERE date LIKE ? AND marked = ?` ,
            [body.month+'%',"pending"],
             
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results); 
            }

        )
        
    },

    GetPastMatches: (body,callBack) =>{
        pool.query(
            `SELECT * FROM matches WHERE marked = ?` ,
            ["done"],
             
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results); 
            }

        )
        
    },
    
}