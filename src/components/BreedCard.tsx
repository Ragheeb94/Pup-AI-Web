import Image from 'next/image'
import Link from 'next/link'
import type { Breed } from '@/data/breeds'

interface Props {
  breed: Breed
  photoUrl: string
}

export function BreedCard({ breed, photoUrl }: Props) {
  return (
    <Link href={`/breeds/${breed.slug}`} className="group block bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-gray-100">
        <Image
          src={photoUrl}
          alt={breed.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
      <div className="p-3">
        <p className="font-semibold text-gray-900 text-sm truncate">{breed.name}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs bg-primary-light text-amber-800 font-medium px-2 py-0.5 rounded-full">{breed.size}</span>
          <span className="text-xs text-gray-500">{breed.group}</span>
        </div>
      </div>
    </Link>
  )
}
