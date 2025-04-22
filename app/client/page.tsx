import { MainLayout } from "@/components/layouts/main-layout";
import { Suspense } from "react";
import { PostsList } from "@/components/client/posts-list";
import { Skeleton } from "@/components/ui/skeleton";

export default function ClientPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="p-6 bg-muted/50 rounded-lg space-y-2">
          <h2 className="text-xl font-semibold">Client-Side Data Fetching with Redis Cache 💻</h2>
          <p className="text-muted-foreground">
            This page demonstrates client-side data fetching with Redis caching:
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Data is fetched in the browser using useEffect</li>
            <li>API routes are used to handle Redis caching</li>
            <li>Loading states are handled with Suspense</li>
            <li>Cache status is updated in real-time</li>
          </ul>
        </div>
        <Suspense fallback={<PostsListSkeleton />}>
          <PostsList />
        </Suspense>
      </div>
    </MainLayout>
  );
}

function PostsListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-full max-w-xl" />
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}