import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Sidebar, MobileSidebar } from '@/components/layout/sidebar';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Loan Picks Dashboard',
  description: 'Find your perfect loan match',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-full relative">
            {/* Desktop Sidebar */}
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900">
                <Sidebar />
            </div>
            
            {/* Main Content */}
            <main className="md:pl-72 pb-10">
                {/* Mobile Header with Sidebar Trigger */}
                <div className="flex items-center p-4 md:hidden">
                    <MobileSidebar />
                    <div className="ml-4 font-bold text-lg">LoanPicks</div>
                </div>

                {/* Existing Header (optional, or integrated into sidebar/main) */}
                <div className="hidden md:block">
                     <Header /> 
                </div>

                {children}
            </main>
        </div>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
