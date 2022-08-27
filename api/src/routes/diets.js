const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Diet } = require('../db.js');
const { getAllDietsTypes } = require('../controllers/dietsCont.js');


router.get('/', async(req, res) => {
    try {
        const diets = await getAllDietsTypes();
        res.status(200).send(diets);
    } catch (error) {
        res.status(500).send(error);
    }
})



module.exports = router;