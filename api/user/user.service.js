const pool=require("../../config/database");
const {genSaltSync,hashSync}=require("bcrypt");
const lankaNIC = require("lanka-nic");

module.exports = {
    create: (data,callBack) =>{
        let { gender } = lankaNIC.getInfoFromNIC(data.nic);
        const salt = genSaltSync(10);
        const password = hashSync(data.nic, salt);
        if(data.role=="bawling"||data.role=="batting"||data.role=="allrounder"){
            data.role="player"
        }
        console.log(data.name)
        pool.query(
            `INSERT INTO user ( name,nic,contact,email,address,role,gender,password) VALUES ( ?,?,?,?,?,?,?,?)`,
            [
                
                data.name,
                data.nic,
                data.contact,
                data.e_mail,
                data.address,
                data.role,
                gender,
                password
            ],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
        
    },

    getEmployee: callBack =>{
        
        pool.query(
            `SELECT name, gender, nic, contact, email, address,role FROM user WHERE role='coach' OR role='manager'`,
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
        
    },
    getPlayer: callBack =>{
        
        pool.query(
            `SELECT user_id, name, gender, nic, contact, email, address,role FROM user WHERE role='player'`,
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
        
    },
    login: (email,callBack) =>{
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

    select_contact: (data , callBack) => {
        pool.query(
            `SELECT contact FROM user WHERE contact = ? `,
            [
                data.contact
            ],
            (error,results,fields) => {
                if(error){
                    console.log("getDate error :" , error);
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    select_email: (data , callBack) => {
        pool.query(
            `SELECT contact FROM user WHERE email = ? `,
            [
                data.contact
            ],
            (error,results,fields) => {
                if(error){
                    console.log("getDate error :" , error);
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    select_nic: (data , callBack) => {
        pool.query(
            `SELECT contact FROM user WHERE nic = ? `,
            [
                data.contact
            ],
            (error,results,fields) => {
                if(error){
                    console.log("getDate error :" , error);
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    
}