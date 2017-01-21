const logger = require('./logger');
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_SENDER = process.env.SENDGRID_SENDER;
const Sendgrid = require('sendgrid')(SENDGRID_API_KEY);

function sendMail(ref, bodyText) {
    logger.info("*** entered mailing function");

    const request = Sendgrid.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: {
            personalizations: [{
                to: [{ email: 'th.natter@gmail.com' }],
                subject: 'Hello World!'
            }],
            from: { email: SENDGRID_SENDER },
            content: [{
                type: 'text/plain',
                value: 'Sendgrid on Google App Engine with Node.js.'
            }]
        }
    });

    Sendgrid.API(request, function (error, response) {
        if (error) {
            logger.error("*** error from sendMail/sg.API: ", error);
            return;
        }
        logger.info("*** email sent, response code: ", response.statusCode);
    });

}

module.exports = {
    "sendMail": sendMail
}