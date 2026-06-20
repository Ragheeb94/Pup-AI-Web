import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="text-white font-bold text-lg flex items-center gap-2 mb-2">
            <span>🐾</span> Pup AI
          </div>
          <p className="text-sm">Know your dog better.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3 text-sm">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/breeds" className="hover:text-white transition-colors">Breed Encyclopedia</Link></li>
            <li><Link href="/scan" className="hover:text-white transition-colors">Scan a Dog</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3 text-sm">Get the App</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">App Store</a></li>
            <li><a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Google Play</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3 text-sm">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 text-center py-4 text-xs text-gray-600">
        © {new Date().getFullYear()} Pup AI. All rights reserved.
      </div>
    </footer>
  )
}
