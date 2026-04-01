import { Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full mt-20 border-t border-white/5 bg-slate-950/50 py-12 px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-accent-500" />
        <span className="text-xl font-heading font-bold text-white opacity-90">BlogSphere</span>
      </div>
      <div className="flex flex-col md:items-center items-start gap-1">
        <p className="text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} BlogSphere. All rights reserved.
        </p>
        <p className="text-slate-500 text-xs font-medium">
          Made by Rikky Jakhar, a software developer
        </p>
      </div>
      <div className="flex gap-4 text-sm text-slate-400">
        <span className="hover:text-accent-400 cursor-pointer transition-colors">Privacy</span>
        <span className="hover:text-accent-400 cursor-pointer transition-colors">Terms</span>
        <span className="hover:text-accent-400 cursor-pointer transition-colors">Contact</span>
      </div>
    </footer>
  );
};

export default Footer;
