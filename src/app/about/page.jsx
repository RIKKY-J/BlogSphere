import { User, Code, Briefcase, Mail } from 'lucide-react';

export const metadata = {
  title: 'About | BlogSphere',
  description: 'About the creator of BlogSphere',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 min-h-[70vh] flex flex-col justify-center items-center text-center animate-fade-in">
      <div className="w-24 h-24 bg-accent-500/10 border border-accent-500/20 rounded-full flex items-center justify-center mb-8 shadow-xl shadow-accent-500/5">
        <User className="w-10 h-10 text-accent-400" />
      </div>
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
        About the Developer
      </h1>
      
      <div className="bg-slate-900/60 border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl w-full relative overflow-hidden group hover:border-accent-500/30 transition-colors">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-500 to-indigo-500"></div>
        
        <p className="text-2xl md:text-3xl text-slate-300 font-medium leading-relaxed mb-8">
          Made by <span className="text-white font-bold inline-flex items-center gap-2"><Code className="w-6 h-6 text-accent-400"/> Rikky Jakhar</span>, a software developer.
        </p>
        
        <p className="text-slate-400 max-w-2xl mx-auto mb-8 text-lg">
          Passionate about crafting dynamic, full-stack web applications with modern technologies like Next.js, React, and MongoDB. Dedicated to building elegant solutions that deliver exceptional user experiences.
        </p>

        <div className="flex justify-center gap-6 text-sm font-medium">
          <a href="#" className="flex items-center gap-2 text-slate-400 hover:text-accent-400 transition-colors bg-white/5 py-2 px-4 rounded-full">
            <Briefcase className="w-4 h-4" /> Portfolio
          </a>
          <a href="mailto:contact@example.com" className="flex items-center gap-2 text-slate-400 hover:text-accent-400 transition-colors bg-white/5 py-2 px-4 rounded-full">
            <Mail className="w-4 h-4" /> Contact Me
          </a>
        </div>
      </div>
    </div>
  );
}
