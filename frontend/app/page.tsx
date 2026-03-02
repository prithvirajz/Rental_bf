import Link from "next/link";
import { ArrowRight, Heart, Shield, Star, Calendar, MessageCircle, HelpCircle, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-6 py-20 md:py-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 text-rose-600 text-sm font-medium mb-8">
          <Heart className="w-4 h-4 fill-rose-600" />
          <span>Emotional support & companionship</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-stone-900 mb-6 max-w-4xl">
          Someone to go <br className="hidden md:block" /> with you.
        </h1>

        <p className="text-xl text-stone-500 max-w-2xl mb-10 leading-relaxed">
          Book a kind, respectful companion for coffee, events, or just a listening ear.
          Strictly platonic, safe, and vetted.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/browse" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-stone-900 text-white rounded-full font-medium hover:scale-105 transition-transform shadow-lg shadow-stone-200">
            Browse Companions <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/signup" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-stone-200 text-stone-900 rounded-full font-medium hover:bg-stone-50 transition-colors">
            Become a Companion
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full bg-white py-24 border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-4 p-8 bg-stone-50 rounded-3xl border border-stone-100">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-600">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">Safe & Verified</h3>
            <p className="text-stone-500 leading-relaxed">Every companion undergoes a strict background check and ID verification process for your safety.</p>
          </div>

          <div className="flex flex-col gap-4 p-8 bg-stone-50 rounded-3xl border border-stone-100">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-purple-600">
              <Star className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">Premium Experience</h3>
            <p className="text-stone-500 leading-relaxed">Our companions are polite, well-dressed, and emotionally intelligent conversationalists.</p>
          </div>

          <div className="flex flex-col gap-4 p-8 bg-stone-50 rounded-3xl border border-stone-100">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-rose-600">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">Emotional Support</h3>
            <p className="text-stone-500 leading-relaxed">More than just a date. Find someone who genuinely listens, cares, and provides emotional validation.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-stone-900">How it works</h2>
          <p className="text-stone-500 max-w-xl mx-auto">Simple, transparent, and designed for your comfort.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-stone-200 via-stone-300 to-stone-200" />

          <div className="flex flex-col items-center text-center relative z-10">
            <div className="w-16 h-16 rounded-full bg-stone-900 text-white flex items-center justify-center mb-6 text-xl font-bold shadow-xl shadow-stone-200">1</div>
            <h3 className="text-xl font-bold text-stone-900 mb-2">Browse Profiles</h3>
            <p className="text-stone-500">Explore detailed profiles with photos, interests, and reviews.</p>
          </div>

          <div className="flex flex-col items-center text-center relative z-10">
            <div className="w-16 h-16 rounded-full bg-stone-900 text-white flex items-center justify-center mb-6 text-xl font-bold shadow-xl shadow-stone-200">2</div>
            <h3 className="text-xl font-bold text-stone-900 mb-2">Book a Time</h3>
            <p className="text-stone-500">Select a date, time, and duration that fits your schedule.</p>
          </div>

          <div className="flex flex-col items-center text-center relative z-10">
            <div className="w-16 h-16 rounded-full bg-stone-900 text-white flex items-center justify-center mb-6 text-xl font-bold shadow-xl shadow-stone-200">3</div>
            <h3 className="text-xl font-bold text-stone-900 mb-2">Meet & Enjoy</h3>
            <p className="text-stone-500">Meet your companion at the public venue and enjoy the company.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full bg-rose-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-stone-900">Stories from our community</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-rose-100">
              <div className="flex gap-1 text-yellow-500 mb-6">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-stone-600 mb-6 leading-relaxed">"I needed a plus-one for my sister's wedding. Arjun was the perfect gentleman, danced well, and charmed everyone."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center font-bold text-rose-600">P</div>
                <div>
                  <p className="font-semibold text-sm text-stone-900">Priya S.</p>
                  <p className="text-xs text-stone-500">Mumbai</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-rose-100">
              <div className="flex gap-1 text-yellow-500 mb-6">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-stone-600 mb-6 leading-relaxed">"Sometimes you just want to talk about movies without judgment. It was refreshing to have such a genuine conversation."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center font-bold text-rose-600">R</div>
                <div>
                  <p className="font-semibold text-sm text-stone-900">Rohan K.</p>
                  <p className="text-xs text-stone-500">Delhi</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-rose-100">
              <div className="flex gap-1 text-yellow-500 mb-6">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-stone-600 mb-6 leading-relaxed">"I was new to the city and lonely. Booking a city tour companion helped me find my favorite cafe spots."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center font-bold text-rose-600">A</div>
                <div>
                  <p className="font-semibold text-sm text-stone-900">Ananya M.</p>
                  <p className="text-xs text-stone-500">Bangalore</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-24 px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-stone-900">Frequently Asked Questions</h2>

        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-stone-200">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-stone-900">
              <HelpCircle className="w-5 h-5 text-stone-400" /> Is this a dating app?
            </h3>
            <p className="text-stone-600 pl-7">No. RentalByf is strictly for platonic companionship. Romantic or sexual advances are strictly prohibited and will result in a ban.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-stone-900">
              <Shield className="w-5 h-5 text-stone-400" /> Is it safe?
            </h3>
            <p className="text-stone-600 pl-7">Yes. We verify the identity of every companion. All meetups must happen in public places. Use our platform for all bookings to ensure safety tracking.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-stone-900">
              <Calendar className="w-5 h-5 text-stone-400" /> Can I cancel a booking?
            </h3>
            <p className="text-stone-600 pl-7">Yes, you can cancel up to 24 hours before the scheduled time for a full refund.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-32 bg-stone-900 text-white text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to find your companion?</h2>
        <p className="text-stone-400 text-xl max-w-2xl mx-auto mb-10">Join thousands of users who have found friendship, support, and great company.</p>
        <Link href="/browse" className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-stone-900 rounded-full font-bold text-lg hover:bg-stone-100 transition-colors">
          Get Started Now
        </Link>
      </section>
    </div>
  );
}
