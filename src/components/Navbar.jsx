"use client";

import Link from 'next/link';
import { Sparkles, PenSquare, LogIn, LogOut, User } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="w-full h-20 flex items-center justify-between px-6 lg:px-12 backdrop-blur-md bg-slate-950/80 sticky top-0 z-50 border-b border-white/5">
      {/* LOGO */}
      <Link href="/" className="flex items-center gap-2 group">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent-500 to-accent-300 flex items-center justify-center shadow-lg shadow-accent-500/20 group-hover:scale-105 transition-transform duration-300">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-heading font-bold tracking-tight text-white group-hover:opacity-80 transition-opacity">BlogSphere</span>
      </Link>

      {/* LINKS */}
      <div className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-300">
        <Link href="/" className="hover:text-accent-400 transition-colors">Home</Link>
        <Link href="#all-blogs" className="hover:text-accent-400 transition-colors">All Blogs</Link>
        <Link href="/about" className="hover:text-accent-400 transition-colors">About</Link>
      </div>

      {/* ACTIONS */}
      <div className="flex items-center gap-4">
        {status === "authenticated" ? (
           <>
            <Link href="/write" className="hidden sm:flex items-center gap-2 text-sm font-medium hover:text-accent-400 transition-colors px-4 py-2 rounded-full hover:bg-white/5">
              <PenSquare className="w-4 h-4" />
              <span>Write</span>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-white/10 group cursor-pointer hover:border-accent-500/50 transition-colors">
                <User className="w-4 h-4 text-slate-400 group-hover:text-accent-400" />
              </div>
              <button onClick={() => signOut()} className="flex items-center gap-2 text-slate-400 hover:text-red-400 text-sm font-medium transition-colors p-2 hover:bg-red-400/10 rounded-full">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
           </>
        ) : (
          <Link href="/login" className="flex items-center gap-2 bg-accent-600 hover:bg-accent-500 text-white px-5 py-2 rounded-full font-medium transition-all hover:scale-105 shadow-md shadow-accent-600/20">
            <LogIn className="w-4 h-4" />
            <span>Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
