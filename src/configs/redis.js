var IORedis = require('ioredis');
var REDIS_URI = process.env.REDIS_URI || "";
var REDIS_CONNECTION = new IORedis(REDIS_URI, {
    maxRetriesPerRequest: null,
});
module.exports = {
    REDIS_CONNECTION: REDIS_CONNECTION
};
