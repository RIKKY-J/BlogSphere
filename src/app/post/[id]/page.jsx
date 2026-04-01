import Link from 'next/link';
import { Calendar, Clock, Edit, MessageSquare, Trash2, Heart } from 'lucide-react';
import connectDB from '../../../lib/db';
import Post from '../../../models/Post';
import User from '../../../models/User';
import { notFound } from 'next/navigation';

export default async function PostDetails({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.id;

  await connectDB();
  const post = await Post.findOne({ slug }).populate('author', 'username').lean();

  if (!post) {
    return notFound();
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <article className="max-w-4xl mx-auto py-8">
      {/* HEADER SECTION */}
      <header className="space-y-6 mb-12 border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 text-sm text-accent-400 font-medium">
          <span className="px-3 py-1 rounded-full bg-accent-500/10 border border-accent-500/20 uppercase">{post.category}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {formattedDate}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {Math.ceil(post.content.length / 1000)} min read</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-xl font-bold text-slate-400">
              {post.author?.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-lg">{post.author?.username}</p>
              <p className="text-sm text-slate-400">Author</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-slate-400">
            <button className="p-2 hover:text-accent-400 hover:bg-white/5 rounded-full transition-colors flex items-center gap-1 group">
              <Heart className="w-5 h-5 group-hover:fill-accent-400" /> <span className="text-sm">0</span>
            </button>
            <button className="p-2 hover:text-white hover:bg-white/5 rounded-full transition-colors flex items-center gap-1">
              <MessageSquare className="w-5 h-5" /> <span className="text-sm">0</span>
            </button>
            <div className="h-6 w-px bg-white/10 mx-2"></div>
            <Link href={`/write?edit=${post._id}`} className="p-2 hover:text-indigo-400 hover:bg-white/5 rounded-full transition-colors">
              <Edit className="w-5 h-5" />
            </Link>
            <button className="p-2 hover:text-red-400 hover:bg-white/5 rounded-full transition-colors">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="prose prose-invert prose-lg max-w-none prose-headings:font-heading prose-a:text-accent-400 whitespace-pre-wrap text-slate-300 leading-relaxed">
        {post.content}
      </div>
      
      {/* COMMENTS SECTION */}
      <section className="mt-20 pt-10 border-t border-white/10">
        <h3 className="text-2xl font-heading font-bold mb-8 flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-accent-500" />
          Comments (0)
        </h3>
        <div className="bg-slate-900/50 rounded-2xl p-6 border border-white/5 mb-8">
          <textarea 
            className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-500/50 resize-none"
            rows="3"
            placeholder="What are your thoughts?"
          ></textarea>
          <div className="flex justify-end mt-4">
            <button className="bg-accent-600 hover:bg-accent-500 text-white px-6 py-2 rounded-full font-medium transition-colors shadow-lg shadow-accent-600/20">
              Post Comment
            </button>
          </div>
        </div>
      </section>
    </article>
  );
}
