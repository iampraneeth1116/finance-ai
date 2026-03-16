"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Home, List, PieChart, MessageSquare, Settings, LogOut, BarChart2 } from 'lucide-react';

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (stored) setUser(JSON.parse(stored));
    }, []);

    if (pathname === '/login' || pathname === '/register') return null;

    const links = [
        { name: 'Dashboard', href: '/', icon: Home },
        { name: 'Transactions', href: '/transactions', icon: List },
        { name: 'Budgets', href: '/budgets', icon: PieChart },
        { name: 'Simulator', href: '/scenario', icon: BarChart2 },
        { name: 'AI Assistant', href: '/assistant', icon: MessageSquare },
        { name: 'Settings', href: '/settings', icon: Settings },
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
    };

    return (
        <aside className="w-64 h-full bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex-col hidden md:flex shrink-0">
            <div className="p-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">FinAI</h1>
            </div>
            <nav className="flex-1 px-4 space-y-2 mt-4">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 font-semibold'
                                : 'text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 font-medium'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{link.name}</span>
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
                <div className="flex items-center gap-3 px-4 py-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 shadow-sm shrink-0 flex items-center justify-center text-white text-xs font-bold">
                        {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div className="overflow-hidden flex-1">
                        <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 truncate">{user?.name || 'User'}</p>
                        <p className="text-xs text-zinc-500 truncate">{user?.email || ''}</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all"
                >
                    <LogOut className="w-4 h-4" />
                    <span>Log out</span>
                </button>
            </div>
        </aside>
    );
}
