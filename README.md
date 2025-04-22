# Next.js + Redis Mini Project 🚀

A demonstration of Redis caching with Next.js using server-side and client-side rendering techniques. This project showcases how to implement efficient caching strategies in a Next.js application.

## Features ✨

- **Server-Side Rendering (SSR)** with Redis caching
- **Client-Side Data Fetching** with Redis caching
- **Performance Benchmarking** tool
- **Real-time Cache Status** monitoring
- **Responsive UI** with modern design
- **TypeScript** support
- **Tailwind CSS** for styling

## Tech Stack 🛠

- [Next.js 13](https://nextjs.org/) - React framework
- [Redis](https://redis.io/) - In-memory data store
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [ioredis](https://github.com/luin/ioredis) - Redis client
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - Fake API for testing

## Prerequisites 📋

- Node.js 16.8 or later
- Redis server running locally
- npm or yarn package manager

## Getting Started 🚀

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nextjs-redis-demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start Redis server**
   ```bash
   # Using Docker
   docker run --name redis -p 6379:6379 -d redis
   
   # Or install Redis locally
   # For macOS
   brew install redis
   brew services start redis
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## Project Structure 📁

```
├── app/                    # Next.js 13 app directory
│   ├── api/               # API routes
│   ├── benchmark/         # Benchmark page
│   ├── client/           # Client-side rendering demo
│   └── users/            # Server-side rendering demo
├── components/            # React components
│   ├── client/           # Client components
│   ├── server/           # Server components
│   └── ui/               # UI components
├── lib/                   # Utility functions
└── public/               # Static assets
```

## How It Works 🔄

### Server-Side Rendering (Users Page)
- Data is fetched on the server using getServerSideProps
- First request fetches from API and stores in Redis
- Subsequent requests within 60s serve from Redis cache
- Cache status is shown for each request

### Client-Side Rendering (Posts Page)
- Data is fetched in the browser using useEffect
- API routes handle Redis caching
- Loading states are managed with Suspense
- Cache status updates in real-time

### Performance Benchmarking
- Compare response times between cached and uncached requests
- Makes multiple requests with and without cache
- Shows average, min, and max times
- Visual representation with charts

## Redis Configuration ⚙️

The project uses Redis for caching with the following settings:
- Default TTL (Time To Live): 60 seconds
- Fallback to memory cache if Redis is unavailable
- Automatic cache invalidation

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- [Next.js](https://nextjs.org/) for the amazing framework
- [Redis](https://redis.io/) for the powerful caching solution
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for the test API
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful components