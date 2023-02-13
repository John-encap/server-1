const {deleteFeedback, getFeedback, giveFeedback, GetSessions,GetSessionPlayers,GetSessionCoach,getDataforValidation,getAllPlayersFS,matchPlayerBowl,score_update,updatescore_notP,check_op_score,unmarked_players_marked,getPlayersToSessions,checkAvailabilityForSession,SpecSessionDetails,match,deleteNewses,GetSessionss,CreateTeam,GetMatchPlayerss,future,update,unmarked_data,marked,unmarked_players,updatescore,Unmarked,addTeam,getTeam,addTeamMatches,addTeamMatchesDet,getTeamDetails,deleteTeam,performanceBowl,getAllPlayers,feedback,Attendance,intro,performanceFld,GetCouncelling,GetEvents,performance,GetEventDetails,GetPayments,GetMatchPlayers,GetMatchCoach,GetRanking} =require("./player.service");
const {compareSync}=require("bcrypt");
const jwt =require("jsonwebtoken");
const joi = require("@hapi/joi");

const add_feedback = joi.object().keys({
    date: joi.string().required(),
    feedback: joi.string().required(),
    player_id: joi.number().integer().required()
});

module.exports = {

    deleteFeedback: (req, res) => {
        const f_id = req.body.id;

        deleteFeedback (f_id, (err, results) => {
            if(err) {
                return res.json({
                    success: 0,
                    error: err
                })
            }

            if(!results){
                return res.json({
                    success: 0,
                    error: "Error of delete feedback",
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

    getFeedback: (req, res) => {

        const player_id = req.body.player_id;

        getFeedback (player_id, (err, results) => {

            if(err) {
                return res.json({
                    success: 0,
                    error: err
                })
            }

            if(!results){
                return res.json({
                    success: 0,
                    error: "Error of retrieve feedbacks",
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

    giveFeedback: (req, res) => {

        const body = req.body;

        const { error } = add_feedback.validate(body);

        if (error) {
            return res.json({
                success: 0,
                error: error 
            })
        }

        giveFeedback(body, (err, results) => {
            if(err) {
                return res.json({
                    success: 0,
                    error: err
                })
            }

            if(!results){
                return res.json({
                    success: 0,
                    error: "Not added feedback",
                });
            }
            else{
                if(results){
                    return res.json({
                        success: 1,
                        data: "Successfully added feedback",
                    }); 
                }
                
            }

        });
    },

    AllTeamA: (req, res) => {//db wens karapn
        const body = req.body;
        allTeamA((err, results) => {
            if(err) {
                return res.json({ error: err });
            }
            if(!results){
                return res.json({
                    success: 0,
                    data: "no team achievements",
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
    GetSessionss: (req,res) =>{
        const body = req.body;
        console.log(req.body.month)
        GetSessionss(body, (err,results)=>{
            
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
    GetMatchPlayerss: (req,res) =>{ 
        const body = req.body;
        console.log("kk")
        GetMatchPlayerss(body, (err,results)=>{ 
            
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
                console.log(results)

                if(results){
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
        console.log(body)
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
                // console.log(results[0])
                // console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
                if(results){
                    return res.json({
                        success: 1,
                        data: results[0],
                        data2: results[1],
                    });
                }
                
            }
            
        });
        
    },
    matchPlayerBowl: (req,res) =>{ 
        const body = req.body;
        console.log(body)
        matchPlayerBowl(body, (err,results)=>{
            
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
                // console.log(results[0])
                // console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
                if(results){
                    return res.json({
                        success: 1,
                        data: results
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
    GetRanking: (req,res) =>{ 
        const body = req.body;
        console.log("kk")
        GetRanking(body.catagory,body.format, (err,results)=>{
            
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
    performance: (req,res) =>{ 
        const body = req.body;
        console.log("kk")
        performance(body.user_id, (err,results)=>{
            
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
    performanceFld: (req,res) =>{ 
        const body = req.body;
        console.log("kk")
        performanceFld(body.user_id, (err,results)=>{
            
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
    performanceBowl: (req,res) =>{ 
        const body = req.body;
        console.log("kk")
        performanceBowl(body.user_id, (err,results)=>{
            
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
    intro: (req,res) =>{ 
        const body = req.body;
        console.log("kk")
        intro(body.user_id, (err,results)=>{
            
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
    Attendance: (req,res) =>{ 
        const body = req.body;
        console.log("kk")
        Attendance(body.user_id,body.month, (err,results)=>{
            
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

    feedback: (req,res) =>{ 
        const body = req.body;
        console.log("kk")
        feedback(body.user_id,body.session_id, (err,results)=>{
            
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
    getAllPlayers: (req,res) =>{ 
        console.log("kk")
        getAllPlayers((err,results)=>{
            
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

    CreateTeam: (req,res) =>{ 
        console.log(req.body.team)
        console.log(req.body.date)
        CreateTeam(req.body.team,req.body.date,req.body.players,(err,results)=>{
            
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

    getTeam: (req,res) =>{ 
        getTeam((err,results)=>{
            
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
    getTeamDetails: (req,res) =>{ 
        getTeamDetails(req.body.team_id,(err,results)=>{
            
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
    deleteTeam: (req,res) =>{ 
        deleteTeam(req.body.team_id,(err,results)=>{
            
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
    addTeamMatches: (req,res) =>{ 
        addTeamMatches((err,results)=>{
            
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
    addTeamMatchesDet: (req,res) =>{ 
        addTeamMatchesDet(req.body.match_id,(err,results)=>{
            
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
    addTeam: (req,res) =>{ 
        addTeam(req.body.match_id,req.body.team,(err,results)=>{
            
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
    future: (req,res) =>{ 
        future((err,results)=>{
            
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

    update: (req,res) =>{ 
        update(req.body.match_id,req.body.team,(err,results)=>{
            
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
    Unmarked: (req,res) =>{ 
        Unmarked((err,results)=>{
            
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
    unmarked_data: (req,res) =>{ 
        unmarked_data(req.body.match_id,(err,results)=>{
            
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
    unmarked_players: (req,res) =>{ 
        console.log(req.body.match_id)
        unmarked_players(req.body.team_id,req.body.match_id,(err,results)=>{
            
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
    updatescore: (req,res) =>{ 
        console.log(req.body)
        updatescore(req.body.user_id,req.body.match_id,req.body.bat_runs,req.body.bat_balls,req.body.six,req.body.four,req.body.overs, req.body.runs, req.body.balls, req.body.ht,req.body.wkt, req.body.NB,req.body.maiden, req.body.WB, req.body.runOut, req.body.catches,req.body.playedd,req.body.notOut,req.body.AT,req.body.team,(err,results)=>{
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
    updatescore_notP: (req,res) =>{ 
        console.log(req.body)
        updatescore_notP(req.body.user_id,req.body.match_id,req.body.played,req.body.team,(err,results)=>{
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
    marked: (req,res) =>{ 
        marked((err,results)=>{
            
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
    match:(req,res) =>{ 
        match(req.body,(err,results)=>{
            
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
    getAllPlayersFS: (req,res) =>{ 
        console.log("kk")
        getAllPlayersFS((err,results)=>{
            
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
    checkAvailabilityForSession: (req,res) =>{ 
        const user_id=req.body.user_id
        const title=req.body.title
        const session_date= req.body.session_date
        const starting_time= req.body.starting_time
        const ending_time= req.body.ending_time
        console.log(user_id+title+session_date+starting_time+ending_time)
        console.log(req.body)
        checkAvailabilityForSession(title,session_date,starting_time,ending_time,user_id,(err,results)=>{
            
            if(err) {
                console.log(err);
                return
            }
            else{
                console.log(results)
                if(results){
                    return res.json(results);
                }
                
            }
            
        });
        
    },
    deleteNewses: (req,res) =>{ 
        const new_ses_id=req.body.new_ses_id
        console.log(new_ses_id)
        console.log(req.body)
        deleteNewses(new_ses_id,(err,results)=>{
            
            if(err) {
                console.log(err);
                return
            }
            else{
                console.log(results)
                if(results){
                    return res.json(results);
                }
                
            }
            
        });
        
    },
    getPlayersToSessions:(req,res) =>{ 
        const list=req.body.list
        const id=req.body.id
        getPlayersToSessions(list,id,(err,results)=>{
            
            if(err) {
                console.log(err);
                return
            }
            else{
                console.log(results)
                if(results){
                    return res.json(results);
                }
                
            }
            
        });
        
    },
    
    SpecSessionDetails:(req,res) =>{ 

        const id=req.body.id

        SpecSessionDetails(id,(err,results)=>{
            
            if(err) {
                console.log(err);
                return
            }
            else{
                
                if(results){
                    return res.json(results);
                }
                
            }
            
        });
        
    },
    unmarked_players_marked:(req,res) =>{ 
        const id=req.body.id
        // console.log("kkk")
        unmarked_players_marked(req.body.team_id,req.body.match_id,(err,results)=>{
            
            if(err) {
                console.log(err);
                return
            }
            else{
                
                if(results){
                    // console.log(results)
                    return res.json(results);
                }
                
            }
            
        });
        
    },
    check_op_score:(req,res) =>{ 
        // const id=req.body.id
        // console.log(req.body.match_id+"kkkkkkk")
        check_op_score(req.body.match_id,(err,results)=>{
            
            if(err) {
                console.log(err);
                return
            }
            else{
                
                if(results){
                    // console.log(results)
                    return res.json(results);
                }
                
            }
            
        });
        
    },
    score_update:(req,res) =>{ 
        console.log(req.body)
        score_update(req.body.match_id,req.body.team_id,req.body.total,req.body.wiclets,req.body.overs,(err,results)=>{
            
            if(err) {
                console.log(err);
                return
            }
            else{
                
                if(results){
                    // console.log(results)
                    return res.json(results);
                }
                
            }
            
        });
        
    },
    getDataforValidation:(req,res) =>{ 
        console.log(req.body)
        getDataforValidation(req.body.match_id,(err,results)=>{
            
            if(err) {
                console.log(err);
                return
            }
            else{
                
                if(results){
                    // console.log(results)
                    return res.json(results);
                }
                
            }
            
        });
        
    },

}