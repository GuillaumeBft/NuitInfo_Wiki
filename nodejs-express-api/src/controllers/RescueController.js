const { errorResponse } = require('../config/Response');
const { sendQueryToDatabase } = require('../config/Database');

const rescueTable = "rescue";

// get all rescues
module.exports.getAllRescues = async function() {
    try {
        const sql = "SELECT * FROM " + rescueTable;
        const result = await sendQueryToDatabase(sql);
        return {
            success: true,
            data: result,
            size: result.length,
        }
    } catch (err) {
        return errorResponse("Could not GET RESCUES : " + err);
    }
}

// find rescues with search
module.exports.findRescues = async function(search) {
    try {
        const sql = "SELECT * FROM " + rescueTable +
            " INNER JOIN personRescue ON id=personRescue.idRescue" +
            " INNER JOIN person ON personRescue.idPerson=person.id" +
            " WHERE name LIKE \'%" + search + "%\' OR firstname LIKE \'%" + search + "%\'";
        const result = await sendQueryToDatabase(sql);
        return {
            success: true,
            data: result,
            size: result.length,
        }
    } catch (err) {
        return errorResponse("Could not GET RESCUE : " + err);
    }
}

module.exports.getPersonOfRescue = async function(id) {
    try {
        const sql = "SELECT * FROM " + rescueTable +
        " INNER JOIN personRescue ON id=personRescue.idRescue" +
        " INNER JOIN person ON personRescue.idPerson=person.id" +
        " WHERE id=" + id; 
        const result = await sendQueryToDatabase(sql);
        return {
            success: true,
            data: result,
            size: result.length,
        }
    } catch (err) {
        return errorResponse("Could not GET RESCUE : " + err);
    }    
}