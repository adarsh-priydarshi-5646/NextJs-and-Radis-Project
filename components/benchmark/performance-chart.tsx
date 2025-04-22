"use client";

import { useEffect, useState } from "react";
import { PerformanceMetrics } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Play, BarChart } from "lucide-react";
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export function PerformanceChart() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [runCount, setRunCount] = useState(0);

  // Run benchmark
  const runBenchmark = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/benchmark');
      const data = await response.json();
      setMetrics(data);
      setRunCount(prev => prev + 1);
    } catch (error) {
      console.error('Failed to run benchmark:', error);
    } finally {
      setLoading(false);
    }
  };

  // Prepare chart data
  const chartData = metrics ? [
    {
      name: 'API Direct',
      time: metrics.apiTime,
    },
    {
      name: 'Redis Cache',
      time: metrics.cacheTime,
    }
  ] : [];

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/30">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              <span>Performance Benchmark</span>
            </CardTitle>
            <CardDescription>
              Compare response times between direct API calls and Redis cache
            </CardDescription>
          </div>
          <Button
            onClick={runBenchmark}
            disabled={loading}
            className="gap-2"
          >
            <Play className="h-4 w-4" />
            Run Test
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {metrics ? (
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Direct API Call</span>
                    <span className="text-2xl font-bold">{metrics.apiTime}ms</span>
                  </div>
                  <Progress value={100} className="w-1/3 bg-muted" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Redis Cache</span>
                    <span className="text-2xl font-bold">{metrics.cacheTime}ms</span>
                  </div>
                  <Progress 
                    value={(metrics.cacheTime / metrics.apiTime) * 100} 
                    className="w-1/3 bg-muted" 
                  />
                </div>
              </div>
              
              <div className="rounded-lg border bg-card p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Time saved:</span>
                    <span className="font-medium">{metrics.difference}ms</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Percentage faster:</span>
                    <span className="font-medium text-green-600">
                      {metrics.percentFaster}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis 
                    label={{ 
                      value: 'Response Time (ms)', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { textAnchor: 'middle' }
                    }} 
                  />
                  <RechartsTooltip formatter={(value) => [`${value}ms`, 'Response Time']} />
                  <Legend />
                  <Bar dataKey="time" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="flex h-72 items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground">
                {loading 
                  ? 'Running benchmark...' 
                  : 'Click "Run Test" to compare performance'}
              </p>
            </div>
          </div>
        )}
      </CardContent>
      {metrics && (
        <CardFooter className="border-t bg-muted/30 py-3">
          <p className="text-xs text-muted-foreground">
            Test run {runCount} completed successfully. Redis cache provides significant performance benefits.
          </p>
        </CardFooter>
      )}
    </Card>
  );
}