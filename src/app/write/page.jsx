"use client";

import { useState, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function WritePost() {
  const { status } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading" || status === "unauthenticated") {
    return <div className="min-h-screen flex items-center justify-center text-slate-400">Loading...</div>;
  }

  const handlePublish = async () => {
    setIsPublishing(true);
    setError('');

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, category }),
      });

      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.message || "Something went wrong!");
      }
    } catch (err) {
      setError("Failed to publish the post.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 lg:py-12">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl md:text-5xl font-heading font-bold flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-accent-500" />
          Write a new story
        </h1>
        <button 
          onClick={handlePublish}
          disabled={isPublishing}
          className="bg-white text-slate-950 hover:bg-slate-200 px-6 py-2.5 rounded-full font-bold transition-all hover:scale-105 flex items-center gap-2 shadow-xl shadow-white/10 disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          {isPublishing ? "Publishing..." : "Publish"}
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-lg mb-6 text-center">
          {error}
        </div>
      )}

      <div className="space-y-8">
        {/* INPUT FORM */}
        <div className="flex flex-col md:flex-row gap-6">
          <input
            type="text"
            placeholder="Title"
            className="flex-1 bg-transparent text-4xl md:text-5xl font-heading font-bold outline-none placeholder:text-slate-700 pb-4 border-b border-transparent focus:border-accent-500/30 transition-colors"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select 
            className="bg-slate-900 border border-white/10 rounded-2xl px-6 py-4 text-slate-300 focus:outline-none focus:ring-2 focus:ring-accent-500 h-[68px] appearance-none cursor-pointer"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>Select Category</option>
            <option value="tech">Technology</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="business">Business</option>
            <option value="design">Design</option>
          </select>
        </div>

        {/* MAIN TEXT AREA */}
        <div className="relative">
          <textarea
            placeholder="Tell your story..."
            className="w-full min-h-[500px] bg-transparent text-xl leading-relaxed text-slate-300 outline-none placeholder:text-slate-700 resize-y pt-4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
