const {getSessionToday, getSessionAll, getPastMatchesD, getAssignedMatches, getAppoinments} = require("./coach.service");


module.exports = {

    GetPSessionToday: (req,res) =>{
        const body = req.body;
        // console.log(body.id);
        getSessionToday(body.id,(err, results)=>{
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

    GetPSessionAll: (req,res) =>{
        const body = req.body;
        // console.log('gggggggg')
        console.log(body.id); 
        getSessionAll(body.id,(err, results)=>{
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

    GetAllPastMatches: (req,res) =>{

        // const body = req.body;

        getPastMatchesD((err, results)=>{
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

    GetAssignedMatches: (req,res) =>{

        const body = req.body;

        getAssignedMatches(body.id, (err, results)=>{
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

    GetAppoinments: (req, res) => {

        const body = req.body;
        getAppoinments(body.id,(err, results)=>{
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

    }

}