const router = require('express').Router();
const { invalidApiKeyResponse } = require('../config/Response');
const { checkApiKey } = require('../config/Security');
const { findRescues, getAllRescues } = require('../controllers/RescueController');


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

router.route('/rescues').get(async (req, res) => {
    const search = req.query.search;

    let response;
    if (search !== undefined) {
        response = await findRescues(search);
    } else {
        response = await getAllRescues();
    }

    if (response.success === true) {
        res.status(200).json(response);
    } else {
        res.status(400).json(response);
    }
});

//##########################################################################
//                          POST ROUTES
//##########################################################################

//##########################################################################
//                          PATCH ROUTES
//##########################################################################

//##########################################################################
//                          DELETE ROUTES
//##########################################################################

module.exports = router;