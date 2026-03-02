"use client";

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { BoyfriendProfile } from '@/types';
import { motion } from 'framer-motion';

export default function BoyfriendCard({ profile }: { profile: BoyfriendProfile }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-white rounded-2xl overflow-hidden border border-zinc-100 shadow-sm hover:shadow-xl transition-all"
        >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-100">
                <Image
                    src={profile.photo || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop"}
                    alt={profile.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 pt-20 text-white">
                    <h3 className="text-xl font-bold">{profile.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-zinc-200 mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>{profile.city}</span>
                    </div>
                </div>
            </div>

            <div className="p-4 flex items-center justify-between">
                <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wide font-medium">Price</p>
                    <p className="font-semibold">₹{profile.price}<span className="text-sm font-normal text-zinc-500">/hr</span></p>
                </div>

                <Link
                    href={`/profile/${profile.id}`}
                    className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors"
                >
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </motion.div>
    );
}
