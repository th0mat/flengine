const logger = require('./logger');




function sendMozartMsg(req, res) {

    let version = req.body.version;
    let mfuid = req.body.mfuid;
    res.type('json');
    res
        .status(200)
        .send({
        msg: `you are still on version ${version}, shocking`,
        body: `you are registerd under the following id: ${mfuid}`
    })
}


module.exports = {
    "sendMozartMsg": sendMozartMsg
}