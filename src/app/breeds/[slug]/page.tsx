import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { breeds } from '@/data/breeds'
import { getBreedPhotoUrl } from '@/lib/dogs'
import { ScoreBar } from '@/components/ScoreBar'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return breeds.map(b => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const breed = breeds.find(b => b.slug === params.slug)
  if (!breed) return {}
  return {
    title: `${breed.name} — Breed Info, Traits and Care Guide`,
    description: breed.description,
    openGraph: { title: breed.name, description: breed.description },
  }
}

export default async function BreedPage({ params }: Props) {
  const breed = breeds.find(b => b.slug === params.slug)
  if (!breed) notFound()

  const heroPhoto = await getBreedPhotoUrl(breed.dogCeoBreedPath)
  const related = breeds.filter(b => b.group === breed.group && b.slug !== breed.slug).slice(0, 3)
  const relatedPhotos = await Promise.all(related.map(b => getBreedPhotoUrl(b.dogCeoBreedPath)))

  const SCORE_LABELS: Record<string, string> = {
    friendliness: 'Friendliness',
    energy: 'Energy Level',
    trainability: 'Trainability',
    shedding: 'Shedding',
    kidFriendly: 'Good with Kids',
    apartmentFriendly: 'Apartment Friendly',
  }

  return (
    <div>
      <div className="relative h-72 md:h-96 w-full">
        <Image src={heroPhoto} alt={breed.name} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h1 className="text-4xl font-extrabold mb-2">{breed.name}</h1>
          <div className="flex gap-2">
            <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">{breed.size}</span>
            <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">{breed.group}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { label: 'Lifespan', value: breed.lifespan },
            { label: 'Weight', value: breed.weight },
            { label: 'Height', value: breed.height },
          ].map(stat => (
            <div key={stat.label} className="bg-surface border border-gray-200 rounded-xl px-4 py-2 text-sm">
              <span className="text-gray-500">{stat.label}: </span>
              <span className="font-semibold text-gray-900">{stat.value}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {breed.traits.map(t => (
            <span key={t} className="bg-primary-light text-amber-800 text-sm font-medium px-3 py-1 rounded-full">{t}</span>
          ))}
        </div>

        <p className="text-gray-700 text-lg leading-relaxed mb-10">{breed.description}</p>

        <div className="grid md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h3 className="font-bold text-gray-900 mb-3">Care</h3>
            <p className="text-sm text-gray-600 mb-2"><span className="font-medium">Feeding:</span> {breed.care.feeding}</p>
            <p className="text-sm text-gray-600 mb-2"><span className="font-medium">Grooming:</span> {breed.care.grooming}</p>
            <p className="text-sm text-gray-600"><span className="font-medium">Exercise:</span> {breed.care.exercise}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h3 className="font-bold text-gray-900 mb-3">Health</h3>
            <p className="text-sm text-gray-600 mb-2"><span className="font-medium">Lifespan:</span> {breed.health.lifespan}</p>
            <div className="flex flex-col gap-1">
              {breed.health.commonConditions.map(c => (
                <span key={c} className="text-sm text-gray-600 before:content-['•'] before:mr-1 before:text-primary">{c}</span>
              ))}
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h3 className="font-bold text-gray-900 mb-3">Personality</h3>
            <div className="flex flex-col gap-1">
              {breed.traits.map(t => (
                <span key={t} className="text-sm text-gray-600 before:content-['•'] before:mr-1 before:text-primary">{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-10">
          <h3 className="font-bold text-gray-900 mb-5">Breed Scores</h3>
          <div className="flex flex-col gap-4">
            {Object.entries(breed.scores).map(([key, value]) => (
              <ScoreBar key={key} label={SCORE_LABELS[key] ?? key} value={value} />
            ))}
          </div>
        </div>

        <div className="bg-primary rounded-2xl p-6 text-center mb-10">
          <p className="text-white font-bold text-xl mb-1">Is your dog a {breed.name}?</p>
          <p className="text-amber-100 text-sm mb-4">Find out for sure with a free scan.</p>
          <Link href="/scan" className="bg-white text-gray-900 font-semibold px-6 py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-colors inline-block">
            Scan Your Dog Free
          </Link>
        </div>

        {related.length > 0 && (
          <div>
            <h3 className="font-bold text-gray-900 text-xl mb-4">Similar Breeds</h3>
            <div className="grid grid-cols-3 gap-4">
              {related.map((b, i) => (
                <Link key={b.slug} href={`/breeds/${b.slug}`} className="group block rounded-2xl overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="relative h-32 bg-gray-100">
                    <Image src={relatedPhotos[i]} alt={b.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="33vw" />
                  </div>
                  <div className="p-2 text-center">
                    <p className="text-sm font-semibold text-gray-900">{b.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
