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
      <section className="bg-gradient-to-br from-amber-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
              Identify Any Dog<br /><span className="text-primary">in Seconds</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-md">
              Point your camera at any dog and instantly know the breed, traits, and care needs. Works on 200+ breeds.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer"
                className="bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors">
                App Store
              </a>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer"
                className="bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors">
                Google Play
              </a>
              <Link href="/scan"
                className="bg-primary text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors">
                Try Free Online
              </Link>
            </div>
          </div>
          <div className="flex-1 relative h-80 md:h-[460px] w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800"
              alt="Happy dog identified by Pup AI"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="bg-surface border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-3 gap-4 text-center">
          {[
            { value: '200+', label: 'Breeds in our encyclopedia' },
            { value: '4.8★', label: 'Rating on the App Store' },
            { value: 'Free', label: 'To try, no account needed' },
          ].map(stat => (
            <div key={stat.label}>
              <p className="text-3xl font-extrabold text-primary">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

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
