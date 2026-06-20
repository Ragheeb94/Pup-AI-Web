import Image from 'next/image'
import Link from 'next/link'
import { breeds } from '@/data/breeds'
import { getBreedPhotoUrl } from '@/lib/dogs'
import { BreedCard } from '@/components/BreedCard'

const FEATURES = [
  {
    title: 'Identify Any Dog in Seconds',
    description: 'Point your camera at any dog and get the breed name, confidence score, and personality traits before you can even ask the owner. Works on 200+ breeds, mixed breeds included.',
    imageSrc: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800',
    imageAlt: 'Dog being scanned with Pup AI',
  },
  {
    title: 'Personalised Care Guides',
    description: "Every breed has completely different needs. After a scan you get tailored feeding schedules, grooming tips, and health advice based on your dog's breed and size, not generic advice.",
    imageSrc: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800',
    imageAlt: 'Dog owner reading care guide',
    reverse: true,
  },
  {
    title: 'Health Scanner',
    description: "Photograph your dog's coat, eyes, or skin and get an instant assessment. The health scanner helps you spot potential issues early and decide whether a vet visit is needed.",
    imageSrc: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800',
    imageAlt: 'Dog health scan',
  },
  {
    title: 'Lost Dog Finder',
    description: 'Found a dog and do not know who it belongs to? Scan it to get the breed, then search local lost dog reports in seconds. You could reunite a dog with its family today.',
    imageSrc: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800',
    imageAlt: 'Lost dog being helped',
    reverse: true,
  },
  {
    title: 'Bark Analyzer',
    description: 'Record a few seconds of your dog barking and find out what they are trying to tell you. Playful, anxious, alert, or demanding attention — now you will always know.',
    imageSrc: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800',
    imageAlt: 'Dog barking happily',
  },
]

const REVIEWS = [
  { text: "I pointed this at a random dog at the park and it nailed the breed straight away. Even knew it was a mix. My kids think I'm a genius now.", author: 'Sarah M.', stars: 5 },
  { text: "The care guides actually changed how I feed my dog. I had no idea Golden Retrievers needed that much exercise. Really useful app.", author: 'James T.', stars: 5 },
  { text: 'I found a stray and had no idea what breed it was. Pup AI identified it in seconds and helped me track down the owner through the lost dog feature.', author: 'Rachel K.', stars: 5 },
]

const POPULAR_SLUGS = ['golden-retriever', 'labrador-retriever', 'french-bulldog', 'german-shepherd', 'beagle', 'pug']

