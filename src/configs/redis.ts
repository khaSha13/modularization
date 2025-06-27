import { Redis } from 'ioredis';

const REDIS_URI = process.env.REDIS_URI || "";

const REDIS_CONNECTION = new Redis(REDIS_URI, {
    maxRetriesPerRequest: null,
});

export { REDIS_CONNECTION };
