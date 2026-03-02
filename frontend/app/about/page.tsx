export default function AboutPage() {
    return (
        <div className="flex flex-col items-center">
            {/* Hero */}
            <section className="relative w-full py-32 flex flex-col items-center text-center px-6 overflow-hidden">
                <div className="absolute inset-0 bg-stone-50 pointer-events-none" />
                <h1 className="relative text-5xl md:text-7xl font-bold mb-8 text-stone-900">
                    About RentalByf
                </h1>
                <p className="relative text-xl text-stone-500 max-w-2xl leading-relaxed">
                    We are redefining companionship in the modern digital age. strictly platonic, deeply human, and always safe.
                </p>
            </section>

            {/* Mission */}
            <section className="w-full max-w-4xl mx-auto px-6 py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-stone-900">Our Mission</h2>
                        <p className="text-stone-600 leading-relaxed">
                            Loneliness is an epidemic. Our goal is to provide a safe, trusted platform where people can find genuine company for coffee, movies, weddings, or city tours without the pressure of dating apps.
                        </p>
                    </div>
                    <div className="h-64 rounded-3xl bg-white border border-stone-100 shadow-sm flex items-center justify-center p-8">
                        <div className="text-center">
                            <h3 className="text-4xl font-bold text-stone-900 mb-2">10k+</h3>
                            <p className="text-stone-500">Happy hours shared</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
