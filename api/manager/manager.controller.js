// const jwt =require("jsonwebtoken");
const { _getDate } = require("lanka-nic");
const {
  create,
  getMatch,
  checkDateGround,
  addSession,
  selectPaidPlayer,
  selectUnpaidPlayer,
  getPassword,
  checkMatchExist,
  insertEvent,
  checkEventExist,
  checkSessionExist,
  getUpcommingEvent,
  getOldEvent,
  getUpcommingSession,
  getOldSession,
  getEvent,
  getSession,
  getTeamAchi,
  addTeamAchi,
  addMembership,
} = require("./manager.service");
const { compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");

let pass = "";
let comp = "";

module.exports = {
  AddTournament: (req, res) => {
    const body = req.body;

    checkDateGround(body, (err, results) => {
      if (err) {
        console.log("SelectDate getDate error : ", err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
          data: body,
          err: err,
        });
      }

      // return res.json({
      // success:1,
      // resData : results,
      lengthed = Object.values(Object.values(Object.keys(results))).length;

      if (lengthed == 0) {
        create(body, (err, results) => {
          if (err) {
            // console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Database connection error",
              data: body,
              err: err,
            });
          }

          return res.status(200).json({
            success: 1,
            data: results,
          });
        });
      } else {
        return res.json({
          validation: `ground is allready booked for ${body.date}`,
        });
      }

      // })
    });
  },

  SelectMatch: (req, res) => {
    getMatch((err, results) => {
      if (err) {
        console.log("error adfsvfs", err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
          data: body,
          err: err,
        });
      }
      return res.json({
        // success: 1,
        data: results,
      });
    });
  },

  SelectDate: (req, res) => {
    const headder = req.headder;
    getDate(headder.id, (err, results) => {
      if (err) {
        console.log("SelectDate getDate error : ", err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
          data: body,
          err: err,
        });
      }
      return res.json({
        // success:1,
        // resData : results,
        lengthed: Object.values(Object.values(Object.keys(results))).length,
      });
    });
  },

  PaidPlayer: (req, res) => {
    selectPaidPlayer((err, results) => {
      if (err) {
        console.log("error adfsvfs", err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
          data: body,
          err: err,
        });
      }
      return res.json({
        // success: 1,
        data: results,
      });
    });
  },
  UnpaidPlayer: (req, res) => {
    selectUnpaidPlayer((err, results) => {
      if (err) {
        console.log("error adfsvfs", err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
          data: body,
          err: err,
        });
      }
      return res.json({
        // success: 1,
        data: results,
      });
    });
  },
  CheckPassword: (req, res) => {
    const data = req.body;
    getPassword(data, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
          data: body,
          err: err,
        });
      }
      if (!result) {
        console.log(result);
        return res.status(500).json({
          success: 0,
        });
      }
      if (result) {
        console.log(result);
        pass = result[0].password;
        console.log(pass.password);
        comp = compareSync(data.password, pass);
        if (comp) {
          return res.json({
            // success: 1,
            pass: data.password,
            data: pass,
            comp: comp,
            message: "password is matched",
          });
        } else {
          return res.json({
            message: "password is not matched",
          });
        }
      }
    });
  },

  AddEvent: (req, res) => {
    let eventExist = 0;
    let matchExist = 0;
    const data = req.body;

    checkEventExist(data, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          error: err,
        });
      }
      eventExist = Object.keys(result).length;

      if (eventExist === 0) {
        checkMatchExist(data, (err, result) => {
          if (err) {
            return res.status(500).json({
              success: 0,
              error: err,
            });
          }
          matchExist = Object.keys(result).length;

          if (matchExist === 0) {
            insertEvent(data, (err, result) => {
              if (err) {
                return res.status(500).json({
                  success: 0,
                  error: err,
                });
              }

              return res.json({
                message: `Event Added Successfully`,
                success: 1,
                data: result,
              });
            });
          } else {
            return res.json({
              message: `Already Have "${result[0].match_format}" Match on "${result[0].date}"`,
              success: 0,
              matchExist: matchExist,
            });
          }
        });
      } else {
        return res.json({
          message: `Already Have "${result[0].event_name}" Event on "${result[0].date}"`,
          success: 0,
          eventExist: eventExist,
        });
      }
    });
  },
  AddSession: (req, res) => {
    let eventExist = 0;
    let matchExist = 0;
    let sessionExist = 0;
    const data = req.body;

    checkEventExist(data, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          error: err,
        });
      }
      eventExist = Object.keys(result).length;

      if (eventExist === 0) {
        checkMatchExist(data, (err, result) => {
          if (err) {
            return res.status(500).json({
              success: 0,
              error: err,
            });
          }
          matchExist = Object.keys(result).length;

          if (matchExist === 0) {
            checkSessionExist(data, (err, result) => {
              if (err) {
                return res.status(500).json({
                  success: 0,
                  error: err,
                });
              }
              eventExist = Object.keys(result).length;

              if (eventExist === 0) {
                addSession(data, (err, result) => {
                  if (err) {
                    return res.status(500).json({
                      success: 0,
                      error: err,
                    });
                  }

                  return res.json({
                    message: `Session Added Successfully`,
                    success: 1,
                    data: result,
                  });
                });
              } else {
                return res.json({
                  message: `Already Have "${result[0].title}" Session on "${result[0].date}"`,
                  success: 0,
                  data: result,
                });
              }
            });
          } else {
            return res.json({
              message: `Already Have "${result[0].match_format}" Match on "${result[0].date}"`,
              success: 0,
              matchExist: matchExist,
            });
          }
        });
      } else {
        return res.json({
          message: `Already Have "${result[0].event_name}" Event on "${result[0].date}"`,
          success: 0,
          eventExist: eventExist,
        });
      }
    });
  },
  GetUpcommingEvent: (req, res) => {
    var CurrentDate = new Date();
    getUpcommingEvent(CurrentDate, (err, results) => {
      if (err) {
        console.log("error adfsvfs", err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
          data: body,
          err: err,
        });
      }
      return res.json({
        // success: 1,
        data: results,
      });
    });
  },
  GetOldEvent: (req, res) => {
    var CurrentDate = new Date();
    getOldEvent(CurrentDate, (err, results) => {
      if (err) {
        console.log("error adfsvfs", err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
          data: body,
          err: err,
        });
      }
      return res.json({
        // success: 1,
        data: results,
      });
    });
  },

  GetUpcommingSession: (req, res) => {
    var CurrentDate = new Date();
    getUpcommingSession(CurrentDate, (err, results) => {
      if (err) {
        console.log("error adfsvfs", err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
          data: body,
          err: err,
        });
      }
      return res.json({
        // success: 1,
        data: results,
      });
    });
  },

  GetOldSession: (req, res) => {
    var CurrentDate = new Date();
    getOldSession(CurrentDate, (err, results) => {
      if (err) {
        console.log("error adfsvfs", err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
          data: body,
          err: err,
        });
      }
      return res.json({
        // success: 1,
        data: results,
      });
    });
  },
  SelectEvent: (req, res) => {
    const data = req.body;
    getEvent(data.id, (err, results) => {
      if (err) {
        console.log("error adfsvfs", err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
          data: body,
          err: err,
        });
      }
      return res.json({
        // success: 1,
        data: results,
      });
    });
  },
  SelectSession: (req, res) => {
    const data = req.body;
    getSession(data.id, (err, results) => {
      if (err) {
        console.log("error adfsvfs", err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
          data: body,
          err: err,
        });
      }
      return res.json({
        // success: 1,
        data: results,
      });
    });
  },

  GetTeamAchi: (req, res) => {
    getTeamAchi((err, results) => {
      if (err) {
        console.log("error adfsvfs", err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
          data: body,
          err: err,
        });
      }
      return res.json({
        // success: 1,
        data: results,
      });
    });
  },

  AddTeamAchi: (req, res) => {
    const data = req.body;
    addTeamAchi(data, (err, results) => {
      if (err) {
        console.log("error adfsvfs", err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
          data: body,
          err: err,
        });
      }
      return res.json({
        // success: 1,
        data: results,
      });
    });
  },

  AddMembership:(req,res)=>{
    const data = req.body;
    addMembership(data,(err,results) => {
      if (err) {
        console.log("error adfsvfs", err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
          data: body,
          err: err,
        });
      }
      return res.json({
        // success: 1,
        data: results,
      });
    })
  }
};
