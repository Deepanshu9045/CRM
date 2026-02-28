export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
            {/* Ambient glow effects */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-purple-600/20 blur-[120px]" />
                <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-indigo-600/20 blur-[120px]" />
                <div className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-[100px]" />
            </div>

            <div className="relative z-10 w-full max-w-md px-4">
                {/* Logo / Brand */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white">
                        Zest<span className="text-purple-400">CRM</span>
                    </h1>
                    <p className="mt-2 text-sm text-slate-400">
                        Manage your business, effortlessly.
                    </p>
                </div>

                {/* Auth Card */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
                    {children}
                </div>
            </div>
        </div>
    );
}
