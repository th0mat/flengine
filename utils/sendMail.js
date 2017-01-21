const logger = require('./logger');

const Datastore = require('@google-cloud/datastore');
const projectId = 'magicflute-155501';
const datastore = Datastore({
    projectId: projectId
});


const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_SENDER = process.env.SENDGRID_SENDER;
const Sendgrid = require('sendgrid')(SENDGRID_API_KEY);


function sendMail(req) {
    logger.info("*** entered mailing function");

    const request = Sendgrid.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: {
            personalizations: [{
                to: [{email: req.body.address}],
                subject: 'MagicFlute notification'
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
            logger.error("*** error from sendMail/sg.API: ", error);
            return;
        }
        logger.info("*** email sent, response code: ", response.statusCode);
        storeEmail(req);
    });

}

function storeEmail(req) {

    // The kind for the new entity
    const kind = 'emails';

    // The Cloud Datastore key for the new entity
    const name = 'sample_1'
    const taskKey = datastore.key(kind);

    // Prepares the new entity
    const task = {
        key: taskKey,
        data: {
            address: req.body.address,
            date: new Date(),
            ip: req.ip,
            host: req.hostname
        }
    };
    datastore.save(task)
        .then(() => {
            logger.info(`Saved ${task.key}: ${task.data.address}`);
        })
        .catch((e) => {
            logger.error("*** error storing email meta data: ", e)
        });

}


module.exports = {
    "sendMail": sendMail
}