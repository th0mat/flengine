const logger = require('./logger');

const Datastore = require('@google-cloud/datastore');
const projectId = 'magicflute-155501';
const datastore = Datastore({
    projectId: projectId
});






function registerMfuid(req) {

    let mfuid = new Buffer(req.body.mfuid, 'base64').toString();

    let ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    // The kind for the new entity
    const kind = 'mfuid';

    // The Cloud Datastore key for the new entity
    const taskKey = datastore.key(kind);

    // Prepares the new entity
    const task = {
        key: taskKey,
        data: {
            date: new Date(),
            mfuid: mfuid,
            ip: ip
        }
    };
    datastore.save(task)
        .then(() => {
            logger.info(`*** registered mfuid ${mfuid}`);
        })
        .catch((e) => {
            logger.error(`*** error registering mfuid ${mfuid}: `, e)
        });

}


module.exports = {
    "registerMfuid": registerMfuid
}