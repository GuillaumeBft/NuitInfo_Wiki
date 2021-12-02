const router = require('express').Router();
const { invalidApiKeyResponse } = require('../config/Response');
const { checkApiKey } = require('../config/Security');
const { getAllUsers, getUserById, getUsersByLogin, addUser, deleteUser, updateUser } = require('../controllers/UserController');


router.use(function (req, res, next) {
    const apiKey = req.query.apiKey;
    if (!checkApiKey(apiKey)) {
        res.status(401).json(invalidApiKeyResponse(apiKey));
    }
    else {
        next(); // pass control to the next handler
    }
});


//##########################################################################
//                          GET ROUTES
//##########################################################################

router.route('/users').get(async (req, res) => {
    const login = req.query.login;
    const password = req.query.password;

    let response;
    if (login !== undefined && password !== undefined) {
        response = await getUsersByLogin(login, password);
    }
    else {
        response = await getAllUsers();
    }

    if (response.success === true) {
        res.status(200).json(response);
    } else {
        res.status(400).json(response);
    }
});

router.route('/user/:id').get(async (req, res) => {
    const id = req.params.id;

    let response = await getUserById(id);
    if (response.success === true) {
        res.status(200).json(response);
    } else {
        res.status(400).json(response);
    }
});


//##########################################################################
//                          POST ROUTES
//##########################################################################

router.route('/users').post(async (req, res) => {
    const login = req.body.login;
    const password = req.body.password;

    let response = await addUser(login, password);
    if (response.success === true) {
        res.status(200).json(response);
    } else {
        res.status(400).json(response);
    }
});


//##########################################################################
//                          PATCH ROUTES
//##########################################################################

router.route('/user/:id').patch(async (req, res) => {
    const id = req.params.id;
    const login = req.body.login;
    const password = req.body.password;

    let response = await updateUser(id, login, password);
    if (response.success === true) {
        res.status(200).json(response);
    } else {
        res.status(400).json(response);
    }
});


//##########################################################################
//                          DELETE ROUTES
//##########################################################################

router.route('/user/:id').delete(async (req, res) => {
    const id = req.params.id;

    let response = await deleteUser(id);
    if (response.success === true) {
        res.status(200).json(response);
    } else {
        res.status(400).json(response);
    }
});


module.exports = router;