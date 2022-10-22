const {GetMatches,GetPastMatches} =require("./match.service");
const {compareSync}=require("bcrypt");
const jwt =require("jsonwebtoken");
module.exports = {
    //get session details for payers
    GetMatches: (req,res) =>{
        const body = req.body;
        console.log(req.body.month)
        GetMatches(body, (err,results)=>{
            
            if(err) {
                console.log(err);
                return
            }
            if(results[0]==undefined){
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

    GetPastMatches: (req,res) =>{
        const body = req.body;
        console.log(req.body.month)
        GetPastMatches(body, (err,results)=>{
            
            if(err) {
                console.log(err);
                return
            }
            if(results[0]==undefined){
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