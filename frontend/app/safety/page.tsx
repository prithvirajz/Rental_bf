import { Shield, Lock, AlertTriangle } from 'lucide-react';

export default function SafetyPage() {
    return (
        <div className="flex flex-col items-center">
            <section className="w-full max-w-4xl mx-auto px-6 py-20">
                <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center text-stone-900">Trust & Safety</h1>
                <p className="text-xl text-stone-500 text-center max-w-2xl mx-auto mb-20">
                    Your safety is our absolute priority. Here is how we keep RentalByf secure.
                </p>

                <div className="space-y-8">
                    <div className="p-8 rounded-3xl bg-white border border-stone-100 shadow-sm flex gap-6">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                            <Shield className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-stone-900 mb-2">Verified Profiles</h3>
                            <p className="text-stone-600 leading-relaxed">
                                Every companion on our platform undergoes a mandatory ID verification and background check process. We manually review every profile.
                            </p>
                        </div>
                    </div>

                    <div className="p-8 rounded-3xl bg-white border border-stone-100 shadow-sm flex gap-6">
                        <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 shrink-0">
                            <Lock className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-stone-900 mb-2">Strictly Platonic</h3>
                            <p className="text-stone-600 leading-relaxed">
                                RentalByf is NOT a dating app. Any form of sexual advances or romantic expectations will result in an immediate and permanent ban.
                            </p>
                        </div>
                    </div>

                    <div className="p-8 rounded-3xl bg-white border border-stone-100 shadow-sm flex gap-6">
                        <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600 shrink-0">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-stone-900 mb-2">Public Places Only</h3>
                            <p className="text-stone-600 leading-relaxed">
                                All meetups must occur in public locations (cafes, cinemas, malls). Private residences or hotel rooms are strictly prohibited.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
