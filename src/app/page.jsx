import Link from 'next/link';
import { ArrowRight, Clock, Star } from 'lucide-react';
import connectDB from '../lib/db';
import Post from '../models/Post';
import User from '../models/User';

const CATEGORIES = [
  { name: 'All', slug: 'all' },
  { name: 'Technology', slug: 'tech' },
  { name: 'Design', slug: 'design' },
  { name: 'Business', slug: 'business' },
  { name: 'Lifestyle', slug: 'lifestyle' }
];

// Async Server Component
export default async function Home({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const activeCategory = resolvedSearchParams?.category || 'all';

  await connectDB();
  
  // Filter by category if one is active
  const query = {};
  if (activeCategory !== 'all') {
    query.category = activeCategory;
  }

  // Fetch real posts from MongoDB, latest first
  // .lean() returns plain JS objects instead of heavy Mongoose documents
  const postsData = await Post.find(query).sort({ createdAt: -1 }).populate('author', 'username').lean();
  
  // Safely serialize object IDs for Client rendering if necessary, but we are in Server rendering
  const posts = postsData.map(post => ({
    ...post,
    _id: post._id ? post._id.toString() : '',
    author: post.author ? {
      ...post.author,
      _id: post.author._id ? post.author._id.toString() : ''
    } : { username: 'Unknown Author', _id: '' },
    createdAt: post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''
  }));

  const featuredPost = posts.length > 0 ? posts[0] : null;

  return (
    <div className="flex flex-col gap-16 min-h-screen pb-20">
      {/* HERO SECTION */}
      <section className="mt-12 lg:mt-24 space-y-8 flex flex-col items-center text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-sm font-medium animate-fade-in">
          <Star className="w-4 h-4" />
          <span>New Feature: AI Summaries are now live!</span>
        </div>
        <h1 className="text-5xl lg:text-7xl font-bold leading-tight font-heading animate-slide-up">
          Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-indigo-300">extraordinary</span> ideas and stories.
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
          BlogSphere is the premium platform to read, write, and deepen your understanding on anything and everything. Join our community of thinkers.
        </p>
        <div className="flex items-center gap-4 pt-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Link href="/write" className="bg-white text-slate-950 hover:bg-slate-200 px-8 py-3.5 rounded-full font-bold transition-all hover:scale-105 shadow-xl shadow-white/10 text-lg">
            Start Writing
          </Link>
          <Link href="#all-blogs" className="bg-slate-900 border border-white/10 hover:bg-slate-800 text-white px-8 py-3.5 rounded-full font-medium transition-all hover:scale-105 text-lg">
            Explore All Blogs
          </Link>
        </div>
      </section>

      {/* FEATURED POST */}
      {featuredPost && (
        <section className="mt-10 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <Link href={`/post/${featuredPost.slug}`} className="group block relative rounded-3xl overflow-hidden bg-slate-900 border border-white/10 shadow-lg hover:border-accent-500/30 transition-colors p-8 md:p-12">
            
            <div className="relative z-20 w-full md:w-3/4">
              <span className="inline-block px-3 py-1 bg-accent-500/20 text-accent-400 border border-accent-500/20 text-xs font-bold rounded-full mb-4 uppercase tracking-wider">Featured</span>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4 group-hover:text-accent-300 transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-slate-300 text-lg hidden md:block mb-6 line-clamp-2">
                {featuredPost.content.substring(0, 180)}...
              </p>
              <div className="flex items-center gap-4 text-sm font-medium text-slate-400">
                <span className="text-white">{featuredPost.author?.username}</span>
                <span>•</span>
                <span>{featuredPost.createdAt}</span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* CATEGORIES & FEED */}
      <section id="all-blogs" className="grid grid-cols-1 lg:grid-cols-4 gap-12 mt-10">
        
        {/* MAIN FEED */}
        <div className="lg:col-span-3 space-y-10">
          <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide font-sans">
            {CATEGORIES.map((cat) => (
              <Link
                href={cat.slug === 'all' ? '/' : `/?category=${cat.slug}`}
                key={cat.slug}
                className={`whitespace-nowrap px-5 py-2 rounded-full font-medium transition-all ${
                  activeCategory === cat.slug
                    ? 'bg-white text-slate-950 shadow-lg'
                    : 'bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link href={`/post/${post.slug}`} key={post._id} className="group flex flex-col gap-4 p-6 bg-slate-900/40 rounded-3xl border border-white/5 hover:border-accent-500/30 hover:bg-slate-900/60 transition-all">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-3 font-medium">
                    <span className="text-accent-400">{post.author?.username}</span>
                    <span>•</span>
                    <span>{post.createdAt}</span>
                    <span>•</span>
                    <span className="uppercase">{post.category}</span>
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-2 group-hover:text-accent-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-400 line-clamp-2 text-sm">
                    {post.content.substring(0, 120)}...
                  </p>
                </div>
              </Link>
            ))}
            {posts.length === 0 && (
              <p className="col-span-2 text-center text-slate-500 py-10 text-lg">No stories published yet. Be the first!</p>
            )}
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-10">
          <div className="bg-slate-900/50 border border-white/5 p-6 rounded-3xl">
            <h3 className="font-heading font-bold text-xl mb-4 text-white">Discover more</h3>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.slice(1).map(cat => (
                <Link
                  href={`/?category=${cat.slug}`}
                  key={cat.slug}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm cursor-pointer transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
            <Link href="/" className="inline-flex items-center gap-1 text-accent-400 text-sm font-medium mt-6 hover:text-accent-300 transition-colors">
              See all topics <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-gradient-to-br from-accent-900/50 to-indigo-900/50 border border-accent-500/20 p-6 rounded-3xl text-center">
            <h3 className="font-heading font-bold text-xl mb-2 text-white">Join our newsletter</h3>
            <p className="text-sm text-slate-400 mb-6">Get the best stories delivered to your inbox.</p>
            <input type="email" placeholder="Email address" className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 mb-3 text-sm focus:outline-none focus:border-accent-500" />
            <button className="w-full bg-white text-slate-950 font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors text-sm">
              Subscribe
            </button>
          </div>
        </div>

      </section>
    </div>
  );
}
