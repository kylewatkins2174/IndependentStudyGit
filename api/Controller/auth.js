import db from "../connect.js";
import bc from "bcryptjs"

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
    console.log("TODO")
}

export const logout = (req,res) => {
    console.log("TODO")
}