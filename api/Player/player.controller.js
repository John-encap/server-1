const {GetSessions,GetSessionPlayers,GetSessionCoach,GetCouncelling,GetEvents,GetEventDetails,GetPayments,GetMatchPlayers,GetMatchCoach} =require("./player.service");
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

   GetSessionPlayers: (req,res) =>{ 
        const body = req.body;
        console.log("")
        // let myArray = {}
        GetSessionPlayers(body.session_id, (err,results)=>{
            
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
                        data: results,
                    });
                }
                
            }
            
            
        });
        
    },
    GetSessionCoach: (req,res) =>{ 
        const body = req.body;
        console.log("")
        GetSessionCoach(body.session_id, (err,results)=>{
            
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
                        data: results,
                    });
                }
                
            }
            
        });
        
    },

    GetCouncelling: (req,res) =>{ 
        const body = req.body;
        console.log("")
        GetCouncelling(body.session_id, (err,results)=>{
            
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
                        data: results,
                    });
                }
                
            }
            
        });
        
    },

    GetEvents: (req,res) =>{ 
        const body = req.body;
        console.log("hi")
        GetEvents(body.session_id, (err,results)=>{
            
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
                        data: results,
                    });
                }
                
            }
            
        });
        
    },
    GetEventDetails:  (req,res) =>{ 
        const body = req.body;
        console.log(body.eventId)
        GetEventDetails(body.eventId, (err,results)=>{
            
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
                    console.log(results)
                    return res.json({
                        success: 1,
                        data: results,
                    });
                }
                
            }
            
        });
        
    },
    GetPayments:(req,res) =>{ 
        const body = req.body;
        console.log(body.user_id)
        GetPayments(body.user_id, (err,results)=>{
            
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
                    console.log(results)
                    return res.json({
                        success: 1,
                        data: results,
                    });
                }
                
            }
            
        });
        
    },
    GetMatchPlayers: (req,res) =>{ 
        const body = req.body;
        console.log("")
        GetMatchPlayers(body, (err,results)=>{
            
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
                        data: results,
                    });
                }
                
            }
            
        });
        
    },

    GetMatchCoach: (req,res) =>{ 
        const body = req.body;
        console.log("")
        GetMatchCoach(body.session_id, (err,results)=>{
            
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
                        data: results,
                    });
                }
                
            }
            
        });
        
    },

}