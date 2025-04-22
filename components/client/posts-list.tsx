"use client";

import { useState, useEffect } from "react";
import { Post, User } from "@/lib/types";
import { PostCard } from "@/components/ui/post-card";
import { CacheIndicator } from "@/components/ui/cache-indicator";
import { SectionHeader } from "@/components/ui/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

export function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [cacheMetadata, setCacheMetadata] = useState({ 
    cacheHit: false, 
    timestamp: 0 
  });

  // Function to fetch posts
  const fetchPosts = async () => {
    setLoading(true);
    try {
      // Fetch posts
      const postsResponse = await fetch('/api/posts');
      const postsData = await postsResponse.json();
      
      setPosts(postsData.data.slice(0, 12)); // Limit to first 12 posts
      setCacheMetadata(postsData.cache);
      
      // Fetch users with a separate request
      const usersResponse = await fetch('/api/users');
      const usersData = await usersResponse.json();
      
      setUsers(usersData.data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchPosts();
  }, []);

  // Find user for a post
  const getUserForPost = (userId: number) => {
    return users.find(user => user.id === userId);
  };

  // Handle refresh
  const handleRefresh = () => {
    fetchPosts();
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Recent Posts"
        description="Client-side rendered posts from JSONPlaceholder API with Redis caching"
        action={
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={loading}
            className="gap-2"
          >
            <RefreshCcw className="h-3.5 w-3.5" />
            Refresh
          </Button>
        }
      />
      
      {!loading && cacheMetadata && (
        <CacheIndicator 
          cacheMetadata={cacheMetadata} 
          className="ml-auto w-fit"
        />
      )}
      
      {loading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard 
              key={post.id} 
              post={post}
              user={getUserForPost(post.userId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}