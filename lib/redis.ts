import { Redis } from 'ioredis';

let redis: Redis | null = null;
let isConnecting = false;
let connectionPromise: Promise<void> | null = null;

export async function getRedisClient(): Promise<Redis> {
  if (redis) {
    return redis;
  }

  if (isConnecting) {
    if (connectionPromise) {
      await connectionPromise;
      return redis!;
    }
  }

  isConnecting = true;
  connectionPromise = new Promise(async (resolve, reject) => {
    try {
      const redisUrl = process.env.REDIS_URL;

      if (!redisUrl) {
        throw new Error('Redis URL is required');
      }

      redis = new Redis(redisUrl, {
        tls: {
          rejectUnauthorized: false
        },
        retryStrategy: (times) => {
          const delay = Math.min(times * 50, 2000);
          return delay;
        },
        maxRetriesPerRequest: 3,
        enableReadyCheck: true,
        connectTimeout: 10000,
      });

      redis.on('error', (err) => {
        console.error('Redis connection error:', err);
        if (!redis?.status || redis.status !== 'ready') {
          redis = null;
          isConnecting = false;
        }
      });

      redis.on('connect', () => {
        console.log('Redis connection established');
        isConnecting = false;
        resolve();
      });

      await redis.ping();
    } catch (error) {
      console.error('Failed to connect to Redis:', error);
      redis = null;
      isConnecting = false;
      reject(error);
    }
  });

  try {
    await connectionPromise;
    return redis!;
  } catch (error) {
    throw new Error('Failed to establish Redis connection');
  }
}

// In-memory fallback cache for when Redis is unavailable
const memoryCache: Record<string, { data: any; expiry: number }> = {};

/**
 * Cache data in Redis with a TTL
 * @param key The cache key
 * @param data The data to cache
 * @param ttl Time to live in seconds (default: 60)
 */
export async function cacheData(key: string, data: any, ttl: number = 60): Promise<void> {
  try {
    const redis = await getRedisClient();
    
    if (redis) {
      await redis.setex(key, ttl, JSON.stringify(data));
    } else {
      // Fallback to in-memory cache
      memoryCache[key] = {
        data,
        expiry: Date.now() + ttl * 1000
      };
    }
  } catch (error) {
    console.warn('Failed to cache data, using memory fallback:', error);
    // Fallback to in-memory cache
    memoryCache[key] = {
      data,
      expiry: Date.now() + ttl * 1000
    };
  }
}

/**
 * Get cached data from Redis
 * @param key The cache key
 * @returns The cached data or null if not found
 */
export async function getCachedData<T>(key: string): Promise<T | null> {
  try {
    const client = await getRedisClient();
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting cached data:', error);
    return null;
  }
}

/**
 * Set cached data in Redis
 * @param key The cache key
 * @param data The data to cache
 * @param ttl Time to live in seconds (default: 60)
 */
export async function setCachedData<T>(key: string, data: T, ttl: number = 60): Promise<void> {
  try {
    const client = await getRedisClient();
    await client.set(key, JSON.stringify(data), 'EX', ttl);
  } catch (error) {
    console.error('Error setting cached data:', error);
  }
}

/**
 * Clear a specific key from Redis cache
 * @param key The cache key to clear
 */
export async function clearCache(key: string): Promise<void> {
  try {
    const client = await getRedisClient();
    await client.del(key);
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
}

/**
 * Get time-to-live for a cache key
 * @param key The cache key
 * @returns Time remaining in seconds or -1 if expired, -2 if key doesn't exist
 */
export async function getCacheTTL(key: string): Promise<number> {
  try {
    const redis = await getRedisClient();
    const ttl = await redis.ttl(key);
    return ttl > 0 ? ttl : -1;
  } catch (error) {
    console.warn('Failed to get TTL, checking memory fallback:', error);
    // Fallback to in-memory cache
    const cached = memoryCache[key];
    if (!cached) return -2;
    const ttl = Math.floor((cached.expiry - Date.now()) / 1000);
    return ttl > 0 ? ttl : -1;
  }
}