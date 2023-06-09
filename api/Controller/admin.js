import db from '../connect.js';

export const requests = (req,res) => {
    const q = `SELECT users.firstname, users.lastname, users.userId, department.departmentName, verifierId FROM usersOfDepartment
                JOIN users ON usersofdepartment.userid = users.userId 
                JOIN department ON usersOfDepartment.departmentId = department.departmentId
                WHERE usersOfDepartment.departmentId = ? and verifierId = ? and verified = false`

    db.query(q, [req.body.departmentId, req.body.userId], (error,rows,fields) => {
        if(error){
            console.log(error);
            return res.status(500).json(error);
        }
        return res.status(200).json(rows);
    })
}

export const accept = (req,res) => {
    const q = `UPDATE usersofdepartment SET verified = TRUE and verifierId = ?
                WHERE userid = ? AND departmentid = ?`

    db.query(q,[req.body.verifierId, req.body.userId, req.body.departmentId], (error,fields) => {
        if(error){
            console.log(error);
            return res.status(500).json(error);
        }
        return res.status(200).json(`verified user ${req.body.userId}`);
    })
}

export const deny = (req,res) => {
    const q = "DELETE FROM usersOfDepartment WHERE userid = ?"
    db.query(q, req.body.userId, (error,fields) => {
        if(error){
            console.log(error);
            return res.status(500).json(error)
        }

        return res.status(200).json("User removed")
    })
}

export const revoke = (req,res) => {    
    const q = "UPDATE usersOfDepartment SET verified = FALSE WHERE userId = ? and departmentId = ?"

    db.query(q, [req.body.userId, req.body.departmentId], (error,fields) => {
        if(error){
            console.log(error)
        }
        return res.status(200).json(`revoked user ${req.body.userId}`)
    })
}

export const activeUsers = (req,res) => {
    const q = `SELECT users.userId, users.firstname, users.lastname, users.username, department.departmentName, usersofdepartment.verifierId FROM usersOfDepartment
            JOIN users ON usersofdepartment.userid = users.userId 
            JOIN department ON usersOfDepartment.departmentId = department.departmentId
            WHERE usersOfDepartment.departmentId = ? and verified = TRUE`;

    db.query(q, [req.body.departmentId], (error,rows,fields) => {
        if(error){
            console.log(error)
            return res.status(500).json(error);
        }

        return res.status(200).json(rows);
    })
}

export const departments = (req, res) => {
    const q = `SELECT department.departmentName, department.departmentId from usersofdepartment
                JOIN department ON usersofdepartment.departmentid = department.departmentid
                WHERE userId = ? and isAdmin = true`

    db.query(q, [req.body.userId], (error,rows,fields) => {
        if(error){
            console.log(error)
            return res.status(500).json(error)
        }

        return res.status(200).json(rows)
    })
}