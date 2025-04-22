// User related types
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

// Post related types
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Cache metadata types
export interface CacheMetadata {
  cacheHit: boolean;
  ttl?: number;
  timestamp: number;
}

// Combined data types with cache metadata
export interface CachedResponse<T> {
  data: T;
  cache: CacheMetadata;
}

// Performance metrics
export interface PerformanceMetrics {
  apiTime: number;
  cacheTime: number;
  difference: number;
  percentFaster: number;
}