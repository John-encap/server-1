const pool=require("../../config/database");


function getCouchSessions(id){
    console.log(id)
}
module.exports = {
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
    GetSessions: (body,callBack) =>{
        console.log(body.user_id)
        pool.query(
            `SELECT practice_sessions.session_id,practice_sessions.date,practice_sessions.time,practice_sessions.type,player_practice_session.user_id as player_id,practice_sessions.user_id as coach_id,user.name  FROM practice_sessions INNER JOIN player_practice_session ON practice_sessions.session_id = player_practice_session.session_id INNER JOIN user ON practice_sessions.user_id=user.user_id WHERE player_practice_session.user_id=? and date like ?` ,
            [body.user_id,body.month+'%'],
             
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                
                return callBack(null,results); 
            }
        )
        
    },
    GetSessionPlayers: (body,callBack) =>{
        pool.query(
            `SELECT user.name, user.user_id AS player_ids,practice_sessions.type,practice_sessions.time,practice_sessions.date FROM practice_sessions INNER JOIN player_practice_session ON practice_sessions.session_id=player_practice_session.session_id INNER JOIN user ON player_practice_session.user_id=user.user_id WHERE practice_sessions.session_id=?;` ,
            [body],
             
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results); 
            }
        )
    },

    GetSessionCoach: (body,callBack) =>{
        pool.query(
            `SELECT user.name, user.user_id AS coach_ids FROM practice_sessions INNER JOIN coach_join_practice_session ON practice_sessions.session_id=coach_join_practice_session.session_id INNER JOIN user ON coach_join_practice_session.user_id=user.user_id WHERE practice_sessions.session_id=?;` ,
            [body],
             
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results); 
            }
        )
    },

    GetCouncelling:(body,callBack) =>{
        pool.query(
            `SELECT * FROM counseling_session;` ,
            [body],
             
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results); 
            }
        )
    },
    
    
    GetEvents:(body,callBack) =>{
        pool.query(
            `SELECT * FROM events;` ,
            [body],
             
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results); 
            }
        )
    },
    GetEventDetails:(data,callBack) =>{
        console.log('jjj')
        pool.query(
            `SELECT * FROM events WHERE event_id=?` ,
            [data],
            
             
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results); 
            }
        )
    },
    GetPayments:(data,callBack) =>{
        console.log('jjj')
        pool.query(
            `SELECT * FROM payment WHERE user_id=?` ,
            [data],
            
             
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results ); 
            }
        )
    },
    GetMatchPlayers: (body,callBack) =>{
        pool.query(
            `SELECT * FROM matches INNER JOIN player_play_matches on matches.match_id=player_play_matches.match_id INNER JOIN user ON user.user_id=player_play_matches.user_id WHERE matches.match_id=? AND matches.marked=?`,
            [body.match_id,body.statuss],
             
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results); 
            }
        )
    },

    GetMatchCoach: (body,callBack) =>{
        pool.query(
            `SELECT * FROM matches INNER JOIN couch_join_match on matches.match_id=couch_join_match.match_id INNER JOIN user ON user.user_id=couch_join_match.user_id WHERE matches.match_id=? AND matches.marked=?` ,
            [body,"pending"],
             
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results); 
            }
        )
    },


    GetRanking: (catagory,format,callBack) =>{
        console.log(catagory+format)
        pool.query(
            `SELECT user.name,player_play_matches.user_id, SUM(player_play_matches.runs) AS sumRuns , COUNT(player_play_matches.match_id) AS numMatches , SUM(player_play_matches.no_of_balls_faced) AS sumBalls, SUM(player_play_matches.b_no_of_overs) AS overs , SUM(player_play_matches.b_runs) AS b_runs , SUM(player_play_matches.b_wkts) AS b_wkts , SUM(player_play_matches.b_maiden_overs) AS m_overs , SUM(player_play_matches.b_htricks) AS b_htricks,SUM(player_play_matches.b_wide_balls) AS b_wide_balls,SUM(player_play_matches.b_no_balls) AS b_no_balls,SUM(player_play_matches.sixes) AS sixes,SUM(player_play_matches.fours) AS fours,SUM(player_play_matches.field_runout) AS field_runout,SUM(player_play_matches.no_of_catches) AS no_of_catches   FROM player_play_matches INNER JOIN user ON  player_play_matches.user_id=user.user_id WHERE played=? AND format=? GROUP BY user_id`,
            [1,format],
             
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }

                for(i=0;i<results.length;i++){
                    results[i]['avg']=(results[i].sumRuns/results[i].numMatches).toFixed(2)
                    results[i]['sr']=((results[i].sumRuns/results[i].sumBalls)*100).toFixed(2)
                    results[i]['rating']=parseInt((results[i]['sixes']+results[i]['fours']+results[i]['avg']*7+results[i]['sr']*3)*2/results[i].numMatches,10)
                    results[i]['econ']= (results[i]['b_runs']/results[i]['overs']).toFixed(2)
                    results[i]['B_rating'] = parseInt((3000/results[i]['econ'])+results[i]['b_htricks']*10+results[i]['m_overs']*2+results[i]['b_wkts'],10)
                    results[i]['A_rating'] = parseInt((results[i]['rating'] + results[i]['B_rating'])/2+results[i]['no_of_catches']+results[i]['field_runout'],10)
                    // results[i]['econ']=6.23
                    // results[i]['B_rating']=507
                    // results[i]['A_rating']=603
                }
                
                console.log(results)
                return callBack(null,results);

            }

        )
        
    },

    performanceBowl: (user_id,callBack) =>{
        pool.query(
            `SELECT format,COUNT(match_id) AS M,COUNT(IF(played=1,match_id,NULL)) AS Inn, SUM(b_no_of_overs) AS overs, SUM(b_runs) AS Runs, SUM(b_wkts) AS wkts,b_runs AS econ ,COUNT(IF(b_wkts>=3 AND b_wkts<=5,match_id,NULL)) AS 3W,COUNT(IF(b_wkts>=5,match_id,NULL)) AS 5W,SUM(b_htricks) AS Hatricks,SUM(b_maiden_overs) AS maiden,SUM(b_wide_balls) AS WB,SUM(b_no_balls) AS NB FROM player_play_matches WHERE played=? AND user_id=? GROUP BY format`,
            [1,user_id],
             
            (error,results,fields)=>{
                if(error){ 
                    return callBack(error);
                }
                for(i=0;i<results.length;i++){
                    results[i].econ=((results[i].Runs)/results[i].overs).toFixed(2);
                }
                console.log(results)
                return callBack(null,results);

            }

        )
        
    },
    
    performance: (user_id,callBack) =>{
        pool.query(
            `SELECT format,COUNT(match_id) AS M,COUNT(IF(played=1,match_id,NULL)) AS Inn, SUM(no_of_balls_faced) AS NO, SUM(runs) AS Runs, MAX(runs) AS HS, AVG(runs) AS Avg,COUNT(IF(runs=0,match_id,NULL)) AS Ducks, runs AS SR,COUNT(IF(runs>=50 AND runs<100 ,match_id,NULL)) AS fifty,COUNT(IF(runs>=100 AND runs<200 ,match_id,NULL)) AS hunderd,COUNT(IF(runs>=200 ,match_id,NULL)) AS doubleH,SUM(fours) AS fours,SUM(sixes) AS sixes FROM player_play_matches WHERE played=? AND user_id=? GROUP BY format`,
            [1,user_id],
             
            (error,results,fields)=>{
                if(error){ 
                    return callBack(error);
                }
                for(i=0;i<results.length;i++){
                    results[i].SR=((results[i].Runs*100)/results[i].NO).toFixed(2);
                }
                console.log(results)
                return callBack(null,results);

            }

        )
        
    },
    
    performanceFld: (user_id,callBack) =>{
        pool.query(
            `SELECT SUM(field_runout) AS runout, SUM(no_of_catches) AS catches FROM player_play_matches WHERE played=? AND user_id=?`,
            [1,user_id],
             
            (error,results,fields)=>{
                if(error){ 
                    return callBack(error);
                }
                console.log(results)
                return callBack(null,results);

            }

        )
        
    },

    intro: (user_id,callBack) =>{
        pool.query(
            `SELECT DATE_FORMAT(FROM_DAYS(DATEDIFF(now(),user.dob)), '%Y')+0 AS Age , user.name, player.player_role,player.batting_style,player.bowling_style FROM user INNER JOIN player ON user.user_id=player.user_id WHERE user.user_id = ?`,
            [user_id],
             
            (error,results,fields)=>{
                if(error){ 
                    return callBack(error);
                }
                console.log(results)
                return callBack(null,results);

            }

        )
        
    },
    Attendance:(user_id,month,callBack) =>{
        console.log(month)
        var presentCount=0;
        var absentCount=0;
        pool.query(
            `SELECT player_practice_session.attendance , practice_sessions.session_id ,practice_sessions.type FROM practice_sessions INNER JOIN player_practice_session ON practice_sessions.session_id=player_practice_session.session_id WHERE player_practice_session.user_id = ? AND practice_sessions.date like ?`,
            [user_id,month+"%"],
             
            (error,results,fields)=>{
                if(error){ 
                    return callBack(error);
                }
                for(i=0;i<results.length;i++){
                    if(results[i].attendance===1){
                        results[i].attendance="Present"
                        presentCount++
                    }
                    else if(results[i].attendance===0){
                        results[i].attendance="Absent"
                        absentCount++
                    }
                }
                results[0].presentCount=presentCount
                results[0].absentCount=absentCount
                results[0].presentpercent=(presentCount*100/(presentCount+absentCount)).toFixed(2);
                results[0].absentpercent=(absentCount*100/(presentCount+absentCount)).toFixed(2);


                console.log(results)
                return callBack(null,results);

            }

        )
        
    },

    feedback:(user_id,session_id,callBack) =>{
        pool.query(
            `SELECT  player_practice_session.session_id,player_practice_session.user_id,player_practice_session.bowling_variant,player_practice_session.batting_shotes,player_practice_session.attendance,player_practice_session.feedback,user.name AS couch_name FROM player_practice_session INNER JOIN practice_sessions ON player_practice_session.session_id=practice_sessions.session_id INNER JOIN user ON practice_sessions.user_id = user.user_id WHERE player_practice_session.user_id = ? AND player_practice_session.session_id= ?`,
            [user_id,session_id],
             
            (error,results,fields)=>{
                if(error){ 
                    return callBack(error);
                }
                console.log(results)
                return callBack(null,results);

            }

        )
        
    },

    getAllPlayers:(callBack) =>{
        pool.query(
            `SELECT user.user_id, user.name , player.player_role FROM user INNER JOIN player ON user.user_id=player.user_id WHERE user.role=?`,
            ["player"],
             
            (error,results,fields)=>{
                if(error){ 
                    return callBack(error);
                }
                console.log(results)
                return callBack(null,results);

            }

        )
        
    },

    CreateTeam:(team,date,players,callBack) =>{
        var teamID=0;
        var str="(?,?)"
        var arr=[]
        var rand=Math.floor(Math.random() * 1000000);
        for(let i=0;i<players.length-1;i++){
            str+=",(?,?)"
        }
        console.log(str)
        pool.query(
            `INSERT INTO team (name,date,uniq) VALUES (?,?,?)`,
            [team,date,rand],
             
            (error,results,fields)=>{
                if(error){ 
                    return callBack(error);
                }
                pool.query(
                    `SELECT team_id FROM team WHERE uniq=?`,
                    [rand],
                     
                    (error,results,fields)=>{
                        if(error){ 
                            return callBack(error);
                        }
                        teamID=results[0].team_id
                        for(let i=0;i<2*(players.length);i++){
                            arr[i]=teamID
                            i++
                            console.log(parseInt(i/2, 10))
                            arr[i]=players[parseInt(i/2, 10)]
                            
                        }
                        console.log(arr)
                        console.log(rand)
                        pool.query(
                            `INSERT INTO team_player (team_id,user_id) VALUES `+str,
                            arr,
                             
                            (error,results,fields)=>{
                                if(error){ 
                                    return callBack(error);
                                }
                               
                               
                
                            }
                
                        )
        
                    }
        
                )
                return callBack(null,results);

            }

        )
        
    },

    getTeam:(callBack) =>{
        pool.query(
            `SELECT * FROM team`,
            ["player"],
             
            (error,results,fields)=>{
                if(error){ 
                    return callBack(error);
                }
                console.log(results)
                return callBack(null,results);

            }

        )
        
    },
    
    getTeamDetails:(id,callBack) =>{
        pool.query(
            `SELECT user.user_id,user.name as username,team.name,team.date FROM team_player INNER JOIN user ON team_player.user_id=user.user_id INNER JOIN team ON team.team_id=team_player.team_id WHERE team_player.team_id=?`,
            [id],
             
            (error,results,fields)=>{
                if(error){ 
                    return callBack(error);
                }
                console.log(results)
                return callBack(null,results);

            }

        )
        
    },
    deleteTeam:(id,callBack) =>{
        pool.query(
            `DELETE FROM team WHERE team_id=?`,
            [id],
             
            (error,results,fields)=>{
                if(error){ 
                    return callBack(error);
                }
                console.log(results)
                return callBack(null,results);

            }

        )
        
    },
    addTeamMatches:(callBack) =>{
        pool.query(
            `SELECT op_team_name,match_format,date,ground,match_id FROM matches WHERE date > ? AND team_id=?`,
            ['2022-10-26',0],
             
            (error,results,fields)=>{
                if(error){ 
                    return callBack(error);
                }
                console.log(results)
                return callBack(null,results);

            }

        )
        
    },
    future:(callBack) =>{
        pool.query(
            `SELECT team.name,matches.op_team_name,matches.match_format,matches.date,matches.ground,matches.match_id FROM matches INNER JOIN team ON matches.team_id=team.team_id  WHERE matches.date > ? AND matches.team_id>?`,
            ['2022-10-26',0],
             
            (error,results,fields)=>{
                if(error){ 
                    return callBack(error);
                }
                console.log(results)
                return callBack(null,results);

            }

        )
        
    },
    addTeamMatchesDet:(id,callBack) =>{
        pool.query(
            `SELECT matches.op_team_name,matches.match_format,matches.date,matches.ground,matches.match_id,matches.team_id  FROM matches  WHERE matches.match_id=? `,
            [id],
             
            (error,results,fields)=>{
                if(error){ 
                    return callBack(error);
                }
                console.log(results)
                return callBack(null,results);

            }

        )
        
    },
    // addTeamMatchesDet:(id,callBack) =>{
    //     pool.query(
    //         `SELECT matches.op_team_name,matches.match_format,matches.date,matches.ground,matches.match_id,matches.team_id , team.name FROM matches INNER JOIN team ON team.team_id=matches.team_id WHERE matches.match_id=? `,
    //         [id],
             
    //         (error,results,fields)=>{
    //             if(error){ 
    //                 return callBack(error);
    //             }
    //             console.log(results)
    //             return callBack(null,results);

    //         }

    //     )
        
    // },
    addTeam:(id,team,callBack) =>{
        console.log(team)
        pool.query(
            `UPDATE matches SET team_id=? WHERE match_id=? `,
            [team,id],
             
            (error,results,fields)=>{
                if(error){ 
                    return callBack(error);
                }
                //''''''''''''''''''''''''''''''''''''''''''
                // pool.query(
                //     `SELECT user_id FROM team_player WHERE team_id=? `,
                //     [team],
                     
                //     (error,resultsS,fields)=>{
                //         if(error){ 
                //             return callBack(error);
                //         }
                //         //playeslage id tika player_play_match ekata danna
                //         console.log(resultsS)
                //         for(let i=0;i<2*resultsS.length;i++){
                //             arr[i]=teamID
                //             i++
                //             console.log(parseInt(i/2, 10))
                //             arr[i]=players[parseInt(i/2, 10)]
                //         }
                        
                //         // return callBack(null,results);
        
                //     }
        
                // )
                //''''''''''''''''''''''''''''''''''''''''''
                // console.log(results)
                // return callBack(null,results);

            }

        )
        
    },
    update:(id,team,callBack) =>{
        console.log(team)
        pool.query(
            `UPDATE matches SET team_id=? WHERE match_id=? `,
            [team,id],
             
            (error,results,fields)=>{
                if(error){ 
                    return callBack(error);
                }
                console.log(results)
                return callBack(null,results);

            }

        )
        
    },
    Unmarked:(callBack) =>{
        // console.log("jknkjnkjnknjkjn")
        pool.query(
            `SELECT matches.match_id,matches.match_format as format,matches.date,team.name,matches.time,matches.op_team_name,matches.ground FROM matches LEFT JOIN team ON matches.team_id=team.team_id WHERE matches.marked = ? AND matches.date < ? GROUP BY matches.match_id `,
            [0,'2022-10-26'],
             
            (error,results,fields)=>{
                if(error){ 
                    return callBack(error);
                }
                console.log(results)
                return callBack(null,results);

            }

        )
        
    },
    unmarked_data:(id,callBack) =>{
        // console.log("jknkjnkjnknjkjn")
        pool.query(
            `SELECT matches.match_id,matches.match_format as format,matches.date,matches.time,matches.op_team_name,matches.ground FROM matches WHERE matches.match_id = ? `,
            [id],
             
            (error,results,fields)=>{
                if(error){ 
                    return callBack(error);
                }
                console.log(results)
                return callBack(null,results);

            }

        )
        
    },
    unmarked_players:(id,callBack) =>{
        // console.log("jknkjnkjnknjkjn")
        pool.query(
            `SELECT matches.match_id,matches.match_format as format,matches.date,matches.time,matches.op_team_name,matches.ground, team_player.user_id , user.name AS player_name FROM matches RIGHT JOIN team_player ON matches.team_id=team_player.team_id INNER JOIN user ON team_player.user_id=user.user_id  WHERE matches.match_id = ? `,
            [id],
             
            (error,results,fields)=>{
                if(error){ 
                    return callBack(error);
                }
                console.log(results)
                return callBack(null,results);

            }

        )
        
    },
    

    updatescore:(player,id,bat_runs,bat_balls,six,four,overs, runs, balls, ht,wkt, NB,maiden, WB, runOut, catches,playedd,notOut,callBack) =>{
        // // console.log("jknkjnkjnknjkjn")
        // pool.query(
        //     `INSERT INTO`,
        //     [bat_runs,bat_balls,six,four,overs, runs, balls, ht,wkt, NB,maiden, WB, runOut, catches,playedd,notOut,player,id],
             
        //     (error,results,fields)=>{
        //         if(error){ 
        //             return callBack(error);
        //         }
        //         console.log(results)
        //         return callBack(null,results);

        //     }

        // )
        
    },
    


}