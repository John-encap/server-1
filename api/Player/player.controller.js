const {GetSessions,GetSessionDetails} =require("./player.service");
const {compareSync}=require("bcrypt");
const jwt =require("jsonwebtoken");
module.exports = {
    //get session details for payers
    GetSessions: (req,res) =>{
        const body = req.body;
        console.log(req.body.month)
        
        GetSessions(body, (err,results)=>{
            
            if(err) {
                console.log(err);
                return
            }
            if(results[0]==undefined){
                console.log("jj")
                return res.json({
                    success: 0,
                    data: results,
                });
            }
            else{
                if(results){
                    return res.json({
                        success: 1,
                        data: results
                    }); 

                    
                }
                
            }
            
        });
        
    },

    GetSessionDetails: (req,res) =>{
        const body = req.body;
        console.log(body.session_id)
        
        GetSessionDetails(body.session_id, (err,results)=>{
            
            if(err) {
                console.log(err);
                return
            }
            if(results[0]==undefined){
                console.log("jj")
                return res.json({
                    success: 0,
                    data: results,
                });
            }
            else{
                if(results){
                    return res.json({
                        success: 1,
                        data: results
                    }); 

                    
                }
                
            }
            
        });
        
    },
}