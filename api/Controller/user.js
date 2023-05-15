import db from "../connect.js"

export const departments = (req,res) => {
    const q =   `SELECT department.departmentName, department.departmentId
                FROM usersOfDepartment
                JOIN department ON usersOfDepartment.departmentId = department.departmentid
                JOIN users ON usersOfDepartment.userid = users.userId
                WHERE users.userId = ? AND verified=true`

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

export const createRequest = (req, res) => {
    console.log("new request")

    const q = "INSERT INTO usersOfDepartment VALUES (?)";

    console.log(JSON.stringify(req.body))

    try{
        db.query(q, [[req.body.userId, req.body.departmentId, req.body.adminId, false, false]])
    }catch(error){
        if(error.code === '1062'){
            console.log("duplicate entry")
            return res.status(409).json("user already has access to this department")
        }
        else{
            console.log(error);
        }
    }

    return res.status(200).json("user request created!")
}