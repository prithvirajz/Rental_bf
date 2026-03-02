"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Calendar, Clock, MapPin, CheckCircle, Clock3, XCircle } from 'lucide-react';
import api from '@/lib/axios';
import { Booking } from '@/types';
import { cn } from '@/lib/utils';

export default function MyBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push('/login');
                    return;
                }

                const res = await api.get('/bookings/');
                setBookings(res.data);
            } catch (error) {
                console.error(error);
                // If 401, redirect? handled by interceptor ideally or logic here
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [router]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center pt-20">Loading bookings...</div>;
    }

    return (
        <div className="min-h-screen bg-zinc-50 pt-10 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

                {bookings.length === 0 ? (
                    <div className="bg-white p-12 rounded-3xl border border-zinc-100 text-center">
                        <p className="text-zinc-500 mb-4">You haven't made any bookings yet.</p>
                        <button
                            onClick={() => router.push('/browse')}
                            className="px-6 py-3 bg-black text-white rounded-full font-medium"
                        >
                            Browse Companions
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {bookings.map((booking) => (
                            <div key={booking.id} className="bg-white p-6 rounded-3xl border border-zinc-100 flex flex-col md:flex-row gap-6">
                                {/* Photo */}
                                <div className="relative w-full md:w-32 h-32 rounded-2xl overflow-hidden bg-zinc-100 shrink-0">
                                    {booking.boyfriend_photo && (
                                        <Image
                                            src={booking.boyfriend_photo}
                                            alt={booking.boyfriend_name}
                                            fill
                                            className="object-cover"
                                        />
                                    )}
                                </div>

                                {/* Details */}
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-xl font-bold">{booking.boyfriend_name}</h3>
                                        <StatusBadge status={booking.status} />
                                    </div>

                                    <div className="space-y-2 text-zinc-600 mb-4">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>{new Date(booking.date).toLocaleDateString()} at {new Date(booking.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            <span>{booking.hours} hours</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                                        <span>Booking ID: #{booking.id}</span>
                                        <span>•</span>
                                        <span>₹{booking.amount}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles = {
        pending_payment: "bg-yellow-50 text-yellow-700",
        confirmed: "bg-green-50 text-green-700",
        cancelled: "bg-red-50 text-red-700",
        completed: "bg-blue-50 text-blue-700",
    };

    const icons = {
        pending_payment: <Clock3 className="w-3 h-3" />,
        confirmed: <CheckCircle className="w-3 h-3" />,
        cancelled: <XCircle className="w-3 h-3" />,
        completed: <CheckCircle className="w-3 h-3" />,
    };

    const labels = {
        pending_payment: "Pending Payment",
        confirmed: "Confirmed",
        cancelled: "Cancelled",
        completed: "Completed"
    };

    const key = status as keyof typeof styles;

    return (
        <span className={cn("flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium", styles[key] || styles.pending_payment)}>
            {icons[key]}
            {labels[key] || status}
        </span>
    );
}
