const express = require('express');
const logger = require('../utils/logger');
const router = express.Router();
const sendMail = require('../utils/sendMail').sendMail;
const registerMfuid = require('../utils/registerMfuid').registerMfuid;
const sendMozartMsg = require('../utils/sendMozartMsg').sendMozartMsg;


router.get('/test', function (req, res, next) {
    logger.info(`*** /test was called, PID ${process.pid} `)

    res.send("servus, this comes via router to you :)");
});


router.post('/notify', (req, res, next)=>{
    sendMail(req);
    res.sendStatus(200);
})

router.post('/mfuidreg', (req, res, next)=>{
    registerMfuid(req);
    res.sendStatus(200);
})

router.post('/fetchMsg', (req, res, next)=>{
    sendMozartMsg(req, res)
})

module.exports = {
    "router": router
    };
