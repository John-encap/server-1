const {GetSessions} =require("./player.service");
const {compareSync}=require("bcrypt");
const jwt =require("jsonwebtoken");
module.exports = {
    createUser: (req,res) =>{
        const body = req.body;
        // const salt = genSaltSync(10);
        // body.password = hashSync(body.password, salt);
        create(body, (err,results)=>{
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                    data: body,
                    err: err
                    
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },

    selectEmployees: (req,res) =>{
        getEmployee((err,results)=>{
            if(err) {
                console.log(err);
                return
            }
            return res.json({
                success: 1,
                data: results,
            });
        });
    },

    selectPlayer: (req,res) =>{
        getPlayer((err,results)=>{
            if(err) {
                console.log(err);
                return
            }
            return res.json({
                success: 1,
                data: results,
            });
        });
    },


    //get session details for payers
    GetSessions: (req,res) =>{
        const body = req.body;
        console.log(req.body.user_id)
        console.log("hi")
        GetSessions(body.user_id, (err,results)=>{
            if(err) {
                console.log(err);
                return
            }
            if(!results){
                return res.json({
                    success: 0,
                    data: "no sessions",
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