export default async function HomePage() {
  const popularBreeds = POPULAR_SLUGS.map(slug => breeds.find(b => b.slug === slug)).filter(Boolean) as typeof breeds
  const photos = await Promise.all(popularBreeds.map(b => getBreedPhotoUrl(b.dogCeoBreedPath)))

  return (
    <>
      <section className="bg-amber-50/40 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20 flex flex-col md:flex-row items-center gap-12">
          {/* Left content column */}
          <div className="flex-1 text-center md:text-left z-10">
            {/* Brand label */}
            <p className="text-amber-500 font-semibold text-sm mb-3">🐾 Pup AI</p>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-5">
              Dog Expert<br /><span className="text-amber-500">in Your Pocket</span>
            </h1>

            {/* Subtext */}
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto md:mx-0">
              Point your camera at any dog — instantly identify the breed, personality traits, and care needs.
            </p>

            {/* Store badges + CTA */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-8">
              {/* App Store badge */}
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-900 text-white pl-3 pr-5 py-2.5 rounded-xl hover:bg-gray-800 transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 flex-shrink-0">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="flex flex-col leading-tight text-left">
                  <span className="text-[9px] text-gray-300 uppercase tracking-wide">Download on the</span>
                  <span className="text-sm font-bold">App Store</span>
                </div>
              </a>

              {/* Google Play badge */}
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-900 text-white pl-3 pr-5 py-2.5 rounded-xl hover:bg-gray-800 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 flex-shrink-0" fill="none">
                  <path d="M4 2.5L20 12 4 21.5V2.5Z" fill="#34A853"/>
                  <path d="M4 2.5L13.5 12 4 21.5V2.5Z" fill="#00C4FF"/>
                  <path d="M13.5 12L20 12 4 21.5L13.5 12Z" fill="#FFBC00"/>
                  <path d="M4 2.5L13.5 12 20 12L4 2.5Z" fill="#FF3D00"/>
                </svg>
                <div className="flex flex-col leading-tight text-left">
                  <span className="text-[9px] text-gray-300 uppercase tracking-wide">GET IT ON</span>
                  <span className="text-sm font-bold">Google Play</span>
                </div>
              </a>

              {/* Try Free Online */}
              <Link
                href="/scan"
                className="inline-flex items-center bg-amber-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-amber-600 transition-colors"
              >
                Try Free Online
              </Link>
            </div>

            {/* Social proof row */}
            <div className="flex gap-6 justify-center md:justify-start">
              <div className="flex items-center gap-2">
                <span className="text-lg">🏅</span>
                <div>
                  <p className="text-amber-500 font-bold text-sm leading-tight">10K+</p>
                  <p className="text-gray-500 text-xs">5-Star Reviews</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">🏅</span>
                <div>
                  <p className="text-amber-500 font-bold text-sm leading-tight">200+</p>
                  <p className="text-gray-500 text-xs">Breeds Covered</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right phone mockups column */}
          <div className="flex-1 relative h-[440px] md:h-[500px] flex items-center justify-center">
            {/* Back phone — results page */}
            <div className="absolute right-0 md:right-4 top-6 w-44 md:w-52 h-[360px] md:h-[420px] rounded-[32px] border-[7px] border-gray-800 bg-black shadow-2xl overflow-hidden rotate-3 opacity-90">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-gray-800 rounded-b-xl z-10" />
              {/* Background image */}
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400"
                  alt="Golden Retriever result"
                  fill
                  className="object-cover"
                  sizes="220px"
                />
              </div>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/75" />
              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 right-0 px-3 pb-4">
                <p className="text-white font-bold text-sm">Golden Retriever</p>
                <span className="inline-block bg-amber-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1">98% match</span>
              </div>
            </div>

            {/* Front phone — scan screen */}
            <div className="relative z-10 w-48 md:w-56 h-[380px] md:h-[450px] rounded-[36px] border-[8px] border-gray-900 bg-black shadow-2xl overflow-hidden -rotate-2 -translate-x-6 md:-translate-x-12">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-gray-900 rounded-b-xl z-10" />
              {/* Background image */}
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400"
                  alt="Dog scan viewfinder"
                  fill
                  className="object-cover"
                  priority
                  sizes="240px"
                />
              </div>
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/35" />
              {/* Corner bracket frame */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-28 h-28">
                  {/* Top-left */}
                  <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-white rounded-tl" />
                  {/* Top-right */}
                  <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-white rounded-tr" />
                  {/* Bottom-left */}
                  <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-white rounded-bl" />
                  {/* Bottom-right */}
                  <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-white rounded-br" />
                  {/* Hint text */}
                  <p className="absolute inset-0 flex items-center justify-center text-white text-[9px] text-center leading-tight px-2">
                    Place the dog in focus
                  </p>
                </div>
              </div>
              {/* Shutter button bar */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-black/70 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-amber-500" />
                </div>
              </div>
            </div>

            {/* Floating tooltip bubble */}
            <div className="absolute bottom-12 left-0 z-20">
              <div className="bg-white rounded-2xl shadow-2xl p-3 flex items-center gap-3 w-52">
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 relative">
                  <Image
                    src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=80"
                    alt="Golden Retriever thumbnail"
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <p className="text-gray-700 text-xs leading-snug">
                  This dog is a <span className="text-amber-500 font-bold">Golden Retriever!</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-gray-200" />

      {FEATURES.map((f) => (
        <section key={f.title} className="max-w-6xl mx-auto px-4 py-16">
          <div className={`flex flex-col md:flex-row items-center gap-12 ${f.reverse ? 'md:flex-row-reverse' : ''}`}>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{f.title}</h2>
              <p className="text-lg text-gray-600 leading-relaxed">{f.description}</p>
            </div>
            <div className="flex-1 relative h-72 md:h-96 w-full rounded-3xl overflow-hidden bg-amber-50">
              <Image src={f.imageSrc} alt={f.imageAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
        </section>
      ))}

      <section className="bg-surface py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Popular Breeds</h2>
            <Link href="/breeds" className="text-primary font-semibold text-sm hover:underline">View all breeds →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularBreeds.map((breed, i) => (
              <BreedCard key={breed.slug} breed={breed} photoUrl={photos[i]} />
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What Dog Owners Are Saying</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map(r => (
            <div key={r.author} className="bg-white border border-gray-200 rounded-2xl p-6">
              <p className="text-amber-400 text-lg mb-3">{'★'.repeat(r.stars)}</p>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">&quot;{r.text}&quot;</p>
              <p className="text-gray-500 text-xs font-medium">{r.author}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-3">Try Pup AI Free</h2>
          <p className="text-amber-100 text-lg mb-8">Available on iOS and Android. No account needed to get started.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer"
              className="bg-white text-gray-900 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              App Store
            </a>
            <a href="https://play.google.com" target="_blank" rel="noopener noreferrer"
              className="bg-white text-gray-900 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Google Play
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
