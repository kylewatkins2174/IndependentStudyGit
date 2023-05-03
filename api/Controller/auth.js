import db from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
            db.query(insertQ, [[null, req.body.departmentid, req.body.primaryEmail, null, null, req.body.firstname, req.body.lastname, req.body.username, false, false, hash]], (error,rows,fields) => {
                if(error){
                    return res.status(500).json(error);
                }
                return res.status(200).json(`created user ${req.body.username}`);
            })
        }
    });


}

export const departments = (req,res) => {
    const q = "SELECT departmentName FROM departments"

    db.query(q, async(error, rows, field) => {
        if(error){
            return res.status(500).json(error);
        }


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
    const q = 'SELECT * FROM users WHERE username = ?';

    db.query(q, [req.body.username], async (error, rows, field) => {
        if(error){
            console.log(error)
        }
        return res.status(200).json(rows[0]);
    })
}

export const logout = (req,res) => {
    res.clearCookie("accessToken", {
        secure:true,
        sameSite:"none"
    }).status(200).json("User has been logged out");
};

export const checkLogin = (req, res) => {
    const accessToken = req.cookies.accessToken;

    //checks if access token exists
    if(!accessToken)
    {
        return false;
    }

    //verifies access token
    try{
        jwt.verify(accessToken, "jwtpass");
    }catch{
        return false;
    }
}

