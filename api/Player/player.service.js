const pool=require("../../config/database");


module.exports = {
    create: (data,callBack) =>{
            pool.query(
            `INSERT INTO user ( name,nic,contact,email,address,role,gender,password) VALUES ( ?,?,?,?,?,?,?,?)`,
            [
                data.name,
            ],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
        
    },

    getEmployee: callBack =>{
        
        pool.query(
            `SELECT name, gender, nic, contact, email, address,role FROM user WHERE role='coach' OR role='manager'`,
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
        
    },
    getPlayer: callBack =>{
        
        pool.query(
            `SELECT user_id, name, gender, nic, contact, email, address,role FROM user WHERE role='player'`,
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
        
    },


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
    GetSessions: (user_id,callBack) =>{
        
        pool.query(
            `SELECT * FROM practice_sessions WHERE user_id=?` ,
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