import db from "../connect.js";
import bc from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req,res) => {
    const q = "SELECT * FROM users WHERE email = ?";
    db.query(q, [req.body.username], (error,rows,fields) =>{
        if(error){
            return res.status(500).json(error);
        }
        if(rows.length > 0){
            return res.status(409).json(`User ${rows[0].email} exists`);
        }
    });

    const salt = bc.genSaltSync(10);
    const hash = bc.hashSync(req.body.password, salt);

    const insertQ = "INSERT INTO users VALUES(?)";
    db.query(insertQ, [[null, req.body.email, req.body.firstname, req.body.lastname, hash]], (error,rows,fields) => {
        if(error){
            return res.status(500).json(error);
        }
        return res.status(200).json(`created user ${req.body.email}`);
    })

}

export const login = (req,res) => {
    
    const q = "SELECT * FROM users WHERE email = ?"

    db.query(q, [req.body.email], (error, rows, field) => {

        //check if email exists
        if(error){
            return res.status(500).json(error);
        }

        if(rows.length === 0){
            return res.status(404).json("user not found");
        }

        //return res.status(200).json(rows);
        //return res.status(200).json(rows[0]);

        //check if password is correct
        const hash = rows[0].passHash;
        const isValidPassword = bc.compareSync(req.body.password, hash);

        if(!isValidPassword){
            return res.status(404).json("username or email is incorrect");
        }

        //provide access token
        const {password, ...others} = rows[0];
        const token = jwt.sign(others, "jwtpass");

        return res.cookie("accessToken", token, {
            maxAge: 30*24*60*60*1000,
            httpOnly: true
        }).json(`Welcome ${rows[0].firstname} ${rows[0].lastname}!`);

    })
}

export const logout = (req,res) => {
    console.log("TODO")
}