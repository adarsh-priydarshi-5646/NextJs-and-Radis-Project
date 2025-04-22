import { fetchUserById, fetchPostsByUserId } from "@/lib/api";
import { MainLayout } from "@/components/layouts/main-layout";
import { SectionHeader } from "@/components/ui/section-header";
import { UserCard } from "@/components/ui/user-card";
import { PostCard } from "@/components/ui/post-card";
import { CacheIndicator } from "@/components/ui/cache-indicator";
import { notFound } from "next/navigation";

interface UserDetailPageProps {
  params: {
    id: string;
  };
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const id = parseInt(params.id, 10);
  
  if (isNaN(id)) {
    return notFound();
  }
  
  const { data: user, cache: userCache } = await fetchUserById(id);
  const { data: posts, cache: postsCache } = await fetchPostsByUserId(id);
  
  if (!user) {
    return notFound();
  }
  
  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="space-y-4">
          <SectionHeader
            title={`${user.name}'s Profile`}
            description="User details and posts from JSONPlaceholder API with Redis caching"
          />
          
          <CacheIndicator 
            cacheMetadata={userCache} 
            className="ml-auto w-fit"
          />
          
          <div className="max-w-xl">
            <UserCard user={user} showDetails={true} />
          </div>
        </div>
        
        <div className="space-y-4">
          <SectionHeader
            title="Posts by this User"
          />
          
          <CacheIndicator 
            cacheMetadata={postsCache} 
            className="ml-auto w-fit"
          />
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostCard key={post.id} post={post} user={user} />
              ))
            ) : (
              <div className="col-span-full">
                <p className="text-muted-foreground">No posts found for this user.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}