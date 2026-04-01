"use client";

import Link from 'next/link';
import { Sparkles, Mail, Lock } from 'lucide-react';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid credentials");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl group-hover:bg-accent-500/30 transition-colors duration-500"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-500/30 transition-colors duration-500"></div>
        
        <div className="relative z-10">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-accent-600 to-indigo-400 flex items-center justify-center shadow-lg shadow-accent-500/30">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl font-heading font-bold text-center mb-2">Welcome back</h2>
          <p className="text-slate-400 text-center mb-6 text-sm">Enter your credentials to access your account</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-lg mb-6 text-center">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-slate-500" />
                </div>
                <input 
                  type="email" 
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-500/50 transition-all font-medium placeholder:text-slate-600"
                  placeholder="you@example.com"
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium text-slate-300">Password</label>
                <a href="#" className="text-xs text-accent-400 hover:text-accent-300 transition-colors">Forgot password?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-slate-500" />
                </div>
                <input 
                  type="password" 
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-500/50 transition-all font-medium placeholder:text-slate-600"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <button disabled={isLoading} className="w-full bg-accent-600 hover:bg-accent-500 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-accent-600/25 mt-4 hover:scale-[1.02]">
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm text-slate-400">
            Don't have an account?{' '}
            <Link href="/register" className="text-accent-400 font-medium hover:text-accent-300 transition-colors">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
