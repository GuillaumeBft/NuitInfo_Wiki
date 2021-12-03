const router = require('express').Router();
const { invalidApiKeyResponse } = require('../config/Response');
const { checkApiKey } = require('../config/Security');
const { getAllBoats, getBoatById, getBoatsByLogin, addBoat, deleteBoat, updateBoat } = require('../controllers/BoatController');


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

router.route('/boats').get(async (req, res) => {

    let response = await getAllBoats();

    if (response.success === true) {
        res.status(200).json(response);
    } else {
        res.status(400).json(response);
    }
});

router.route('/boat/:id').get(async (req, res) => {
    const id = req.params.id;

    let response = await getBoatById(id);
    if (response.success === true) {
        res.status(200).json(response);
    } else {
        res.status(400).json(response);
    }
});


//##########################################################################
//                          POST ROUTES
//##########################################################################

router.route('/Boats').post(async (req, res) => {
    const name = req.body.name;
    const type = req.body.type;

    let response = await addBoat(name, type);
    if (response.success === true) {
        res.status(200).json(response);
    } else {
        res.status(400).json(response);
    }
});


//##########################################################################
//                          PATCH ROUTES
//##########################################################################

router.route('/Boat/:id').patch(async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const type = req.body.type;

    let response = await updateBoat(id, name, type);
    if (response.success === true) {
        res.status(200).json(response);
    } else {
        res.status(400).json(response);
    }
});


//##########################################################################
//                          DELETE ROUTES
//##########################################################################

router.route('/Boat/:id').delete(async (req, res) => {
    const id = req.params.id;

    let response = await deleteBoat(id);
    if (response.success === true) {
        res.status(200).json(response);
    } else {
        res.status(400).json(response);
    }
});


module.exports = router;