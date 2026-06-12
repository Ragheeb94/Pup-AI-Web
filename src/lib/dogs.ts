const DOG_CEO_BASE = 'https://dog.ceo/api'

export async function getBreedPhotoUrl(breedPath: string): Promise<string> {
  try {
    const res = await fetch(`${DOG_CEO_BASE}/breed/${breedPath}/images/random`, {
      next: { revalidate: 86400 },
    })
    if (!res.ok) throw new Error(`Dog CEO API error: ${res.status}`)
    const data = await res.json() as { message: string; status: string }
    return data.message
  } catch {
    const fallback = await fetch(`${DOG_CEO_BASE}/breeds/image/random`, {
      next: { revalidate: 86400 },
    })
    const data = await fallback.json() as { message: string }
    return data.message
  }
}

export async function getBreedPhotoUrls(breedPath: string, count = 3): Promise<string[]> {
  try {
    const res = await fetch(`${DOG_CEO_BASE}/breed/${breedPath}/images/random/${count}`, {
      next: { revalidate: 86400 },
    })
    if (!res.ok) throw new Error(`Dog CEO API error: ${res.status}`)
    const data = await res.json() as { message: string[]; status: string }
    return data.message
  } catch {
    const url = await getBreedPhotoUrl(breedPath)
    return [url]
  }
}
