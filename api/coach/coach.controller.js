const {getSessionToday, getSessionAll, checkDateTimePracticeSession, addDateTime, getPlayers, getCoaches, getAssignedPlayers, getAssignedCoaches, markSessionAttendance, allTeamA, pastAndMark} = require("./coach.service");


module.exports = {

    GetPSessionToday: (req,res) =>{
        const body = req.body;
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
        // console.log(body.id); 
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

    AddDateTime: (req,res) =>{
        const body = req.body;

        checkDateTimePracticeSession(body.date, body.time, (err, result)=>{
            if(err){
                console.log(err);
                return
            }

            console.log(result);

            //sessionExist = Object.keys(result).length;

            if(result === 0){

                addDateTime(body.id, body.type, body.date, body.time, (err, result) => {

                    if(err){
                        console.log(err);
                        return
                    }


                    if(!result){

                        return res.json({
                            success: 0,
                            data: "not added",
                        });

                    }
                    else{
                        return res.json({
                            success: 1,
                            data: "Successfully added",
                        });
                    }

                });

            }
            else{

                if(result){
                    return res.json({
                        success: 0,
                        data: "Have another session",
                    });
                }

            }
        }

        );
    },

    GetPlayers: (req,res) =>{
        const body = req.body;
        getPlayers(body.date, body.time,(err, results)=>{

            if(err) {
                console.log(err);
                return
            }
            if(!results){
                return res.json({
                    success: 0,
                    data: "no coaches",
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


    GetCoaches: (req,res) =>{
        const body = req.body;
        getCoaches(body.date, body.time,(err, results)=>{

            if(err) {
                console.log(err);
                return
            }
            if(!results){
                return res.json({
                    success: 0,
                    data: "no coaches",
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

    GetAssignedPlayers: (req, res) => {
        const body = req.body;
        getAssignedPlayers(body.id, (err, results) => {
            if(err) {
                console.log(err);
                return
            }
            if(!results){
                return res.json({
                    success: 0,
                    data: "no players",
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

    GetAssignedCoaches: (req, res) => {
        const body = req.body;
        getAssignedCoaches(body.id, (err, results) => {
            if(err) {
                console.log(err);
                return
            }
            if(!results){
                return res.json({
                    success: 0,
                    data: "no coaches",
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

    // UpdateDateonSession: (req, res) =>{
    //     const body = req.body;
    //     checkDateTimePracticeSession(body.date, body.time, (err, result)=>{
    //         if(err){
    //             console.log(err);
    //             return
    //         }

    //         console.log(result);

    //         //sessionExist = Object.keys(result).length;

    //         if(result === 0){

    //             addDateTime(body.id, body.type, body.date, body.time, (err, result) => {

    //                 if(err){
    //                     console.log(err);
    //                     return
    //                 }


    //                 if(!result){

    //                     return res.json({
    //                         success: 0,
    //                         data: "not added",
    //                     });

    //                 }
    //                 else{
    //                     return res.json({
    //                         success: 1,
    //                         data: "Successfully added",
    //                     });
    //                 }

    //             });

    //         }
    //         else{

    //             if(result){
    //                 return res.json({
    //                     success: 0,
    //                     data: "Have another session at that time",
    //                 });
    //             }

    //         }
    //     }

    //     );
    // },

    MarkSessionAttendance: (req, res) => {
        const body = req.body;
        markSessionAttendance(body.sessionId, body.playerId, body.attendance, body.battingShots, body.bowlingVariant, body.feedback, (err, results) => {

            if(err) {
                console.log(err);
                return
            }

            if(!results){
                return res.json({
                    success: 0,
                    data: "unsuccessfully mark attendance",
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

    AllTeamA: (req, res) => {//db wens karapn
        const body = req.body;
        allTeamA((err, results) => {
            if(err) {
                console.log(err);
                return
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

    PastAndMark: (req, res) => {
        pastAndMark((err, results) => {
            if(err) {
                console.log(err);
                return
            }
            if(!results){
                return res.json({
                    success: 0,
                    data: "no Past maches details",
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