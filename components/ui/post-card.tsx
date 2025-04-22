import { Post, User } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface PostCardProps {
  post: Post;
  user?: User;
}

export function PostCard({ post, user }: PostCardProps) {
  // Create initials from the user name if available
  const initials = user 
    ? user.name.split(' ').map(part => part[0]).join('').toUpperCase()
    : `U${post.userId}`;

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-4">
          {user && (
            <Avatar className="h-10 w-10 border-2 border-primary/10">
              <AvatarFallback className="bg-primary/5 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
          )}
          <div>
            <CardTitle className="line-clamp-1 text-lg">{post.title}</CardTitle>
            <CardDescription>
              {user ? `Posted by ${user.name}` : `User #${post.userId}`}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          {post.body}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-muted/20 px-6 py-3">
        <Badge variant="outline">{`Post #${post.id}`}</Badge>
      </CardFooter>
    </Card>
  );
}