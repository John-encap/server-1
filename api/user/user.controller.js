const {create, getEmployee, getPlayer, login} =require("./user.service");
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
    loginn: (req,res) =>{
        const body = req.body;
        // const salt = genSaltSync(10);
        // body.password = hashSync(body.password, salt);
        login(body.email, (err,results)=>{
            if(err) {
                console.log(err);
                return
            }
            if(!results){
                return res.json({
                    success: 0,
                    data: "Invalid username or password",
                });
            }
            else{
                const result=compareSync(body.password,results.password)
                if(result){
                    const accessToken = jwt.sign({nic: results.nic},process.env.TOKEN,{expiresIn: 60*60*24})
                    console.log("passwords are matched");
                    return res.json({
                        success: 1,
                        data: results,
                        message: body.password,
                        token: accessToken
                    }); 
                }
                
            }
            
        });
        // const accessToken = jwt.sign({nic: body.email},process.env.TOKEN,{expiresIn: 60*60*24})
        //              console.log("passwords are matched");
        // return res.json({
        //                     success: 1,
        //                     data: "manager",
        //                     message: body.password,
        //                     token: accessToken
        //                 });
    },
}