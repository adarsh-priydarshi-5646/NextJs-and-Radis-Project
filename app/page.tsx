import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layouts/main-layout";
import Link from "next/link";
import { ArrowRight, Database, Server, Clock, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Next.js + Redis Mini Project
          </h1>
          <p className="max-w-[600px] text-muted-foreground mx-auto">
            A demonstration of Redis caching with Next.js using server-side and client-side rendering techniques.
          </p>
        </div>

        <div className="w-full p-6 bg-muted/50 rounded-lg space-y-2">
          <h2 className="text-xl font-semibold">Welcome to Redis Explorer! 👋</h2>
          <p className="text-muted-foreground">
            This demo shows how Redis caching works with Next.js. You can:
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Check out server-side rendering with Redis caching in the Users page</li>
            <li>See client-side data fetching with Redis in the Posts page</li>
            <li>Compare performance between cached and uncached requests in the Benchmark page</li>
          </ul>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Server className="h-5 w-5" />}
            title="Server-Side Rendering"
            description="Uses getServerSideProps to fetch data from the API with Redis caching"
            link="/users"
            linkText="View Users"
          />
          <FeatureCard
            icon={<Clock className="h-5 w-5" />}
            title="Client-Side Rendering"
            description="Uses useEffect to fetch data from the API route with Redis caching"
            link="/client"
            linkText="View Posts"
          />
          <FeatureCard
            icon={<BarChart3 className="h-5 w-5" />}
            title="Performance Benchmarking"
            description="Compare response times between direct API calls and Redis cache"
            link="/benchmark"
            linkText="Run Benchmark"
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                <span>How Redis Caching Works</span>
              </CardTitle>
              <CardDescription>
                The flow of data with Redis caching in this application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  1. <strong>Request data:</strong> The application receives a request for data (e.g., a list of users)
                </p>
                <p>
                  2. <strong>Check Redis cache:</strong> The application checks if the requested data exists in Redis
                </p>
                <p>
                  3. <strong>Cache hit:</strong> If the data is in Redis (and not expired), it's returned immediately
                </p>
                <p>
                  4. <strong>Cache miss:</strong> If the data is not in Redis, it's fetched from the JSONPlaceholder API
                </p>
                <p>
                  5. <strong>Store in Redis:</strong> The fetched data is stored in Redis with a TTL of 60 seconds
                </p>
                <p>
                  6. <strong>Return data:</strong> The data is returned to the client along with cache metadata
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                The cache TTL (Time To Live) is set to 60 seconds by default. After this time, the data is automatically removed from Redis.
              </p>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                <span>Performance Benefits</span>
              </CardTitle>
              <CardDescription>
                Why Redis caching is important for your application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  <strong>1. Faster Response Times:</strong> Cached data is served from memory, reducing API latency
                </p>
                <p>
                  <strong>2. Reduced Server Load:</strong> Fewer requests to external APIs means less server stress
                </p>
                <p>
                  <strong>3. Better User Experience:</strong> Quick page loads and smooth interactions
                </p>
                <p>
                  <strong>4. Cost Effective:</strong> Lower bandwidth usage and API costs
                </p>
                <p>
                  <strong>5. Scalability:</strong> Redis can handle high concurrent loads efficiently
                </p>
                <p>
                  <strong>6. Reliability:</strong> Fallback to memory cache if Redis is unavailable
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Try the Benchmark page to see the performance difference between cached and uncached requests.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  linkText: string;
}

function FeatureCard({ icon, title, description, link, linkText }: FeatureCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {/* Content can be added here if needed */}
      </CardContent>
      <CardFooter className="pt-0">
        <Link href={link} className="w-full">
          <Button className="w-full gap-2">
            {linkText}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}