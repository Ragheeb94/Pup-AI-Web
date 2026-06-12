import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Dog breed guides, care tips, and expert advice from the Pup AI team.',
}

export default function BlogPage() {
  const posts = getAllPosts()
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">The Pup AI Blog</h1>
      <p className="text-gray-600 text-lg mb-10">Dog breed guides, care tips, and everything in between.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-48 bg-gray-100">
              <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-400 mb-2">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              <h2 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h2>
              <p className="text-gray-500 text-xs line-clamp-2">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
