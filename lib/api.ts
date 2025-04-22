import { User, Post, CachedResponse } from './types';
import { cacheData, getCachedData, getCacheTTL } from './redis';

// Base URL for the JSONPlaceholder API
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Fetches users from the API with Redis caching
 */
export async function fetchUsers(): Promise<CachedResponse<User[]>> {
  const CACHE_KEY = 'users';
  const startTime = Date.now();
  
  // Try to get from cache first
  const cachedUsers = await getCachedData<User[]>(CACHE_KEY);
  
  if (cachedUsers) {
    const ttl = await getCacheTTL(CACHE_KEY);
    return {
      data: cachedUsers,
      cache: {
        cacheHit: true,
        ttl,
        timestamp: Date.now() - startTime
      }
    };
  }
  
  // If not in cache, fetch from API
  const response = await fetch(`${API_BASE_URL}/users`);
  const users = await response.json() as User[];
  
  // Store in cache with TTL of 60 seconds
  await cacheData(CACHE_KEY, users, 60);
  
  return {
    data: users,
    cache: {
      cacheHit: false,
      timestamp: Date.now() - startTime
    }
  };
}

/**
 * Fetches posts from the API with Redis caching
 */
export async function fetchPosts(): Promise<CachedResponse<Post[]>> {
  const CACHE_KEY = 'posts';
  const startTime = Date.now();
  
  // Try to get from cache first
  const cachedPosts = await getCachedData<Post[]>(CACHE_KEY);
  
  if (cachedPosts) {
    const ttl = await getCacheTTL(CACHE_KEY);
    return {
      data: cachedPosts,
      cache: {
        cacheHit: true,
        ttl,
        timestamp: Date.now() - startTime
      }
    };
  }
  
  // If not in cache, fetch from API
  const response = await fetch(`${API_BASE_URL}/posts`);
  const posts = await response.json() as Post[];
  
  // Store in cache with TTL of 60 seconds
  await cacheData(CACHE_KEY, posts, 60);
  
  return {
    data: posts,
    cache: {
      cacheHit: false,
      timestamp: Date.now() - startTime
    }
  };
}

/**
 * Fetches a specific user by ID with Redis caching
 */
export async function fetchUserById(id: number): Promise<CachedResponse<User>> {
  const CACHE_KEY = `user:${id}`;
  const startTime = Date.now();
  
  // Try to get from cache first
  const cachedUser = await getCachedData<User>(CACHE_KEY);
  
  if (cachedUser) {
    const ttl = await getCacheTTL(CACHE_KEY);
    return {
      data: cachedUser,
      cache: {
        cacheHit: true,
        ttl,
        timestamp: Date.now() - startTime
      }
    };
  }
  
  // If not in cache, fetch from API
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  const user = await response.json() as User;
  
  // Store in cache with TTL of 60 seconds
  await cacheData(CACHE_KEY, user, 60);
  
  return {
    data: user,
    cache: {
      cacheHit: false,
      timestamp: Date.now() - startTime
    }
  };
}

/**
 * Fetches posts for a specific user with Redis caching
 */
export async function fetchPostsByUserId(userId: number): Promise<CachedResponse<Post[]>> {
  const CACHE_KEY = `posts:user:${userId}`;
  const startTime = Date.now();
  
  // Try to get from cache first
  const cachedPosts = await getCachedData<Post[]>(CACHE_KEY);
  
  if (cachedPosts) {
    const ttl = await getCacheTTL(CACHE_KEY);
    return {
      data: cachedPosts,
      cache: {
        cacheHit: true,
        ttl,
        timestamp: Date.now() - startTime
      }
    };
  }
  
  // If not in cache, fetch from API
  const response = await fetch(`${API_BASE_URL}/users/${userId}/posts`);
  const posts = await response.json() as Post[];
  
  // Store in cache with TTL of 60 seconds
  await cacheData(CACHE_KEY, posts, 60);
  
  return {
    data: posts,
    cache: {
      cacheHit: false,
      timestamp: Date.now() - startTime
    }
  };
}

/**
 * Benchmark performance between direct API and Redis cached calls
 */
export async function benchmarkPerformance() {
  // Direct API call (no cache)
  const directStartTime = Date.now();
  const directResponse = await fetch(`${API_BASE_URL}/users`);
  const directData = await directResponse.json();
  const directTime = Date.now() - directStartTime;
  
  // Call through our cached function (which will populate the cache)
  await fetchUsers();
  
  // Second call should be from cache
  const cacheStartTime = Date.now();
  const cachedResponse = await fetchUsers();
  const cacheTime = Date.now() - cacheStartTime;
  
  const difference = directTime - cacheTime;
  const percentFaster = (difference / directTime) * 100;
  
  return {
    apiTime: directTime,
    cacheTime,
    difference,
    percentFaster: Math.round(percentFaster * 100) / 100
  };
}