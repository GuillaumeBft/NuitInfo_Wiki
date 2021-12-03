const { errorResponse } = require('../config/Response');
const { sendQueryToDatabase } = require('../config/Database');

const boatTable = "boat";


// Get all Boats
module.exports.getAllBoats = async function () {
    try {
        const sql = "SELECT * FROM " + boatTable;
        const result = await sendQueryToDatabase(sql);
        return {
            success: true,
            data: result,
            size: result.length,
        }
    } catch (err) {
        return errorResponse("Could not GET Boats : " + err);
    }
}

//Get Boat by its ID
module.exports.getBoatById = async function (id) {
    try {
        const sql = "SELECT * FROM " + boatTable + " WHERE id=" + id;
        const result = await sendQueryToDatabase(sql);
        return {
            success: true,
            data: result,
            size: result.length,
        }
    } catch (err) {
        return errorResponse("Could not GET Boat : " + err);
    }
}

//Post Boat
module.exports.addBoat = async function (name, type) {
    try {
        const sql = 'INSERT INTO ' + boatTable + ' VALUES (NULL,\'' + name + '\',\'' + type + '\'); ';
        const result = await sendQueryToDatabase(sql);
        return {
            success: true,
            data: result,
            size: result.length,
        }
    } catch (err) {
        return errorResponse("Could not POST Boat : " + err);
    }
}

// Update Boat
module.exports.updateBoat = async function (id, name, type) {
    try {
        const sql = 'UPDATE ' + boatTable + ' SET name =\'' + name + '\', type =\'' + type + '\'' + ' WHERE id = ' + id + '';
        const result = await sendQueryToDatabase(sql);
        return {
            success: true,
            data: result,
            size: result.length,
        }
    } catch (err) {
        return errorResponse("Could not UPDATE the Boat ID " + id + " : " + err);
    }
}

// Delete Bank
module.exports.deleteBoat = async function (id) {
    try {
        const sql = 'DELETE FROM ' + boatTable + ' WHERE id = ' + id + '';
        const result = await sendQueryToDatabase(sql);
        return {
            success: true,
            data: result,
            size: result.length,
        }
    } catch (err) {
        return errorResponse("Could not DELETE the Boat ID " + id + " : " + err);
    }
}