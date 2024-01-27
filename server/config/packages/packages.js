// packages
const fileUPload = require("express-fileupload")
const morgan = require("morgan")
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require("cors")
const mongoSanitize = require('express-mongo-sanitize');


module.exports = {
    fileUPload,
    morgan,
    rateLimiter,
    helmet,
    xss,
    cors,
    mongoSanitize
}