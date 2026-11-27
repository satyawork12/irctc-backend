import {createClient} from 'redis';
import {env} from "./env.js";
import {logger} from "./logger.js";

export const redis = createClient({
    url: env.REDIS_URL,
});

redis.on('error', (err) => logger.error('Redis Client Error',{
    message: err.message,
}));

redis.on('connect', () => logger.info('Redis Client Connected'));

redis.on('ready', () => logger.info('Redis Client Ready'));  