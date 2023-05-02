import db from '../connect.js';


export const searchFacility = (req, res) => {
    const q = "SELECT * FROM facility WHERE fName LIKE ?";
    const q2 = "SELECT * FROM facility WHERE fId = ?"
    const q3 = "SELECT * FROM facility"
    const keyword = req.body.keyword || "";
    const fId = req.body.fId || "";

    if(keyword){
        db.query(q, [`%${keyword}%`], (err, rows, fields) => {
            if (err) {
                return res.status(500).json(`There was an error finding your facilities. Please try again.`);
            }
            return res.status(200).json(rows);
        });
    }else if(fId){
        db.query(q2, [fId], (err, rows, fields) => {
            if(err){
                return res.status(500).json(`There was an error searching for facilities. Please try again.`);
            }
            return res.status(200).json(rows);
        })
    }
    else{
        db.query(q3, (err, rows, fields) => {
            if(err){
                return res.status(500).json(`There was an error loading facilities. Please try again.`);
            }
            return res.status(200).json(rows);
        })
    }
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
    const q = "select props.*, chemical.chId, chemical.*, loctype.*, chemical_in_fac.percent, chemical_in_fac.max_Amt from props join ( chemical join (chemical_in_fac join loctype) ) where props.chId = chemical.chId and chemical.chId = chemical_in_fac.chId and chemical_in_fac.loc_id = loctype.loc_id and facId = ? and chemical.chName like ? order by chemical.EHS desc";
    const q2 = "select props.*, chemical.chId, chemical.*, loctype.*, chemical_in_fac.percent, chemical_in_fac.max_Amt from props join ( chemical join (chemical_in_fac join loctype) ) where props.chId = chemical.chId and chemical.chId = chemical_in_fac.chId and chemical_in_fac.loc_id = loctype.loc_id and facId = ? order by chemical.EHS desc"
    const q3 = "select props.*, chemical.* from props join chemical  where props.chId = chemical.chId order by chemical.EHS desc"
    const q4 = "select props.*, chemical.* from props join chemical where props.chId = chemical.chId and chemical.chName like ? order by chemical.EHS desc"
    const fId = req.body.fId;
    const keyword = req.body.keyword;

    if(keyword && fId){
        db.query(q, [fId, `%${keyword}%`], (err, rows, fields) => {
            if(err){
                return res.status(500).json(`There was an error generating the chemical information. Please try again.`)
            }
            return res.status(200).json(rows);
        });
    }
    else if(fId){
        db.query(q2, [fId], (err, rows, fields) => {
            if(err){
                return res.status(500).json(`There was an error generating the chemical information. Please try again.`)
            }
            return res.status(200).json(rows);
        })
    }
    else if(keyword){
        db.query(q4, [`%${keyword}%`], (err, rows, fields) => {
            if(err){
                return res.status(500).json(`There was an error generating the chemical information. Please try again.`)
            }
            return res.status(200).json(rows);
        })
    }
    else{
        db.query(q3, [fId], (err, rows, fields) => {
            if(err){
                return res.status(500).json(`There was an error generating the chemical information. Please try again.`)
            }
            return res.status(200).json(rows);
        })
    }
}

export const searchContactsRefined = (req, res) => {
    const q = "select * from contact join contactinfo where fId = ? and contact.cId = contactinfo.cId and concat(firstName, ' ', lastName) like ?;"
    const q2 = "select * from contact join contactinfo where fId = ? and contact.cId = contactinfo.cId;"
    const fId = req.body.fId;
    const keyword = req.body.keyword;

    if(keyword){
        db.query(q, [fId, `%${keyword}%`], (err, rows, fields) => {
            if(err){
                return res.status(500).json(`There was an error searching for contacts. Please try again.`)
            }
            return res.status(200).json(rows);
        });
    }
    else{
        db.query(q2, [fId], (err, rows, fields)=> {
            if(err){
                return res.status(500).json(`There was an error searching for contacts. Please try again.`)
            }
            return res.status(200).json(rows);
        });
    }

}