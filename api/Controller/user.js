import db from "../connect.js"


export const departments = (req,res) => {
    const q =   `SELECT department.departmentName, department.departmentId
                FROM usersOfDepartment
                JOIN department ON usersOfDepartment.departmentId = department.departmentid
                JOIN users ON usersOfDepartment.userid = users.userId
                WHERE users.userId = ?`

    db.query(q, req.body.userId,(error,rows,fields) => {
        if(error){
            console.log(error)
            return res.status(500).json(error)
        }

        return res.status(200).json(rows)
    })
}

export const departmentAdmin = (req, res) => {
    const q = `SELECT firstname,lastname,users.userId FROM users
                JOIN usersofdepartment ON users.userid = usersofdepartment.userId
                WHERE usersofdepartment.departmentId = ? and usersofdepartment.isAdmin = 1`

    db.query(q, req.body.departmentId, (error, rows, fields) => {
        if(error){
            console.log(error)
            return res.status(500).json(error)
        }

        var users = []

        for(var i = 0; i < rows.length; i++){
            var user = {
                "userId" : rows[i].userId,
                "name" : rows[i].firstname + " " + rows[i].lastname
            }
            users.push(user)
        }

        return res.status(200).json(users);
    })
}