import type { Metadata } from 'next'
import { Scanner } from '@/components/Scanner'

export const metadata: Metadata = {
  title: 'Scan a Dog — Free Breed Identifier',
  description: 'Upload a photo of any dog and instantly identify the breed. Free, no account needed. Works on 200+ breeds.',
}

export default function ScanPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Scan a Dog</h1>
        <p className="text-gray-600 text-lg">Upload a photo and identify the breed instantly. Free, no account needed.</p>
      </div>
      <Scanner />
    </div>
  )
}
