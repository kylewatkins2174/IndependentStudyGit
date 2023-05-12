import db from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cparser from "cookie-parser"

export const register = async (req,res) => {

    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, [req.body.username], (error,rows,fields) =>{
        if(error){
            return res.status(500).json(error);
        }
        if(rows.length > 0){
            return res.status(409).json(`User ${rows[0].primaryEmail} exists`);
        }
        else{
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
        
            const insertQ = "INSERT INTO users VALUES(?)";
            db.query(insertQ, [[null, req.body.primaryEmail, null, null, req.body.firstname, req.body.lastname, req.body.username, false, hash]], (error,rows,fields) => {
                if(error){
                    return res.status(500).json(error);
                }

                return res.status(200).json(`created user ${req.body.username} and created an access request`);
            })
        }
    });
}

export const departments = (req,res) => {
    const q = "SELECT * FROM department"

    db.query(q, async(error, rows, field) => {
        if(error){
            return res.status(500).json(error);
        }

        return res.status(200).json(rows)
    })
}

export const verifiedDepartments = (req, res) => {
    const q = "SELECT departmentid FROM usersofdepartment WHERE userId = ?"

    db.query(q, [req.body.userId], async(error, rows, field) => {
        if(error){
            return res.status(500).json(error)
        }

        return res.status(200).json(rows)
    })
}

export const login = (req,res) => {
    const q = "SELECT * FROM users WHERE username = ?"

    db.query(q,[req.body.username], (err,data) => {
        if(err) return res.status(500).json(err);
        if(data.length === 0) return res.status(404).json("User not found");

        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);

        if(!checkPassword) return res.status(400).json("Wrong password or username");
    
        const token = jwt.sign({userid:data[0].userId}, "secretkey");

        const {password, ...others} = data[0];

        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).json(others); 
    });
};

export const userInfo = (req, res) => {
    try{
        const accessToken = req.cookies.accessToken

        if(accessToken === undefined){
            return res.status(404).json("You are not currently logged in as a user")
        }
        const userId = jwt.verify(accessToken, "secretkey").userid;

        const q = 'SELECT * FROM users WHERE userId = ?';

        db.query(q, [userId], async (error, rows, field) => {
            if(error){
                console.log(error)
            }
            return res.status(200).json(rows[0]);
        })
    }catch{
        return res.status(404).json("You are not currently logged in as a user")
    }
}

export const logout = (req,res) => {
    try{
        res.clearCookie("accessToken", {
            secure:true,
            sameSite:"none"
        }).status(200).json("User has been logged out");
    }catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
};

