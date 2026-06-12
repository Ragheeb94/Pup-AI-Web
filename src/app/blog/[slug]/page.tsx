import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPost } from '@/lib/blog'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost(params.slug)
  if (!post) return {}
  return { title: post.title, description: post.excerpt, openGraph: { title: post.title, description: post.excerpt } }
}

export default async function BlogPostPage({ params }: Props) {
  const post = getPost(params.slug)
  if (!post) notFound()

  return (
    <article className="max-w-2xl mx-auto px-4 py-12">
      <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6 inline-block">← Back to Blog</Link>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-3">{post.title}</h1>
      <p className="text-gray-400 text-sm mb-8">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
      <div className="relative h-72 w-full rounded-2xl overflow-hidden mb-10">
        <Image src={post.coverImage} alt={post.title} fill className="object-cover" sizes="(max-width: 672px) 100vw, 672px" priority />
      </div>
      <div className="prose prose-gray max-w-none">
        <MDXRemote source={post.content} />
      </div>
      <div className="mt-16 bg-primary rounded-2xl p-6 text-center">
        <p className="text-white font-bold text-xl mb-1">Try Pup AI Free</p>
        <p className="text-amber-100 text-sm mb-4">Identify any dog breed in seconds with our free scanner.</p>
        <Link href="/scan" className="bg-white text-gray-900 font-semibold px-6 py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-colors inline-block">
          Scan a Dog Now
        </Link>
      </div>
    </article>
  )
}
