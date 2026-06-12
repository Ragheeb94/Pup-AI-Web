'use client'
import { useState, useRef, useCallback } from 'react'

const RAILWAY_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? ''
const SCAN_LIMIT = 2
const STORAGE_KEY = 'pup_web_scans_used'

interface ScanResult {
  is_dog: boolean
  breed_primary: string | null
  confidence: number
  breed_alternatives: string[]
  traits: string[]
}

type State = 'idle' | 'loading' | 'result' | 'error'

function getScansUsed(): number {
  try {
    return parseInt(localStorage.getItem(STORAGE_KEY) ?? '0', 10)
  } catch {
    return 0
  }
}

function incrementScansUsed(): void {
  try {
    localStorage.setItem(STORAGE_KEY, String(getScansUsed() + 1))
  } catch {}
}

export function Scanner() {
  const [state, setState] = useState<State>('idle')
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<ScanResult | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [showLimitModal, setShowLimitModal] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const processFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please upload an image file (JPG, PNG, or WebP).')
      setState('error')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('Photo is too large. Please use a file under 10MB.')
      setState('error')
      return
    }

    const reader = new FileReader()
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string
      setPreview(dataUrl)
      setState('loading')
      const base64 = dataUrl.split(',')[1]

      try {
        const res = await fetch(`${RAILWAY_URL}/identify/web`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image_base64: base64 }),
        })

        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          setErrorMsg(res.status === 403
            ? 'Daily scan limit reached. Download the app for unlimited scans.'
            : (data?.message ?? 'Something went wrong. Try again in a moment.'))
          setState('error')
          return
        }

        const data: ScanResult = await res.json()

        if (!data.is_dog) {
          setErrorMsg("That doesn't look like a dog. Try a clearer photo with the dog as the main subject.")
          setState('error')
          return
        }

        incrementScansUsed()
        setResult(data)
        setState('result')
        if (getScansUsed() >= SCAN_LIMIT) setShowLimitModal(true)
      } catch {
        setErrorMsg('Something went wrong. Check your connection and try again.')
        setState('error')
      }
    }
    reader.readAsDataURL(file)
  }, [])

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) processFile(file)
  }

  const reset = () => {
    setState('idle')
    setPreview(null)
    setResult(null)
    setErrorMsg('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const confidencePct = result ? Math.round(result.confidence * 100) : 0
  const breedSlug = result?.breed_primary?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') ?? ''

  return (
    <div className="max-w-xl mx-auto">
      {state === 'idle' && (
        <div
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-3xl p-16 text-center cursor-pointer hover:border-primary hover:bg-amber-50 transition-colors"
        >
          <div className="text-5xl mb-4">🐾</div>
          <p className="text-gray-700 font-semibold text-lg mb-1">Drop a photo or click to upload</p>
          <p className="text-gray-400 text-sm">JPG, PNG or WebP up to 10MB</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={e => { const f = e.target.files?.[0]; if (f) processFile(f) }}
            className="hidden"
          />
          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-primary-dark transition-colors"
              onClick={e => { e.stopPropagation(); fileInputRef.current?.click() }}
            >
              Choose Photo
            </button>
          </div>
          <p className="text-gray-400 text-xs mt-4">{SCAN_LIMIT} free scans · No account needed</p>
        </div>
      )}

      {state === 'loading' && (
        <div className="text-center py-16">
          {preview && (
            <div className="relative w-48 h-48 mx-auto rounded-2xl overflow-hidden mb-6">
              <img src={preview} alt="Uploaded dog" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-600 font-medium">Identifying breed...</p>
        </div>
      )}

      {state === 'result' && result && (
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
          {preview && (
            <div className="relative h-64 w-full">
              <img src={preview} alt="Scanned dog" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <h2 className="text-2xl font-extrabold text-white">{result.breed_primary}</h2>
                <span className="bg-primary text-white text-sm font-bold px-3 py-1 rounded-full">{confidencePct}% match</span>
              </div>
            </div>
          )}
          <div className="p-5">
            {result.traits.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {result.traits.map(t => (
                  <span key={t} className="bg-amber-50 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full">{t}</span>
                ))}
              </div>
            )}
            {result.breed_alternatives.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-gray-500 font-medium mb-2">Could also be</p>
                <div className="flex flex-wrap gap-2">
                  {result.breed_alternatives.map(b => (
                    <span key={b} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">{b}</span>
                  ))}
                </div>
              </div>
            )}
            <div className="flex flex-col gap-2 mt-4">
              <a href={`/breeds/${breedSlug}`}
                className="w-full bg-surface border border-gray-200 text-gray-900 font-semibold text-sm py-3 rounded-xl text-center hover:bg-gray-100 transition-colors">
                View Breed Profile
              </a>
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer"
                className="w-full bg-primary text-white font-semibold text-sm py-3 rounded-xl text-center hover:bg-primary-dark transition-colors">
                Get the App for Full Analysis
              </a>
            </div>
            <button onClick={reset} className="w-full text-center text-gray-400 text-sm mt-4 hover:text-gray-600 transition-colors">
              Scan another dog
            </button>
          </div>
        </div>
      )}

      {state === 'error' && (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🐕</div>
          <p className="text-gray-700 font-semibold mb-2">Oops</p>
          <p className="text-gray-500 text-sm mb-6">{errorMsg}</p>
          <button onClick={reset} className="bg-primary text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-primary-dark transition-colors">
            Try Again
          </button>
        </div>
      )}

      {showLimitModal && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowLimitModal(false)} />
          <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
            <p className="text-2xl mb-2">🐾</p>
            <h3 className="text-xl font-bold text-gray-900 mb-2">You&apos;ve used your {SCAN_LIMIT} free scans</h3>
            <p className="text-gray-600 text-sm mb-6">Download the app for unlimited scanning, breed mix detection, age estimation and more.</p>
            <div className="flex flex-col gap-2">
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer"
                className="bg-gray-900 text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition-colors">App Store</a>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer"
                className="bg-gray-900 text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition-colors">Google Play</a>
              <button onClick={() => setShowLimitModal(false)} className="text-gray-400 text-sm mt-2 hover:text-gray-600 transition-colors">
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
