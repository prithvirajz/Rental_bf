import Link from 'next/link';
import { Heart, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-stone-50 border-t border-stone-100 py-12 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">
                {/* Brand */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 font-bold text-lg tracking-tight text-stone-900">
                        <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                        <span>RentalByf</span>
                    </div>
                    <p className="text-stone-500 max-w-xs text-sm leading-relaxed">
                        Book a kind, respectful companion for coffee, events, or emotional support. Strictly platonic.
                    </p>
                    <div className="flex gap-4 text-stone-400">
                        <Link href="#" className="hover:text-black transition-colors"><Twitter className="w-5 h-5" /></Link>
                        <Link href="#" className="hover:text-black transition-colors"><Instagram className="w-5 h-5" /></Link>
                    </div>
                </div>

                {/* Links */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-stone-900">Platform</h4>
                        <div className="flex flex-col gap-2 text-stone-500">
                            <Link href="/browse" className="hover:text-black transition-colors">Browse Companions</Link>
                            <Link href="/signup" className="hover:text-black transition-colors">Become a Companion</Link>
                            <Link href="/login" className="hover:text-black transition-colors">Log in</Link>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-stone-900">Support</h4>
                        <div className="flex flex-col gap-2 text-stone-500">
                            <Link href="/safety" className="hover:text-black transition-colors">Safety Guidelines</Link>
                            <Link href="#" className="hover:text-black transition-colors">Help Center</Link>
                            <Link href="#" className="hover:text-black transition-colors">Contact Us</Link>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-stone-900">Company</h4>
                        <div className="flex flex-col gap-2 text-stone-500">
                            <Link href="/about" className="hover:text-black transition-colors">About Us</Link>
                            <Link href="#" className="hover:text-black transition-colors">Privacy Policy</Link>
                            <Link href="#" className="hover:text-black transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-stone-200 text-center text-xs text-stone-400">
                &copy; {new Date().getFullYear()} RentalByf Inc. All rights reserved.
            </div>
        </footer>
    );
}
