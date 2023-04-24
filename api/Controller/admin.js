import db from '../connect.js';

export const requests = (req,res) => {
    const q = `SELECT *
                FROM users
                WHERE departmentid = ?
                AND verified = false`;

    db.query(q, req.body.depId, (error,rows,fields) => {
        if(error){
            console.log("error");
            return res.status(500).json(error);
        }
        if(rows.length === 0){
            return res.status(404).json("No requests available");
        }

        return res.status(200).json(rows);
    })
}

export const accept = (req,res) => {
    const q = "UPDATE users SET verified = TRUE WHERE userid = ?"

    db.query(q,req.body.userId, (error,fields) => {
        if(error){
            console.log(error);
            return res.status(500).json(error);
        }
        console.log(`verified user ${req.body.userId}`)
        return res.status(200).json(`verified user ${req.body.userId}`);
    })
}

export const deny = (req,res) => {
    const q = "DELETE FROM users WHERE userid = ?"
    db.query(q, req.body.userId, (error,fields) => {
        if(error){
            console.log(error);
            return res.status(500).json(error)
        }

        return res.status(200).json("User removed")
    })
}

export const revoke = (req,res) => {
    const q = "UPDATE users SET verified = FALSE WHERE userid = ?"

    db.query(q, req.body.userId, (error,fields) => {
        if(error){
            console.log(error)
        }
        console.log(`revoked user ${req.body.userId}`)
        return res.status(200).json(`revoked user ${req.body.userId}`)
    })
}

export const activeUsers = (req,res) => {
    const q = `SELECT *
                FROM users
                WHERE departmentid = ?
                AND verified = true
                AND isAdmin = false`;

    db.query(q, req.body.depId, (error,rows,fields) => {
        if(error){
            console.log("error");
            return res.status(500).json(error);
        }
        if(rows.length === 0){
            return res.status(404).json("No requests available");
        }

        return res.status(200).json(rows);
    })
}