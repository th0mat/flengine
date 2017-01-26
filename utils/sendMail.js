const logger = require('./logger');

const Datastore = require('@google-cloud/datastore');
const projectId = 'magicflute-155501';
const datastore = Datastore({
    projectId: projectId
});


const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_SENDER = "MagicFlute@packetmozart.com";
const Sendgrid = require('sendgrid')(SENDGRID_API_KEY);


function sendMail(req) {

    const request = Sendgrid.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: {
            personalizations: [{
                to: [{email: req.body.address}],
                subject: req.body.subject
            }],
            from: {email: SENDGRID_SENDER},
            content: [{
                type: 'text/plain',
                value: req.body.message
            }]
        }
    });

    Sendgrid.API(request, function (error, response) {
        if (error) {
            logger.error("*** error from sendMail/sg.API: ", error.response);
            storeEmail(req, error.response.statusCode);
            return;
        }
        logger.info("*** email sent, response code: ", response.statusCode);
        storeEmail(req, response.statusCode);
    });

}

function storeEmail(req, statusCode) {

    let ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    // The kind for the new entity
    const kind = 'emails';

    // The Cloud Datastore key for the new entity
    const taskKey = datastore.key(kind);

    // Prepares the new entity
    const task = {
        key: taskKey,
        data: {
            date: new Date(),
            mfuid: new Buffer(req.body.mfuid, 'base64').toString(),
            version: req.body.version,
            address: req.body.address,
            ip: ip,
            subject: req.body.subject,
            statusCode: statusCode
        }
    };
    datastore.save(task)
        .then(() => {
            logger.info(`*** saved: email to ${task.data.address}, subject: ${task.data.subject}`);
        })
        .catch((e) => {
            logger.error("*** error storing email meta data: ", e)
        });

}


module.exports = {
    "sendMail": sendMail
}