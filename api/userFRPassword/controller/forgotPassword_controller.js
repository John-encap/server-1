const { isEmpty } = require("../isEmpty");
const pool = require("../../../config/database");
const { forgot_password_model, reset_password_model } = require("../forgotpwd_model");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const JWT_SECRET = "ucsc";

exports.link_generator = (req, res, next) => {

    if (isEmpty(req.body)) return res.json({ error: "form data not found" });

    try {

        const { error } = forgot_password_model.validate(req.body);

        if (error) return res.json({ error: error.details[0].message })

        pool.query("SELECT * FROM user WHERE email = ?", [req.body.email], async (err, data, fields) => {

            if (err) return res.json({ error: err });

            if (data.length === 0) return res.json({ error: "no user found" });

            const secret = JWT_SECRET + data.password;

            const token = await JWT.sign({ email: data.email, id: data.user_id }, secret, { expiresIn: "5m" });

            const link = `http://localhost:3000/${data[0].user_id}/${token}`;

            const user_name = data[0].name;

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "bloomfieldgroupp@gmail.com",
                    pass: "fievestimyoakpii"
                },
            });

            const mailOptions = {
                from: "bloomfieldgroupp@gmail.com",
                to: data[0].email,
                subject: "Reset Password Link",
                html: 
                `<!DOCTYPE html>
                <html>
                <body>
                
                <h1 style="font-size: 20px; font-family: Monospace; font-weight: bolder;">Hi ${user_name},</h1>
                
                <p style="font-size: 12px; font-family: Monospace;">You have received this email because a password reset request for your Bloomfield account was received.
                </p>
                
                <p style="font-size: 12px; font-family: Monospace;">Click the button below to reset your password:</p>
                
                <div style="width: 100%; display: flex; justify-content: center;"> 
                <a href="${link}">
                  <button style="
                  background-color: #009270;
                  border: none;
                  color: white;
                  padding: 10px 32px;
                  text-align: center;
                  display: inline-block;
                  font-size: 13px;
                  cursor: pointer;
                  font-family: Monospace;
                  font-weight: bolder;
                  border-radius: 5px;">
                  Reset your password
                  </button>
                 </a>
                </div>
                
                <p style="font-size: 12px; font-family: Monospace;">If you didnot request a password, no further action is required on your part.</p>
                
                <p style="font-size: 12px; font-family: Monospace;">Thanks,<br>Bloomfield team.</p>
                
                </body>
                </html>`
            
            }

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    res.json({
                        error: error
                    })
                }
                else {
                    res.json({
                        status: "Link send to email"
                    })
                }
            });

        });

    }
    catch (err) {
        res.json({
            error: err
        })
    }

}

exports.render_newpwd_page = (req, res, next) => {

    if (isEmpty(req.body)) return res.json({ error: "not valid url" });

    pool.query("SELECT * FROM user WHERE user_id = ?", [req.body.user_id], async (err, data, fields) => {

        if (err) return res.json({ error: err });

        if (data.length === 0) return res.json({ error: "No user found" });

        const secret = JWT_SECRET + data.password;

        try {
            const verify = JWT.verify(req.body.token, secret);
            res.json({ status: true });
        } catch (error) {
            res.json({ error: error });
        }

    })
}

exports.password_reset = (req, res, next) => {

    if(isEmpty(req.body)) return res.json({ error: "form data not found" });

    try {

        const { error } = reset_password_model.validate(req.body);

        if (error) return res.json({ error: error.details[0].message });
        
        if ( req.body.newPassword !== req.body.confirmNewPassword ) return res.json({ error: "both should equal" }); 

        pool.query("SELECT * FROM user WHERE user_id = ?", [req.body.user_id], async(err, data, fields) => {

            if (err) return res.json({ error: err });

            if (!data.length) return res.json({ error: "Invalid link or user identity" });

            const salt = await bcrypt.genSalt(10);
            const hashedValue = await bcrypt.hash(req.body.newPassword, salt);

            pool.query("UPDATE user SET password = ? WHERE user_id = ?", [hashedValue, req.body.user_id], (err, data, fields) => {
                
                if (err) return({ error: err });

                res.json({
                    data: "successfully password changed"
                })

            });

        });

    }
    catch (err) {
        res.json({
            error: err
        })
    }

}

