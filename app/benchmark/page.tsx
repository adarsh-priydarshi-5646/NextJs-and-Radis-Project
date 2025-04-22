import { MainLayout } from "@/components/layouts/main-layout";
import { SectionHeader } from "@/components/ui/section-header";
import { Suspense } from "react";
import { PerformanceChart } from "@/components/benchmark/performance-chart";
import { Skeleton } from "@/components/ui/skeleton";

export default function BenchmarkPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="p-6 bg-muted/50 rounded-lg space-y-2">
          <h2 className="text-xl font-semibold">Performance Benchmarking 📊</h2>
          <p className="text-muted-foreground">
            Compare the performance between cached and uncached requests:
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Click "Run Test" to start benchmarking</li>
            <li>Makes multiple requests with and without cache</li>
            <li>Compares response times in milliseconds</li>
            <li>Shows average, min, and max times</li>
          </ul>
        </div>
        <SectionHeader
          title="Performance Benchmark"
          description="Compare response times between direct API calls and Redis cache"
        />
        
        <Suspense fallback={<Skeleton className="h-72 w-full" />}>
          <PerformanceChart />
        </Suspense>
      </div>
    </MainLayout>
  );
}