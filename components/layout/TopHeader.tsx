import React from "react";
import { Search, Bell, Menu } from "lucide-react";

interface TopHeaderProps {
    setMobileMenuOpen: (open: boolean) => void;
    title?: string;
}

export function TopHeader({ setMobileMenuOpen, title = "Dashboard" }: TopHeaderProps) {
    return (
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-x-4 border-b border-slate-200 bg-white/80 px-4 shadow-sm backdrop-blur-md sm:gap-x-6 sm:px-6 lg:px-8 dark:border-slate-800 dark:bg-slate-900/80">
            <button
                type="button"
                className="-m-2.5 p-2.5 text-slate-700 lg:hidden dark:text-slate-300"
                onClick={() => setMobileMenuOpen(true)}
            >
                <span className="sr-only">Open sidebar</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div className="h-6 w-px bg-slate-200 lg:hidden dark:bg-slate-700" aria-hidden="true" />

            <div className="flex flex-1 items-center justify-between gap-x-4 self-stretch lg:gap-x-6">
                <h1 className="text-xl font-semibold leading-6 text-slate-900 hidden sm:block dark:text-white">
                    {title}
                </h1>

                <div className="flex flex-1 items-center justify-end gap-x-4 lg:gap-x-6">
                    <form className="relative flex flex-1 max-w-md" action="#" method="GET">
                        <label htmlFor="search-field" className="sr-only">
                            Search
                        </label>
                        <Search
                            className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-slate-400 ml-3"
                            aria-hidden="true"
                        />
                        <input
                            id="search-field"
                            className="block h-9 w-full rounded-full border-0 py-0 pl-10 pr-3 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-slate-800 dark:text-white dark:ring-slate-700 dark:focus:ring-indigo-500 placeholder:text-slate-400"
                            placeholder="Search..."
                            type="search"
                            name="search"
                        />
                    </form>

                    <div className="flex items-center gap-x-4 lg:gap-x-6">
                        <button
                            type="button"
                            className="-m-2.5 p-2.5 text-slate-400 hover:text-slate-500 relative transition-colors"
                        >
                            <span className="sr-only">View notifications</span>
                            <Bell className="h-6 w-6" aria-hidden="true" />
                            {/* Notification dot */}
                            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900" />
                        </button>

                        {/* Separator */}
                        <div
                            className="hidden lg:block lg:h-6 lg:w-px lg:bg-slate-200 dark:lg:bg-slate-700"
                            aria-hidden="true"
                        />

                        {/* Profile dropdown Placeholder */}
                        <button className="flex items-center gap-x-3 p-1 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-sm border border-indigo-200 dark:bg-indigo-500/20 dark:text-indigo-400 dark:border-indigo-500/30">
                                JD
                            </div>
                            <span className="hidden lg:flex lg:items-center">
                                <span className="text-sm font-medium leading-6 text-slate-900 dark:text-slate-100 mr-2" aria-hidden="true">
                                    John Doe
                                </span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
