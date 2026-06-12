import Link from 'next/link'

export function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-gray-900 text-lg">
          <span className="text-2xl">🐾</span>
          <span>Pup AI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/breeds" className="hover:text-gray-900 transition-colors">Breeds</Link>
          <Link href="/scan" className="hover:text-gray-900 transition-colors">Scan</Link>
          <Link href="/blog" className="hover:text-gray-900 transition-colors">Blog</Link>
        </nav>
        <a
          href="https://apps.apple.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-primary-dark transition-colors"
        >
          Download App
        </a>
      </div>
    </header>
  )
}
