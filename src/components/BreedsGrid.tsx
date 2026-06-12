'use client'
import { useState } from 'react'
import type { Breed } from '@/data/breeds'
import { BreedCard } from '@/components/BreedCard'

type BreedWithPhoto = Breed & { photoUrl: string }

const GROUPS = ['All', 'Herding', 'Hound', 'Non-Sporting', 'Sporting', 'Terrier', 'Toy', 'Working']
const SIZES = ['All', 'Small', 'Medium', 'Large', 'Giant']

export function BreedsGrid({ breeds }: { breeds: BreedWithPhoto[] }) {
  const [search, setSearch] = useState('')
  const [group, setGroup] = useState('All')
  const [size, setSize] = useState('All')

  const filtered = breeds.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase())
    const matchesGroup = group === 'All' || b.group === group
    const matchesSize = size === 'All' || b.size === size
    return matchesSearch && matchesGroup && matchesSize
  })

  return (
    <>
      <div className="flex flex-col gap-4 mb-8">
        <input
          type="search"
          placeholder="Search breeds..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full md:w-80 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-500 self-center mr-1">Group:</span>
          {GROUPS.map(g => (
            <button
              key={g}
              onClick={() => setGroup(g)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${group === g ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {g}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-500 self-center mr-1">Size:</span>
          {SIZES.map(s => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${size === s ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {s}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-500">{filtered.length} breed{filtered.length !== 1 ? 's' : ''}</p>
      </div>
      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center py-16">No breeds match your search.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(b => (
            <BreedCard key={b.slug} breed={b} photoUrl={b.photoUrl} />
          ))}
        </div>
      )}
    </>
  )
}
