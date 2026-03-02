import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MapPin, Shield } from 'lucide-react';
import { BoyfriendProfile } from '@/types';
import BookingForm from '@/components/BookingForm';

async function getProfile(id: string): Promise<BoyfriendProfile | null> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/boyfriends/${id}/`, {
            cache: 'no-store'
        });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        return null;
    }
}

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const profile = await getProfile(id);

    if (!profile) return notFound();

    return (
        <div className="min-h-screen bg-zinc-50 py-12">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
                {/* Left: Photos & Bio */}
                <div className="md:col-span-2 space-y-8">
                    <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-zinc-200">
                        <Image
                            src={profile.photo || "https://placehold.co/600x400"}
                            alt={profile.name}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-zinc-100">
                        <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
                        <div className="flex items-center gap-2 text-zinc-500 mb-6">
                            <MapPin className="w-4 h-4" />
                            <span>{profile.city}</span>
                        </div>

                        <h3 className="text-lg font-bold mb-4">About</h3>
                        <p className="text-zinc-600 leading-relaxed mb-6">
                            {profile.bio}
                        </p>

                        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg w-fit text-sm font-medium">
                            <Shield className="w-4 h-4" />
                            <span>Identity Verified</span>
                        </div>
                    </div>
                </div>

                {/* Right: Booking */}
                <div className="md:col-span-1">
                    <BookingForm profile={profile} />
                </div>
            </div>
        </div>
    );
}
