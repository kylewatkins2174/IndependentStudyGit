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
    db.query(insertQ, [[null, req.body.email, req.body.firstname, req.body.lastname, req.body.department, req.body.username, hash, false]], (error,rows,fields) => {
        if(error){
            return res.status(500).json(error);
        }
        return res.status(200).json(`created user ${req.body.email}`);
    })

}

export const login = (req,res) => {
    
    const q = "SELECT * FROM users WHERE username = ?"

    db.query(q, [req.body.username], async (error, rows, field) => {

        //check if email exists
        if(error){
            return res.status(500).json(error);
        }

        if(rows.length === 0){
            return res.status(404).json("user not found");
        }

        //check if password is correct
        const hash = rows[0].password;
        console.log(`${rows[0].firstname}`);
        const isValidPassword = bc.compareSync(req.body.password, hash);

        if(!isValidPassword){
            return res.status(404).json("username or password is incorrect");
        }

        //provide access token
        const {password, ...others} = rows[0];
        const token = jwt.sign(others, "jwtpass");

        return res.cookie("accessToken", token, {
            maxAge: 30*24*60*60*1000,
            httpOnly: true
        }).json(`Welcome ${rows[0].firstName} ${rows[0].lastName}!`);

    })
}

export const logout = (req,res) => {
    return res.clearCookie("accessToken").status(200).send("Logged Out");
}

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

