import { MainLayout } from "@/components/layouts/main-layout";
import { UsersList } from "@/components/server/users-list";
import { SectionHeader } from "@/components/ui/section-header";

export default function UsersPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="p-6 bg-muted/50 rounded-lg space-y-2">
          <h2 className="text-xl font-semibold">Server-Side Rendering with Redis Cache 🚀</h2>
          <p className="text-muted-foreground">
            This page demonstrates server-side rendering (SSR) with Redis caching:
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Data is fetched on the server using getServerSideProps</li>
            <li>First request fetches from API and stores in Redis</li>
            <li>Subsequent requests within 60s serve from Redis cache</li>
            <li>Cache status is shown for each request</li>
          </ul>
        </div>
        <UsersList />
      </div>
    </MainLayout>
  );
}