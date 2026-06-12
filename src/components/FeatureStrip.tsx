import Image from 'next/image'

interface Props {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  reverse?: boolean
}

export function FeatureStrip({ title, description, imageSrc, imageAlt, reverse = false }: Props) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className={`flex flex-col md:flex-row items-center gap-12 ${reverse ? 'md:flex-row-reverse' : ''}`}>
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
        </div>
        <div className="flex-1 relative h-72 md:h-96 w-full rounded-3xl overflow-hidden bg-amber-50">
          <Image src={imageSrc} alt={imageAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
      </div>
    </section>
  )
}
