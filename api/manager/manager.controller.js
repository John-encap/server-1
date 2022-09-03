// const jwt =require("jsonwebtoken");
const { _getDate } = require("lanka-nic");
const { create, getMatch, getDate,  addSession } = require("./manager.service");

module.exports = {
  AddTournament: (req, res) => {
    const body = req.body;

    getDate(body.date, (err, results) => {
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
      }

      else{

        return res.json({
            validation: "Date is allready booked",
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

  AddSession:(req, res) =>{
    const body = req.body;

    addSession(body, (err,results)=>{
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
  }
};
