const User = require('../models/UserModel');
const { errorResponse } = require('../config/Response');
const { sendQueryToDatabase } = require('../config/Database');

const userTable = "user";


// Get all users
module.exports.getAllUsers = async function() {
    try {
        const sql = "SELECT * FROM " + userTable;
        const result = await sendQueryToDatabase(sql);
        return {
            success: true,
            data: result,
            size: result.length,
        }
    } catch (err) {
        return errorResponse("Could not GET USERS : " + err);
    }
}

//Get user by its ID
module.exports.getUserById = async function(id) {
    try {
        const sql = "SELECT * FROM " + userTable + " WHERE id=" + id;
        const result = await sendQueryToDatabase(sql);
        return {
            success: true,
            data: result,
            size: result.length,
        }
    } catch (err) {
        return errorResponse("Could not GET USER : " + err);
    }
}

//Get user by its logins
module.exports.getUsersByLogin = async function(login, password) {
    try {
        const sql = "SELECT * FROM " + userTable + " WHERE login=\'" + login + "\' AND password=\'" + password + '\'';
        const result = await sendQueryToDatabase(sql);
        return {
            success: true,
            data: result,
            size: result.length,
        }
    } catch (err) {
        return errorResponse("Could not GET USER : " + err);
    }
}

//Post user
module.exports.addUser = async function (login, password) {
    try {
        const sql = 'INSERT INTO ' + userTable + ' VALUES (NULL,\'' + login + '\',\'' + password + '\');';
        const result = await sendQueryToDatabase(sql);
        return {
            success: true,
            data: result,
            size: result.length,
        }
    } catch (err) {
        return errorResponse("Could not POST USER : " + err);
    }
}

// Update user
module.exports.updateUser = async function (id, login, password) {
    try {
        const sql = 'UPDATE ' + userTable + ' SET login =\'' + login + '\', password =\'' + password + '\' WHERE id = ' + id + '';
        const result = await sendQueryToDatabase(sql);
        return {
            success: true,
            data: result,
            size: result.length,
        }
    } catch (err) {
        return errorResponse("Could not UPDATE the USER ID " + id + " : " + err);
    }
}

// Delete Bank
module.exports.deleteUser = async function (id) {
    try {
        const sql = 'DELETE FROM ' + userTable + ' WHERE id = ' + id + '';
        const result = await sendQueryToDatabase(sql);
        return {
            success: true,
            data: result,
            size: result.length,
        }
    } catch (err) {
        return errorResponse("Could not DELETE the USER ID " + id + " : " + err);
    }
}