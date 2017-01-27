const logger = require('./logger');


function sendMozartMsg(req, res) {

    let version = req.body.version;
    let mfuid = req.body.mfuid;
    res.type('json');
    res
        .status(200)
        .send({
            dashboardTip: {
                title: "Tool tip",
                text: `upgrade from version ${version}`,
                link: `https:www.packetmozart.com`
            },
            otherField: 'not yet used'
        })
}


module.exports = {
    "sendMozartMsg": sendMozartMsg
}