import db from '../connect.js';


export const searchFacility = (req, res) => {
    const q = "SELECT * FROM facility WHERE fName LIKE ?";
    const keyword = req.body.keyword || "";

    db.query(q, [`%${keyword}%`], (err, rows, fields) => {
        if (err) {
            return res.status(500).json(`There was an error finding your facilities. Please try again.`);
        }
        return res.status(200).json(rows);
    });
};

export const searchContacts = (req, res) => {
    const q = "SELECT * FROM contact join contactinfo WHERE fId = ?";
    const keyword = req.body.keyword || "";

    db.query(q, [`%${keyword}%`], (err, rows, fields) => {
        if(err){
            return res.status(500).json(`There was an error finding the contact information. Please try again.`);
        }
        return res.status(200).json(rows)
    });
};