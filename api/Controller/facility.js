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
    const q = "SELECT * FROM contact JOIN contactinfo WHERE contact.cId = contactinfo.cId AND fId = ?";
    const fId = req.body.fId;

    db.query(q, [fId], (err, rows, fields) => {
        if(err){
            return res.status(500).json(`There was an error finding the contact information. Please try again.`);
        }
        return res.status(200).json(rows);
    });
};

export const searchChemicals = (req, res) => {
    const q = "select chemical.chName, chemical.CAS, chemical.EHS, loctype.loc, loctype.loc_type, loctype.loc_pressure, loctype.loc_temp, chemical_in_fac.percent, chemical_in_fac.max_Amt from chemical join (chemical_in_fac join loctype) where chemical.chId = chemical_in_fac.chId and chemical_in_fac.loc_id = loctype.loc_id and facId = ?";
    const fId = req.body.fId;

    db.query(q, [fId], (err, rows, fields) => {
        if(err){
            return res.status(500).json(`There was an error generating the chemical information. Please try again.`)
        }
        return res.status(200).json(rows);
    });
}