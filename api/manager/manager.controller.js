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

  AddSession: (req, res) => {
    const body = req.body;

    addSession(body, (err, results) => {
      if (err) {
        console.log(err);
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
      if(!result){
        console.log(result)
        return res.status(500).json({
          success: 0,
        });
      }
      if(result){ 
        console.log(result)
        pass = result[0].password;
        console.log(pass.password);
        comp = compareSync(data.password , pass);
       if(comp) {
        return res.json({
          // success: 1,
          pass:data.password,
          data: pass,
          comp: comp,
          message: "password is matched",
        });
       }
       else{
        return res.json({
          
          message: "password is not matched",
        });

       }
        
      }  

    });
  },

  AddEvent: (req,res) => {
    let eventExist = 0;
    let matchExist = 0;
    const data = req.body;
    
    checkEventExist(data,(err,result)=>{
      if(err){
        return res.status(500).json({
          success:0,
          error:err,
        })
      }
      eventExist = Object.keys(result).length;

      if(eventExist === 0){
        checkMatchExist(data,(err,result)=>{
          if(err){
            return res.status(500).json({
              success:0,
              error:err,
            })
          }
          matchExist = Object.keys(result).length;

          if(matchExist === 0){
            insertEvent(data,(err,result)=>{
              if(err){
                return res.status(500).json({
                  success:0,
                  error:err,
                })
              }
        
              return res.json({
                success:1,
                data: result,
              })
            });
          }else{
            return res.json({
              match:result,
              matchExist:matchExist,
            })
          }
        });
      }else{
        return res.json({
          event:result,
          eventExist:eventExist,
        })
      }
      

    });

   

    // if(matchExist == 0 && eventExist == 0 ){
      
    // }else{
      // return res.json({
      //   matchExist:matchExist,
      //   eventExist:eventExist,
      // })
    // }
    

  }
};
