import { fetchUsers } from "@/lib/api";
import { UserCard } from "@/components/ui/user-card";
import { CacheIndicator } from "@/components/ui/cache-indicator";
import { SectionHeader } from "@/components/ui/section-header";

export async function UsersList() {
  const { data: users, cache } = await fetchUsers();
  
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Users Directory"
        description="Server-side rendered user data from JSONPlaceholder API with Redis caching"
      />
      
      <CacheIndicator 
        cacheMetadata={cache} 
        className="ml-auto w-fit"
      />
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}