import { ReactNode } from 'react';
import { Separator } from '@/components/ui/separator';

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function SectionHeader({ title, description, action }: SectionHeaderProps) {
  return (
    <div className="mb-6 space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {action && <div>{action}</div>}
      </div>
      {description && (
        <p className="text-muted-foreground">
          {description}
        </p>
      )}
      <Separator />
    </div>
  );
}