"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, CreditCard } from 'lucide-react';
import api from '@/lib/axios';
import { BoyfriendProfile } from '@/types';
import { cn } from '@/lib/utils';
import ErrorMessage from '@/components/ui/ErrorMessage';

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function BookingForm({ profile }: { profile: BoyfriendProfile }) {
    const [hours, setHours] = useState(2);
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const totalAmount = parseFloat(profile.price) * hours;

    const handleBook = async () => {
        const token = localStorage.getItem('token');
        setError('');

        if (!token) {
            router.push('/login');
            return;
        }

        if (!date) {
            setError('Please select a date');
            return;
        }

        try {
            setLoading(true);
            // 1. Create Booking
            const res = await api.post('/bookings/', {
                boyfriend: profile.id,
                date: new Date(date).toISOString(),
                hours,
            });

            const { booking, razorpay_order } = res.data;

            // 2. Open Razorpay
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_1234567890', // Add env later
                amount: razorpay_order.amount,
                currency: razorpay_order.currency,
                name: "Rental Boyfriend",
                description: `Booking with ${profile.name}`,
                order_id: razorpay_order.id,
                handler: async function (response: any) {
                    // 3. Verify Payment
                    try {
                        await api.post('/verify-payment/', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });
                        router.push('/my-bookings');
                    } catch (err) {
                        setError('Payment verification failed');
                    }
                },
                prefill: {
                    name: "User Name", // TODO: Get from auth
                    email: "user@example.com",
                    contact: "9999999999"
                },
                theme: {
                    color: "#000000"
                }
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();

        } catch (error) {
            console.error(error);
            setError('Failed to initiate booking');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm sticky top-24">
            <h3 className="text-xl font-bold mb-6">Book {profile.name}</h3>

            <ErrorMessage message={error} />

            <div className="space-y-4 mb-6">
                <div>
                    <label className="text-xs font-semibold uppercase text-zinc-500 mb-1 block">Date</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                            type="datetime-local"
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:border-black"
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label className="text-xs font-semibold uppercase text-zinc-500 mb-1 block">Duration</label>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setHours(Math.max(1, hours - 1))}
                            className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-50"
                        >
                            -
                        </button>
                        <span className="font-medium w-12 text-center">{hours} hrs</span>
                        <button
                            onClick={() => setHours(hours + 1)}
                            className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-50"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            <div className="border-t border-zinc-100 py-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-zinc-500">Rate</span>
                    <span>₹{profile.price} / hr</span>
                </div>
                <div className="flex items-center justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{totalAmount}</span>
                </div>
            </div>

            <button
                onClick={handleBook}
                disabled={loading}
                className="w-full py-3 bg-black text-white rounded-xl font-medium hover:bg-zinc-800 transition-colors disabled:opacity-50"
            >
                {loading ? 'Processing...' : 'Book Now'}
            </button>

            <p className="text-xs text-center text-zinc-400 mt-4">
                You won't be charged yet.
            </p>
        </div>
    );
}
