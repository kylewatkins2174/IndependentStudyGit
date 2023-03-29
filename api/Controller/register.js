import db from "../connect.js";

export const register = (req,res) => {
    const keyword = req.body.keyword || "";

    const q = "SELECT * FROM users WHERE firstname LIKE ?";
    db.query(q, [`%{keyword}%`], (error, rows, fields) => {
        if(error){
            return res.status(500).json(error);
        }

        if(rows = [])
        {
            console.log("empty set");
        }

        return res.status(200).json(rows);

        
    });
}