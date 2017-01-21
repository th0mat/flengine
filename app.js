const express = require('express');
const bodyParser = require('body-parser');
const mfRouter = require('./mfapi/router.js').router;
const logger = require('./utils/logger.js');
const moment = require('moment');

const winston = require('winston');
const expressWinston = require('express-winston');
const colorize = process.env.NODE_ENV !== 'production';


const app = express();


// apply middleware

// app.use(logger.requestLogger);
app.use(logger.errorLogger);

app.use(express.static('download'));

app.use(bodyParser.json({limit: '5000kb'}));
app.use('/mfapi', mfRouter);


app.get('/', (req, res) => {
    res.status(200).send(`node version ${process.version} working for mfc3 plus one at ${moment().format("HH:mm")}`);
});


// setInterval(() => {
//     logger.warn(`*** PID: ${process.pid}, uptime: ${process.uptime()}, now: ${moment().format('HH:mm:ss')}`)
// }, 20000);


// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    logger.info(`*********** PID ${process.pid} listening on port ${PORT}`);
});
// [END app]
