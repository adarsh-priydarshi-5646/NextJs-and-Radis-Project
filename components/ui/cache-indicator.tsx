import { CacheMetadata } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Clock } from 'lucide-react';

interface CacheIndicatorProps {
  cacheMetadata: CacheMetadata;
  className?: string;
}

export function CacheIndicator({ cacheMetadata, className }: CacheIndicatorProps) {
  const { cacheHit, ttl, timestamp } = cacheMetadata;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`flex items-center gap-2 ${className}`}>
            <Badge 
              variant={cacheHit ? "outline" : "default"}
              className={`
                flex items-center gap-1
                ${cacheHit ? 'bg-green-500/10 text-green-600 hover:bg-green-500/20 hover:text-green-700' : 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 hover:text-blue-700'}
              `}
            >
              <Clock className="h-3 w-3" />
              {cacheHit ? 'Cached' : 'Fresh'}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {timestamp}ms
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-sm">
            <p className="font-medium">
              {cacheHit ? 'Data retrieved from Redis cache' : 'Data fetched from API'}
            </p>
            <p className="text-xs text-muted-foreground">
              {cacheHit 
                ? `Cache expires in ${ttl} seconds`
                : 'Cached for 60 seconds'}
            </p>
            <p className="text-xs text-muted-foreground">
              Response time: {timestamp}ms
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}