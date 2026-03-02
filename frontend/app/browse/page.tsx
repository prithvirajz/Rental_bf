import { BoyfriendProfile } from '@/types';
import BoyfriendCard from '@/components/BoyfriendCard';
import { Search } from 'lucide-react';

async function getBoyfriends(): Promise<BoyfriendProfile[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/boyfriends/`, {
            cache: 'no-store',
        });
        if (!res.ok) return [];
        return res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default async function BrowsePage() {
    const boyfriends = await getBoyfriends();

    return (
        <div className="min-h-screen bg-zinc-50 pb-20">
            <div className="bg-white border-b border-zinc-100 py-12">
                <div className="max-w-6xl mx-auto px-6">
                    <h1 className="text-3xl font-bold mb-4">Find your companion</h1>
                    <div className="flex gap-4 max-w-xl">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                            <input
                                type="text"
                                placeholder="Search by city or name..."
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-black/5"
                            />
                        </div>
                        {/* Filter buttons could go here */}
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-12">
                {boyfriends.length === 0 ? (
                    <div className="text-center py-20 text-zinc-500">
                        <p>No companions found at the moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {boyfriends.map((bf) => (
                            <BoyfriendCard key={bf.id} profile={bf} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
