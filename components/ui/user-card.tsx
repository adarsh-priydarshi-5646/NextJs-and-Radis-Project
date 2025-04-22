import { User } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';
import { Briefcase, Globe, Mail, MapPin, Phone } from 'lucide-react';

interface UserCardProps {
  user: User;
  showDetails?: boolean;
}

export function UserCard({ user, showDetails = false }: UserCardProps) {
  const initials = user.name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 border-2 border-primary/10">
            <AvatarFallback className="bg-primary/5 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">{user.name}</CardTitle>
            <CardDescription>@{user.username}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <a href={`mailto:${user.email}`} className="text-primary hover:underline">
              {user.email}
            </a>
          </div>
          
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <a href={`https://${user.website}`} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              {user.website}
            </a>
          </div>
          
          {showDetails && (
            <>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{user.phone}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>
                  {user.address.city}, {user.address.zipcode}
                </span>
              </div>
              
              <div className="flex items-center gap-2 mt-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{user.company.name}</p>
                  <p className="text-xs text-muted-foreground">{user.company.catchPhrase}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-muted/20 px-6 py-3">
        <Badge variant="outline">{`User #${user.id}`}</Badge>
        {!showDetails && (
          <Link href={`/users/${user.id}`}>
            <Button variant="outline" size="sm">View Profile</Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}