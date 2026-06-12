import type { Metadata } from 'next'
import { breeds } from '@/data/breeds'
import { getBreedPhotoUrl } from '@/lib/dogs'
import { BreedsGrid } from '@/components/BreedsGrid'

export const metadata: Metadata = {
  title: 'Dog Breed Encyclopedia',
  description: `Browse all ${breeds.length}+ dog breeds with photos, traits, care guides, and health info. Filter by size and group.`,
}

export default async function BreedsPage() {
  const photos = await Promise.all(breeds.map(b => getBreedPhotoUrl(b.dogCeoBreedPath)))
  const breedsWithPhotos = breeds.map((b, i) => ({ ...b, photoUrl: photos[i] }))

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Dog Breed Encyclopedia</h1>
      <p className="text-gray-600 text-lg mb-8">{breeds.length}+ breeds with photos, traits, and care guides.</p>
      <BreedsGrid breeds={breedsWithPhotos} />
    </div>
  )
}
