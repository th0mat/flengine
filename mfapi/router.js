const express = require('express');

const router = express.Router();


router.get('/mfapi/targets', function (req, res, next) {
    res.send("blabla");
});



module.exports = {
    "router": router
    };
