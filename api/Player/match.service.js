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
            `SELECT * FROM matches WHERE marked = ?` ,
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