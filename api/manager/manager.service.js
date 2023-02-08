const pool = require("../../config/database");
// const {genSaltSync,hashSync}=require("bcrypt");
// const lankaNIC = require("lanka-nic");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO matches (match_format, ground, date, time, op_team_name,title,team_icon ) VALUES (?,?,?,?,?,?,?) `,
      [
        data.match_format,
        data.ground,
        data.date,
        data.time,
        data.op_team_name,
        data.title,
        data.image,
      ],
      (error, results, fields) => {
        if (error) {
          console.log("server error is : ", error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getMatch: (callBack) => {
    pool.query(`SELECT * FROM matches `, [], (error, results, fields) => {
      if (error) {
        // console.log("getMatch error", error);
        return callBack(error);
      }
      return callBack(null, results);
    });
  },
  checkDateGround: (data, callBack) => {
    pool.query(
      `SELECT date,ground FROM matches WHERE date = ? && ground = ?`,
      [data.date, data.ground],
      (error, results, fields) => {
        if (error) {
          console.log("getDate error :", error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getGround: (ground, callBack) => {
    pool.query(
      `SELECT ground FROM matches WHERE ground = ?`,
      [ground],
      (error, results, fields) => {
        if (error) {
          console.log("getGround error :", error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  addPracticeMatch: (data, callBack) => {

    console.log(data);
    pool.query(
      `SELECT COUNT(date) as eventCount FROM events WHERE date = ?`,
      [data.date],
      (error, results1, fields) => {
        if (error) {
          console.log("insert event error : ", error);
          return callBack(error);
        } else {
          if (results1[0].eventCount > 0) {
            return callBack(null, {
              success: 0,
              status: "Insert Fails!",
              message:
                "Unable to insert, already have an event on " + data.date,
            });
          } else {
            pool.query(
              `SELECT COUNT(date) as matchCount FROM matches WHERE date = ?`,
              [data.date],
              (error, results2, fields) => {
                if (error) {
                  console.log("insert event error : ", error);
                  return callBack(error);
                } else {
                  if (results2[0].matchCount > 0) {
                    return callBack(null, {
                      success: 0,
                      status: "Insert Fails!",
                      message:
                        "Unable to insert, already have a match on " +
                        data.date,
                    });
                  } else{
                    pool.query(
                      `INSERT INTO matches (match_format, ground, date, time, op_team_name,title,team_icon ) VALUES (?,?,?,?,?,?,?) `,
                      [
                        data.match_format,
                        data.ground,
                        data.date,
                        data.time,
                        data.op_team_name,
                        data.title,
                        data.team_icon,
                      ],
                      (error, results, fields) => {
                        if (error) {
                          return callBack(error);
                        } else {
                          return callBack(null, {
                            success: 1,
                            status: "Successfuly Add!",
                            message: "Session Successfuly Added!",
                          });
                        }
                      }
                    );
                  }
                }
              }
            );
          }
        }
      }
    );
  },
  addSession: (data, callBack) => {

    console.log(data);
    pool.query(
      `SELECT COUNT(date) as eventCount FROM events WHERE date = ?`,
      [data.date],
      (error, results1, fields) => {
        if (error) {
          console.log("insert event error : ", error);
          return callBack(error);
        } else {
          if (results1[0].eventCount > 0) {
            return callBack(null, {
              success: 0,
              status: "Insert Fails!",
              message:
                "Unable to insert, already have an event on " + data.date,
            });
          } else {
            pool.query(
              `SELECT COUNT(date) as matchCount FROM matches WHERE date = ?`,
              [data.date],
              (error, results2, fields) => {
                if (error) {
                  console.log("insert event error : ", error);
                  return callBack(error);
                } else {
                  if (results2[0].matchCount > 0) {
                    return callBack(null, {
                      success: 0,
                      status: "Insert Fails!",
                      message:
                        "Unable to insert, already have a match on " +
                        data.date,
                    });
                  } else {
                    pool.query(
                      `SELECT COUNT(date) as sessionCount FROM counseling_session WHERE date = ?`,
                      [data.date],
                      (error, results3, fields) => {
                        if (error) {
                          console.log("insert event error : ", error);
                          return callBack(error);
                        } else {
                          if (results3[0].sessionCount > 0) {
                            return callBack(null, {
                              success: 0,
                              status: "Insert Fails!",
                              message:
                                "Unable to insert, already have a session on " +
                                data.date,
                            });
                          } else {
                            pool.query(
                              `INSERT INTO counseling_session (date, time, mentor, mentor_details, title, place ) VALUES (?,?,?,?,?,?) `,
                                [
                                  data.date,
                                  data.time,
                                  data.mentor,
                                  data.mentor_details,
                                  data.title,
                                  data.place,
                                ],
                              (error, results, fields) => {
                                if (error) {
                                  return callBack(error);
                                } else {
                                  return callBack(null, {
                                    success: 1,
                                    status: "Successfuly Add!",
                                    message: "Session Successfuly Added!",
                                  });
                                }
                              }
                            );
                          }
                        }
                      }
                    );
                  }
                }
              }
            );
          }
        }
      }
    );
  },
  selectPaidPlayer: (callBack) => {
    pool.query(
      `SELECT user.user_id, payment.total_amount, user.name,user.role, user.image, payment.date FROM payment INNER JOIN user ON payment.user_id = user.user_id WHERE user.role = ? AND user.status = 1 AND payment.year=2022`,

      ["player"],
      (error, results, fields) => {
        if (error) {
          console.log("getMatch error", error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  selectUnpaidPlayer: (callBack) => {
    pool.query(
     
      `SELECT name , user_id, role, image
      FROM user
      WHERE NOT EXISTS (SELECT user_id FROM payment WHERE payment.user_id = user.user_id AND year != 2022 )`,
      [],
      (error, results, fields) => {
        if (error) {
          console.log("getMatch error", error);
          return callBack(error);
        }
        console.log("this is unpaid : ", results);

        return callBack(null, results);
      }
    );
  },

  getPassword: (data, callBack) => {
    pool.query(
      `SELECT password FROM user WHERE nic = ?`,
      [data.nic],
      (error, results, fields) => {
        if (error) {
          console.log("getDate error :", error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  checkMatchExist: (data, callBack) => {
    pool.query(
      `SELECT date, match_format FROM matches WHERE date = ?`,
      [data.date],
      (error, results, fields) => {
        if (error) {
          console.log("get match error : ", error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  checkEventExist: (data, callBack) => {
    pool.query(
      `SELECT event_name, date FROM events WHERE date = ?`,
      [data.date],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  insertEvent: (data, callBack) => {
    console.log(data);
    pool.query(
      `SELECT COUNT(date) as eventCount FROM events WHERE date = ?`,
      [data.date],
      (error, results1, fields) => {
        if (error) {
          console.log("insert event error : ", error);
          return callBack(error);
        } else {
          if (results1[0].eventCount > 0) {
            return callBack(null, {
              success: 0,
              status: "Insert Fails!",
              message:
                "Unable to insert, already have an event on " + data.date,
            });
          } else {
            pool.query(
              `SELECT COUNT(date) as matchCount FROM matches WHERE date = ?`,
              [data.date],
              (error, results2, fields) => {
                if (error) {
                  console.log("insert event error : ", error);
                  return callBack(error);
                } else {
                  if (results2[0].matchCount > 0) {
                    return callBack(null, {
                      success: 0,
                      status: "Insert Fails!",
                      message:
                        "Unable to insert, already have a match on " +
                        data.date,
                    });
                  } else {
                    pool.query(
                      `SELECT COUNT(date) as sessionCount FROM counseling_session WHERE date = ?`,
                      [data.date],
                      (error, results3, fields) => {
                        if (error) {
                          console.log("insert event error : ", error);
                          return callBack(error);
                        } else {
                          if (results3[0].sessionCount > 0) {
                            return callBack(null, {
                              success: 0,
                              status: "Insert Fails!",
                              message:
                                "Unable to insert, already have a session on " +
                                data.date,
                            });
                          } else {
                            pool.query(
                              `INSERT INTO events (event_name, date, time, description) VALUES (?,?,?,?)`,
                              [
                                data.name,
                                data.date,
                                data.time,
                                data.description,
                              ],
                              (error, results, fields) => {
                                if (error) {
                                  return callBack(error);
                                } else {
                                  return callBack(null, {
                                    success: 1,
                                    status: "Successfuly Add!",
                                    message: "Event Successfuly Added!",
                                  });
                                }
                              }
                            );
                          }
                        }
                      }
                    );
                  }
                }
              }
            );
          }
        }
      }
    );
  },
  checkSessionExist: (data, callBack) => {
    pool.query(
      `SELECT title, date FROM counseling_session WHERE date = ?`,
      [data.date],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUpcommingEvent: (data, callBack) => {
    pool.query(
      `SELECT * FROM events WHERE date >= ?`,
      [data],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getOldEvent: (data, callBack) => {
    pool.query(
      `SELECT * FROM events WHERE date < ?`,
      [data],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUpcommingSession: (data, callBack) => {
    pool.query(
      `SELECT * FROM counseling_session WHERE date >= ?`,
      [data],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getOldSession: (data, callBack) => {
    pool.query(
      `SELECT * FROM counseling_session WHERE date < ?`,
      [data],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getEvent: (data, callBack) => {
    pool.query(
      `SELECT * FROM events WHERE event_id = ?`,
      [data],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getSession: (data, callBack) => {
    pool.query(
      `SELECT * FROM counseling_session WHERE c_session_id = ?`,
      [data],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getTeamAchi: (callBack) => {
    pool.query(`SELECT * FROM achievement`, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },
  addTeamAchi: (data, callBack) => {
    pool.query(
      `INSERT INTO team_achievment (title, date, description, image) VALUES (?,?,?,?) `,
      [data.title, data.date, data.description, data.image],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  addMembership: (data, callBack) => {
    pool.query(
      `INSERT INTO payment (date,total_amount,user_id,time,year) VALUES (?,?,?,?,?)`,
      [data.date, data.total_amount, data.user_id, data.time, data.year],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  playerRole: (data, callBack) => {
    pool.query(
      `SELECT * FROM player WHERE user_id = ?`,
      [data.user_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteEvent: (data, callBack) => {
    pool.query(
      `DELETE FROM events WHERE event_id = ?`,
      [data.event_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  deleteSession: (data,callBack)=>{
    pool.query(
      `DELETE FROM counseling_session WHERE c_session_id = ?`,
      [data.session_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  editSession: (data, callBack) => {
    pool.query(
      `UPDATE counseling_session SET title = $1 , date= $2, time = $3, mentor = $4, mentor_details = $5, place = $6 WHERE c_session_id = $7`,
      [
        data.title,
        data.date,
        data.time,
        data.mentor,
        data.mentor_datails,
        data.place,
        data.session_id,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  amounts: (callBack) => {
    pool.query(`SELECT * FROM admin`, [], (error, results, fields) => {
      if (error) {
        console.log("getDate error :", error);
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

  addMatchTitle: (data, callBack) => {
    pool.query(
      `INSERT INTO match_title (title , date) VALUES (?,?)`,
      [data.title, data.date],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getMatchTitle: (callBack) => {
    pool.query(`SELECT * FROM match_title`, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

  deleteMatchTitle: (data,callBack)=>{
    pool.query(`DELETE FROM  match_title WHERE title = ?`,[data.match_title],
    (error, results, fields) => {
      if(error) {
        return callBack(error)
      }
      return callBack(null, results)
    })
  },

  deleteMatch: (data, callBack) => {
    pool.query(
      `DELETE FROM matches WHERE match_id = ?`,
      [data.match_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  addAchivement: (data, callBack) => {
    pool.query(
      `INSERT INTO achievement (title , date , description , image ) VALUES (?,?,?,?)`,
      [data.title, data.date, data.description, data.image],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  addYearMembership: (data, callBack) => {
    pool.query(
      `INSERT INTO membership_fee (year , amount) VALUES (?,?)`,
      [data.year, data.amount],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  editMembership: (data, callBack) => {
    pool.query(
      `UPDATE membership_fee SET amount = ? WHERE year = ? `,
      [data.amount, data.year],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getMembership: (callBack) => {
    pool.query(`SELECT * FROM membership_fee`, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },
  getLastRow: (callBack) => {
    pool.query(
      `SELECT * FROM membership_fee ORDER BY year DESC LIMIT 1`,
      [],
      (error, results, fiellds) => {
        if (error) {
          console.log("get last row error : ", error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  findPaid: (data, callBack) => {
    pool.query(
      `SELECT * FROM payment WHERE year = ?`,
      [data.year],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getFeedback: (callBack)=>{
    pool.query(
      `SELECT club_feedback.feedback, club_feedback.date, user.name, user.role FROM club_feedback LEFT JOIN user ON club_feedback.user_id=user.user_id ORDER BY club_feedback.date DESC`,
      [],
      (error,results,fields)=>{
        if(error) {
          return callBack(error);
        }else{
          return callBack(null,results);
        }
      }
    );
  },
  deleteAchievement: (data,callBack)=>{
    pool.query(
      `DELETE FROM achievement WHERE a_id = ?`,
      [data.a_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  }
};
