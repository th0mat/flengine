const express = require('express');
const logger = require('../utils/logger');
const router = express.Router();
const sendMail = require('../utils/sendMail').sendMail;

router.get('/test', function (req, res, next) {
    logger.info(`*** /test was called, PID ${process.pid} `)

    res.send("servus, this comes via router to you :)");
});


router.post('/notify', (req, res, next)=>{
    let reply = JSON.stringify(req.body, null, 2);
    sendMail(req);
    res.sendStatus(200);
})



module.exports = {
    "router": router
    };
