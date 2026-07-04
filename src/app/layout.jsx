import '../index.css';
import { Inter, Outfit } from 'next/font/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthProvider } from '../components/AuthProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata = {
  title: 'BlogSphere',
  description: 'Discover extraordinary ideas and stories.',
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-slate-950 text-slate-200 selection:bg-indigo-500/30 selection:text-indigo-200 transition-colors duration-300 min-h-screen flex flex-col overflow-x-hidden`}>
        <AuthProvider>
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-4 md:mt-8 animate-fade-in relative">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
