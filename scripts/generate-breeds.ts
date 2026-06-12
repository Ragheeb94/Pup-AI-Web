#!/usr/bin/env tsx
/**
 * One-time script to generate src/data/breeds.ts
 * Run: npx tsx scripts/generate-breeds.ts
 */
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

type Size = 'Small' | 'Medium' | 'Large' | 'Giant'
type Group = 'Sporting' | 'Hound' | 'Working' | 'Terrier' | 'Toy' | 'Non-Sporting' | 'Herding' | 'Miscellaneous'

interface BreedSeed {
  name: string
  slug: string
  group: Group
  size: Size
  lifespan: string
  weight: string
  height: string
  dogCeoBreedPath: string
  descriptionOverride?: string
  traitsOverride?: string[]
}

const GROUP_DESCRIPTIONS: Record<Group, (name: string) => string> = {
  Sporting: (name) => `The ${name} is an energetic, friendly sporting dog originally bred to assist hunters in the field. They thrive with regular exercise and make devoted, enthusiastic family companions.`,
  Hound: (name) => `The ${name} is a determined scent or sight hound bred for tracking and hunting. Loyal and affectionate at home, they have strong instincts and need consistent daily exercise.`,
  Working: (name) => `The ${name} is a powerful, intelligent working dog bred to perform jobs like guarding, pulling sleds, or water rescue. They are loyal and capable but need an experienced owner.`,
  Terrier: (name) => `The ${name} is a spirited, tenacious terrier with plenty of personality packed into its frame. They are feisty, affectionate, and surprisingly brave for their size.`,
  Toy: (name) => `The ${name} is a compact, charming toy breed that thrives on human companionship. Despite their small size they have big personalities and adapt well to apartment living.`,
  'Non-Sporting': (name) => `The ${name} is a versatile, unique dog that defies easy categorisation. They come in a wide range of temperaments and make excellent companions for the right family.`,
  Herding: (name) => `The ${name} is a sharp, driven herding dog with exceptional intelligence and agility. They form strong bonds with their families and excel in dog sports and obedience training.`,
  Miscellaneous: (name) => `The ${name} is an increasingly popular breed known for its distinct look and loyal character. They are adaptable and form strong bonds with their families.`,
}

const GROUP_TRAITS: Record<Group, string[]> = {
  Sporting: ['Friendly', 'Active', 'Gentle'],
  Hound: ['Loyal', 'Independent', 'Curious'],
  Working: ['Loyal', 'Intelligent', 'Courageous'],
  Terrier: ['Feisty', 'Clever', 'Alert'],
  Toy: ['Affectionate', 'Lively', 'Playful'],
  'Non-Sporting': ['Adaptable', 'Alert', 'Devoted'],
  Herding: ['Intelligent', 'Energetic', 'Responsive'],
  Miscellaneous: ['Loyal', 'Curious', 'Playful'],
}

const GROUP_SCORES: Record<Group, Record<string, number>> = {
  Sporting:       { friendliness: 0.9, energy: 0.85, trainability: 0.9, shedding: 0.5, kidFriendly: 0.9, apartmentFriendly: 0.3 },
  Hound:          { friendliness: 0.75, energy: 0.7, trainability: 0.6, shedding: 0.5, kidFriendly: 0.75, apartmentFriendly: 0.4 },
  Working:        { friendliness: 0.7, energy: 0.75, trainability: 0.8, shedding: 0.5, kidFriendly: 0.65, apartmentFriendly: 0.2 },
  Terrier:        { friendliness: 0.75, energy: 0.8, trainability: 0.65, shedding: 0.3, kidFriendly: 0.7, apartmentFriendly: 0.65 },
  Toy:            { friendliness: 0.9, energy: 0.55, trainability: 0.7, shedding: 0.3, kidFriendly: 0.7, apartmentFriendly: 0.95 },
  'Non-Sporting': { friendliness: 0.75, energy: 0.55, trainability: 0.7, shedding: 0.5, kidFriendly: 0.7, apartmentFriendly: 0.65 },
  Herding:        { friendliness: 0.8, energy: 0.9, trainability: 0.95, shedding: 0.6, kidFriendly: 0.8, apartmentFriendly: 0.3 },
  Miscellaneous:  { friendliness: 0.75, energy: 0.65, trainability: 0.7, shedding: 0.4, kidFriendly: 0.7, apartmentFriendly: 0.6 },
}

const SIZE_APARTMENT: Record<Size, number> = { Small: 0.95, Medium: 0.55, Large: 0.2, Giant: 0.1 }

const SIZE_CARE: Record<Size, { feeding: string; exercise: string }> = {
  Small:  { feeding: 'Half to one cup of high-quality dry food per day, split into two meals.', exercise: '30 minutes of daily walks and indoor play is enough to keep them happy and healthy.' },
  Medium: { feeding: 'One to two cups of high-quality dry food per day, split into two meals.', exercise: 'An hour of daily exercise including a brisk walk and off-lead time will keep them well-balanced.' },
  Large:  { feeding: 'Two to three cups of high-quality dry food per day, split into two meals.', exercise: 'At least 90 minutes of vigorous activity daily, including running, hiking, or fetch sessions.' },
  Giant:  { feeding: 'Three to five cups of high-quality dry food per day, split across two to three meals.', exercise: 'Moderate daily exercise of 60 to 90 minutes. Avoid high-impact activity in puppies to protect developing joints.' },
}

const SEEDS: BreedSeed[] = [
  { name: 'Affenpinscher', slug: 'affenpinscher', group: 'Toy', size: 'Small', lifespan: '12-15 years', weight: '7-10 lbs', height: '9-11 inches', dogCeoBreedPath: 'affenpinscher' },
  { name: 'Afghan Hound', slug: 'afghan-hound', group: 'Hound', size: 'Large', lifespan: '12-18 years', weight: '50-60 lbs', height: '25-27 inches', dogCeoBreedPath: 'hound/afghan' },
  { name: 'Airedale Terrier', slug: 'airedale-terrier', group: 'Terrier', size: 'Large', lifespan: '11-14 years', weight: '50-70 lbs', height: '23 inches', dogCeoBreedPath: 'airedale' },
  { name: 'Akita', slug: 'akita', group: 'Working', size: 'Large', lifespan: '10-13 years', weight: '70-130 lbs', height: '24-28 inches', dogCeoBreedPath: 'akita' },
  { name: 'Alaskan Malamute', slug: 'alaskan-malamute', group: 'Working', size: 'Large', lifespan: '10-14 years', weight: '75-85 lbs', height: '23-25 inches', dogCeoBreedPath: 'malamute' },
  { name: 'Australian Cattle Dog', slug: 'australian-cattle-dog', group: 'Herding', size: 'Medium', lifespan: '12-16 years', weight: '35-50 lbs', height: '17-20 inches', dogCeoBreedPath: 'cattledog/australian' },
  { name: 'Australian Shepherd', slug: 'australian-shepherd', group: 'Herding', size: 'Medium', lifespan: '12-15 years', weight: '40-65 lbs', height: '18-23 inches', dogCeoBreedPath: 'australian/shepherd' },
  { name: 'Australian Terrier', slug: 'australian-terrier', group: 'Terrier', size: 'Small', lifespan: '11-15 years', weight: '14-16 lbs', height: '10-11 inches', dogCeoBreedPath: 'terrier/australian' },
  { name: 'Basenji', slug: 'basenji', group: 'Hound', size: 'Small', lifespan: '13-14 years', weight: '22-24 lbs', height: '16-17 inches', dogCeoBreedPath: 'basenji' },
  { name: 'Basset Hound', slug: 'basset-hound', group: 'Hound', size: 'Medium', lifespan: '12-13 years', weight: '40-65 lbs', height: '11-15 inches', dogCeoBreedPath: 'hound/basset', traitsOverride: ['Relaxed', 'Loyal', 'Patient'] },
  { name: 'Beagle', slug: 'beagle', group: 'Hound', size: 'Small', lifespan: '10-15 years', weight: '20-30 lbs', height: '13-15 inches', dogCeoBreedPath: 'beagle', traitsOverride: ['Curious', 'Friendly', 'Merry'] },
  { name: 'Belgian Malinois', slug: 'belgian-malinois', group: 'Herding', size: 'Large', lifespan: '14-16 years', weight: '40-80 lbs', height: '22-26 inches', dogCeoBreedPath: 'malinois', traitsOverride: ['Confident', 'Smart', 'Hardworking'] },
  { name: 'Bernese Mountain Dog', slug: 'bernese-mountain-dog', group: 'Working', size: 'Giant', lifespan: '7-10 years', weight: '70-115 lbs', height: '23-27 inches', dogCeoBreedPath: 'mountain/bernese', traitsOverride: ['Gentle', 'Calm', 'Affectionate'] },
  { name: 'Bichon Frise', slug: 'bichon-frise', group: 'Non-Sporting', size: 'Small', lifespan: '14-15 years', weight: '12-18 lbs', height: '9-11 inches', dogCeoBreedPath: 'frise/bichon', traitsOverride: ['Playful', 'Curious', 'Peppy'] },
  { name: 'Border Collie', slug: 'border-collie', group: 'Herding', size: 'Medium', lifespan: '12-15 years', weight: '30-55 lbs', height: '18-22 inches', dogCeoBreedPath: 'collie/border', traitsOverride: ['Intelligent', 'Energetic', 'Tenacious'] },
  { name: 'Boston Terrier', slug: 'boston-terrier', group: 'Non-Sporting', size: 'Small', lifespan: '11-13 years', weight: '12-25 lbs', height: '15-17 inches', dogCeoBreedPath: 'terrier/boston', traitsOverride: ['Friendly', 'Bright', 'Amusing'] },
  { name: 'Bouvier des Flandres', slug: 'bouvier-des-flandres', group: 'Herding', size: 'Large', lifespan: '10-12 years', weight: '70-110 lbs', height: '23-27 inches', dogCeoBreedPath: 'bouvier' },
  { name: 'Boxer', slug: 'boxer', group: 'Working', size: 'Large', lifespan: '10-12 years', weight: '50-80 lbs', height: '21-25 inches', dogCeoBreedPath: 'boxer', traitsOverride: ['Fun-Loving', 'Bright', 'Active'] },
  { name: 'Briard', slug: 'briard', group: 'Herding', size: 'Large', lifespan: '12 years', weight: '55-100 lbs', height: '22-27 inches', dogCeoBreedPath: 'briard' },
  { name: 'Bulldog', slug: 'bulldog', group: 'Non-Sporting', size: 'Medium', lifespan: '8-10 years', weight: '40-50 lbs', height: '14-15 inches', dogCeoBreedPath: 'bulldog/english', traitsOverride: ['Calm', 'Courageous', 'Friendly'] },
  { name: 'Bull Terrier', slug: 'bull-terrier', group: 'Terrier', size: 'Medium', lifespan: '12-13 years', weight: '50-70 lbs', height: '21-22 inches', dogCeoBreedPath: 'terrier/bull', traitsOverride: ['Playful', 'Charming', 'Mischievous'] },
  { name: 'Cairn Terrier', slug: 'cairn-terrier', group: 'Terrier', size: 'Small', lifespan: '13-15 years', weight: '13-14 lbs', height: '9-10 inches', dogCeoBreedPath: 'terrier/cairn' },
  { name: 'Chihuahua', slug: 'chihuahua', group: 'Toy', size: 'Small', lifespan: '14-16 years', weight: '2-6 lbs', height: '5-8 inches', dogCeoBreedPath: 'chihuahua', traitsOverride: ['Charming', 'Graceful', 'Sassy'] },
  { name: 'Chow Chow', slug: 'chow-chow', group: 'Non-Sporting', size: 'Medium', lifespan: '8-12 years', weight: '45-70 lbs', height: '17-20 inches', dogCeoBreedPath: 'chow', traitsOverride: ['Aloof', 'Loyal', 'Dignified'] },
  { name: 'Clumber Spaniel', slug: 'clumber-spaniel', group: 'Sporting', size: 'Large', lifespan: '10-12 years', weight: '55-85 lbs', height: '17-20 inches', dogCeoBreedPath: 'clumber' },
  { name: 'Cocker Spaniel', slug: 'cocker-spaniel', group: 'Sporting', size: 'Medium', lifespan: '10-14 years', weight: '20-30 lbs', height: '13-16 inches', dogCeoBreedPath: 'spaniel/cocker', traitsOverride: ['Gentle', 'Smart', 'Happy'] },
  { name: 'Collie', slug: 'collie', group: 'Herding', size: 'Large', lifespan: '12-14 years', weight: '50-75 lbs', height: '22-26 inches', dogCeoBreedPath: 'collie/collie', traitsOverride: ['Devoted', 'Graceful', 'Proud'] },
  { name: 'Dachshund', slug: 'dachshund', group: 'Hound', size: 'Small', lifespan: '12-16 years', weight: '8-32 lbs', height: '5-9 inches', dogCeoBreedPath: 'dachshund', traitsOverride: ['Curious', 'Friendly', 'Spunky'] },
  { name: 'Dalmatian', slug: 'dalmatian', group: 'Non-Sporting', size: 'Large', lifespan: '11-13 years', weight: '45-70 lbs', height: '19-24 inches', dogCeoBreedPath: 'dalmatian', traitsOverride: ['Outgoing', 'Playful', 'Sensitive'] },
  { name: 'Doberman Pinscher', slug: 'doberman-pinscher', group: 'Working', size: 'Large', lifespan: '10-12 years', weight: '60-100 lbs', height: '24-28 inches', dogCeoBreedPath: 'doberman', traitsOverride: ['Fearless', 'Loyal', 'Alert'] },
  { name: 'English Foxhound', slug: 'english-foxhound', group: 'Hound', size: 'Large', lifespan: '10-13 years', weight: '60-75 lbs', height: '21-25 inches', dogCeoBreedPath: 'hound/english' },
  { name: 'English Setter', slug: 'english-setter', group: 'Sporting', size: 'Large', lifespan: '12 years', weight: '45-80 lbs', height: '23-27 inches', dogCeoBreedPath: 'setter/english' },
  { name: 'English Springer Spaniel', slug: 'english-springer-spaniel', group: 'Sporting', size: 'Medium', lifespan: '12-14 years', weight: '40-50 lbs', height: '19-20 inches', dogCeoBreedPath: 'springer/english' },
  { name: 'French Bulldog', slug: 'french-bulldog', group: 'Non-Sporting', size: 'Small', lifespan: '10-12 years', weight: '20-28 lbs', height: '11-13 inches', dogCeoBreedPath: 'bulldog/french', traitsOverride: ['Adaptable', 'Playful', 'Smart'] },
  { name: 'German Shepherd', slug: 'german-shepherd', group: 'Herding', size: 'Large', lifespan: '7-10 years', weight: '50-90 lbs', height: '22-26 inches', dogCeoBreedPath: 'germanshepherd', traitsOverride: ['Confident', 'Courageous', 'Smart'] },
  { name: 'Golden Retriever', slug: 'golden-retriever', group: 'Sporting', size: 'Large', lifespan: '10-12 years', weight: '55-75 lbs', height: '21-24 inches', dogCeoBreedPath: 'retriever/golden', traitsOverride: ['Friendly', 'Reliable', 'Trustworthy'], descriptionOverride: 'The Golden Retriever is one of the most popular dog breeds in the world for good reason. Intelligent, devoted, and endlessly patient, they are outstanding family dogs and excel as service and therapy animals. They need daily exercise and shed year-round but pay you back in pure, unconditional warmth.' },
  { name: 'Gordon Setter', slug: 'gordon-setter', group: 'Sporting', size: 'Large', lifespan: '12-13 years', weight: '45-80 lbs', height: '23-27 inches', dogCeoBreedPath: 'setter/gordon' },
  { name: 'Great Dane', slug: 'great-dane', group: 'Working', size: 'Giant', lifespan: '7-10 years', weight: '110-175 lbs', height: '28-32 inches', dogCeoBreedPath: 'dane/great', traitsOverride: ['Friendly', 'Patient', 'Dependable'] },
  { name: 'Great Pyrenees', slug: 'great-pyrenees', group: 'Working', size: 'Giant', lifespan: '10-12 years', weight: '85+ lbs', height: '25-32 inches', dogCeoBreedPath: 'pyrenees', traitsOverride: ['Patient', 'Calm', 'Gentle'] },
  { name: 'Greyhound', slug: 'greyhound', group: 'Hound', size: 'Large', lifespan: '10-13 years', weight: '60-70 lbs', height: '27-30 inches', dogCeoBreedPath: 'greyhound', traitsOverride: ['Gentle', 'Independent', 'Noble'] },
  { name: 'Havanese', slug: 'havanese', group: 'Toy', size: 'Small', lifespan: '14-16 years', weight: '7-13 lbs', height: '8-12 inches', dogCeoBreedPath: 'havanese' },
  { name: 'Irish Setter', slug: 'irish-setter', group: 'Sporting', size: 'Large', lifespan: '12-15 years', weight: '60-70 lbs', height: '25-27 inches', dogCeoBreedPath: 'setter/irish', traitsOverride: ['Outgoing', 'Sweet', 'Active'] },
  { name: 'Irish Terrier', slug: 'irish-terrier', group: 'Terrier', size: 'Medium', lifespan: '13-15 years', weight: '25-27 lbs', height: '18 inches', dogCeoBreedPath: 'terrier/irish' },
  { name: 'Irish Wolfhound', slug: 'irish-wolfhound', group: 'Hound', size: 'Giant', lifespan: '6-8 years', weight: '105-120 lbs', height: '30-32 inches', dogCeoBreedPath: 'wolfhound/irish', traitsOverride: ['Courageous', 'Dignified', 'Generous'] },
  { name: 'Italian Greyhound', slug: 'italian-greyhound', group: 'Toy', size: 'Small', lifespan: '14-15 years', weight: '7-14 lbs', height: '13-15 inches', dogCeoBreedPath: 'greyhound/italian' },
  { name: 'Keeshond', slug: 'keeshond', group: 'Non-Sporting', size: 'Medium', lifespan: '12-15 years', weight: '35-45 lbs', height: '17-18 inches', dogCeoBreedPath: 'keeshond' },
  { name: 'Kerry Blue Terrier', slug: 'kerry-blue-terrier', group: 'Terrier', size: 'Medium', lifespan: '12-15 years', weight: '33-40 lbs', height: '17-20 inches', dogCeoBreedPath: 'terrier/kerryblue' },
  { name: 'Komondor', slug: 'komondor', group: 'Working', size: 'Giant', lifespan: '10-12 years', weight: '80-100 lbs', height: '25-27 inches', dogCeoBreedPath: 'komondor' },
  { name: 'Kuvasz', slug: 'kuvasz', group: 'Working', size: 'Giant', lifespan: '10-12 years', weight: '70-115 lbs', height: '26-30 inches', dogCeoBreedPath: 'kuvasz' },
  { name: 'Labrador Retriever', slug: 'labrador-retriever', group: 'Sporting', size: 'Large', lifespan: '10-12 years', weight: '55-80 lbs', height: '21-24 inches', dogCeoBreedPath: 'labrador', traitsOverride: ['Friendly', 'Active', 'Outgoing'], descriptionOverride: 'The Labrador Retriever has been the most popular breed in the world for decades and it is easy to see why. Friendly, outgoing, and endlessly patient, Labs are exceptional family dogs, guide dogs, and search-and-rescue partners. They need a lot of exercise and love to swim, fetch, and be part of every family activity.' },
  { name: 'Leonberger', slug: 'leonberger', group: 'Working', size: 'Giant', lifespan: '7-9 years', weight: '90-170 lbs', height: '25-31 inches', dogCeoBreedPath: 'leonberg' },
  { name: 'Lhasa Apso', slug: 'lhasa-apso', group: 'Non-Sporting', size: 'Small', lifespan: '12-15 years', weight: '12-18 lbs', height: '10-11 inches', dogCeoBreedPath: 'lhasa' },
  { name: 'Maltese', slug: 'maltese', group: 'Toy', size: 'Small', lifespan: '12-15 years', weight: 'under 7 lbs', height: '7-9 inches', dogCeoBreedPath: 'maltese', traitsOverride: ['Gentle', 'Playful', 'Charming'] },
  { name: 'Mastiff', slug: 'mastiff', group: 'Working', size: 'Giant', lifespan: '6-10 years', weight: '120-230 lbs', height: '27-30 inches', dogCeoBreedPath: 'mastiff/english', traitsOverride: ['Dignified', 'Courageous', 'Good-Natured'] },
  { name: 'Miniature Pinscher', slug: 'miniature-pinscher', group: 'Toy', size: 'Small', lifespan: '12-16 years', weight: '8-10 lbs', height: '10-12 inches', dogCeoBreedPath: 'pinscher/miniature' },
  { name: 'Miniature Schnauzer', slug: 'miniature-schnauzer', group: 'Terrier', size: 'Small', lifespan: '12-15 years', weight: '11-20 lbs', height: '12-14 inches', dogCeoBreedPath: 'schnauzer/miniature', traitsOverride: ['Friendly', 'Smart', 'Obedient'] },
  { name: 'Newfoundland', slug: 'newfoundland', group: 'Working', size: 'Giant', lifespan: '9-10 years', weight: '100-150 lbs', height: '26-28 inches', dogCeoBreedPath: 'newfoundland', traitsOverride: ['Sweet', 'Patient', 'Devoted'] },
  { name: 'Norwegian Elkhound', slug: 'norwegian-elkhound', group: 'Hound', size: 'Medium', lifespan: '12-15 years', weight: '48-55 lbs', height: '19-21 inches', dogCeoBreedPath: 'elkhound/norwegian' },
  { name: 'Old English Sheepdog', slug: 'old-english-sheepdog', group: 'Herding', size: 'Large', lifespan: '10-12 years', weight: '60-100 lbs', height: '21-22 inches', dogCeoBreedPath: 'sheepdog/english', traitsOverride: ['Adaptable', 'Gentle', 'Clownish'] },
  { name: 'Papillon', slug: 'papillon', group: 'Toy', size: 'Small', lifespan: '14-16 years', weight: '5-10 lbs', height: '8-11 inches', dogCeoBreedPath: 'papillon' },
  { name: 'Pekingese', slug: 'pekingese', group: 'Toy', size: 'Small', lifespan: '12-14 years', weight: 'up to 14 lbs', height: '6-9 inches', dogCeoBreedPath: 'pekinese' },
  { name: 'Pembroke Welsh Corgi', slug: 'pembroke-welsh-corgi', group: 'Herding', size: 'Small', lifespan: '12-13 years', weight: 'up to 30 lbs', height: '10-12 inches', dogCeoBreedPath: 'pembroke', traitsOverride: ['Affectionate', 'Smart', 'Alert'] },
  { name: 'Pointer', slug: 'pointer', group: 'Sporting', size: 'Large', lifespan: '12-17 years', weight: '45-75 lbs', height: '23-28 inches', dogCeoBreedPath: 'pointer' },
  { name: 'Pomeranian', slug: 'pomeranian', group: 'Toy', size: 'Small', lifespan: '12-16 years', weight: '3-7 lbs', height: '6-7 inches', dogCeoBreedPath: 'pomeranian', traitsOverride: ['Lively', 'Bold', 'Inquisitive'] },
  { name: 'Poodle (Miniature)', slug: 'poodle-miniature', group: 'Non-Sporting', size: 'Small', lifespan: '10-18 years', weight: '10-15 lbs', height: '10-15 inches', dogCeoBreedPath: 'poodle/miniature', traitsOverride: ['Clever', 'Active', 'Elegant'] },
  { name: 'Poodle (Standard)', slug: 'poodle-standard', group: 'Non-Sporting', size: 'Large', lifespan: '10-18 years', weight: '40-70 lbs', height: '18-24 inches', dogCeoBreedPath: 'poodle/standard', traitsOverride: ['Clever', 'Active', 'Proud'] },
  { name: 'Poodle (Toy)', slug: 'poodle-toy', group: 'Toy', size: 'Small', lifespan: '10-18 years', weight: '4-6 lbs', height: 'up to 10 inches', dogCeoBreedPath: 'poodle/toy', traitsOverride: ['Clever', 'Lively', 'Elegant'] },
  { name: 'Portuguese Water Dog', slug: 'portuguese-water-dog', group: 'Working', size: 'Medium', lifespan: '11-13 years', weight: '35-60 lbs', height: '17-23 inches', dogCeoBreedPath: 'waterdog/portuguese' },
  { name: 'Pug', slug: 'pug', group: 'Toy', size: 'Small', lifespan: '13-15 years', weight: '14-18 lbs', height: '10-13 inches', dogCeoBreedPath: 'pug', traitsOverride: ['Charming', 'Mischievous', 'Loving'] },
  { name: 'Rhodesian Ridgeback', slug: 'rhodesian-ridgeback', group: 'Hound', size: 'Large', lifespan: '10-12 years', weight: '70-85 lbs', height: '24-27 inches', dogCeoBreedPath: 'ridgeback/rhodesian', traitsOverride: ['Affectionate', 'Dignified', 'Even-Tempered'] },
  { name: 'Rottweiler', slug: 'rottweiler', group: 'Working', size: 'Large', lifespan: '9-10 years', weight: '80-135 lbs', height: '22-27 inches', dogCeoBreedPath: 'rottweiler', traitsOverride: ['Loyal', 'Loving', 'Confident'] },
  { name: 'Saint Bernard', slug: 'saint-bernard', group: 'Working', size: 'Giant', lifespan: '8-10 years', weight: '120-180 lbs', height: '26-30 inches', dogCeoBreedPath: 'stbernard', traitsOverride: ['Patient', 'Playful', 'Gentle'] },
  { name: 'Samoyed', slug: 'samoyed', group: 'Working', size: 'Large', lifespan: '12-14 years', weight: '35-65 lbs', height: '19-23 inches', dogCeoBreedPath: 'samoyed', traitsOverride: ['Friendly', 'Gentle', 'Adaptable'] },
  { name: 'Schipperke', slug: 'schipperke', group: 'Non-Sporting', size: 'Small', lifespan: '13-15 years', weight: '10-16 lbs', height: '10-13 inches', dogCeoBreedPath: 'schipperke' },
  { name: 'Scottish Deerhound', slug: 'scottish-deerhound', group: 'Hound', size: 'Giant', lifespan: '8-11 years', weight: '75-110 lbs', height: '28-32 inches', dogCeoBreedPath: 'deerhound/scottish' },
  { name: 'Scottish Terrier', slug: 'scottish-terrier', group: 'Terrier', size: 'Small', lifespan: '11-13 years', weight: '18-22 lbs', height: '10 inches', dogCeoBreedPath: 'terrier/scottish', traitsOverride: ['Independent', 'Loyal', 'Spirited'] },
  { name: 'Shetland Sheepdog', slug: 'shetland-sheepdog', group: 'Herding', size: 'Small', lifespan: '12-14 years', weight: '15-25 lbs', height: '13-16 inches', dogCeoBreedPath: 'sheepdog/shetland', traitsOverride: ['Playful', 'Energetic', 'Bright'] },
  { name: 'Shiba Inu', slug: 'shiba-inu', group: 'Non-Sporting', size: 'Small', lifespan: '13-16 years', weight: '17-23 lbs', height: '13-16 inches', dogCeoBreedPath: 'shiba', traitsOverride: ['Alert', 'Confident', 'Spirited'] },
  { name: 'Shih Tzu', slug: 'shih-tzu', group: 'Toy', size: 'Small', lifespan: '10-18 years', weight: '9-16 lbs', height: '9-10 inches', dogCeoBreedPath: 'shihtzu', traitsOverride: ['Affectionate', 'Playful', 'Outgoing'] },
  { name: 'Siberian Husky', slug: 'siberian-husky', group: 'Working', size: 'Medium', lifespan: '12-14 years', weight: '35-60 lbs', height: '20-23 inches', dogCeoBreedPath: 'husky', traitsOverride: ['Loyal', 'Outgoing', 'Mischievous'] },
  { name: 'Silky Terrier', slug: 'silky-terrier', group: 'Toy', size: 'Small', lifespan: '13-15 years', weight: '8-10 lbs', height: '9-10 inches', dogCeoBreedPath: 'terrier/silky' },
  { name: 'Soft Coated Wheaten Terrier', slug: 'soft-coated-wheaten-terrier', group: 'Terrier', size: 'Medium', lifespan: '12-14 years', weight: '30-45 lbs', height: '17-19 inches', dogCeoBreedPath: 'terrier/wheaten' },
  { name: 'Staffordshire Bull Terrier', slug: 'staffordshire-bull-terrier', group: 'Terrier', size: 'Medium', lifespan: '12-14 years', weight: '24-38 lbs', height: '14-16 inches', dogCeoBreedPath: 'staffordshire/bull', traitsOverride: ['Brave', 'Affectionate', 'Loyal'] },
  { name: 'Standard Schnauzer', slug: 'standard-schnauzer', group: 'Working', size: 'Medium', lifespan: '13-16 years', weight: '30-50 lbs', height: '17-20 inches', dogCeoBreedPath: 'schnauzer' },
  { name: 'Tibetan Mastiff', slug: 'tibetan-mastiff', group: 'Working', size: 'Giant', lifespan: '10-12 years', weight: '70-150 lbs', height: '24-26 inches', dogCeoBreedPath: 'mastiff/tibetan' },
  { name: 'Tibetan Terrier', slug: 'tibetan-terrier', group: 'Non-Sporting', size: 'Medium', lifespan: '15-16 years', weight: '18-30 lbs', height: '14-17 inches', dogCeoBreedPath: 'terrier/tibetan' },
  { name: 'Vizsla', slug: 'vizsla', group: 'Sporting', size: 'Medium', lifespan: '12-14 years', weight: '44-60 lbs', height: '21-24 inches', dogCeoBreedPath: 'vizsla', traitsOverride: ['Gentle', 'Energetic', 'Loyal'] },
  { name: 'Weimaraner', slug: 'weimaraner', group: 'Sporting', size: 'Large', lifespan: '10-13 years', weight: '55-90 lbs', height: '23-27 inches', dogCeoBreedPath: 'weimaraner', traitsOverride: ['Friendly', 'Fearless', 'Alert'] },
  { name: 'Welsh Springer Spaniel', slug: 'welsh-springer-spaniel', group: 'Sporting', size: 'Medium', lifespan: '12-15 years', weight: '35-55 lbs', height: '17-19 inches', dogCeoBreedPath: 'spaniel/welsh' },
  { name: 'Welsh Terrier', slug: 'welsh-terrier', group: 'Terrier', size: 'Small', lifespan: '12-15 years', weight: '20 lbs', height: '15 inches', dogCeoBreedPath: 'terrier/welsh' },
  { name: 'West Highland White Terrier', slug: 'west-highland-white-terrier', group: 'Terrier', size: 'Small', lifespan: '13-15 years', weight: '15-20 lbs', height: '10-11 inches', dogCeoBreedPath: 'terrier/westhighland', traitsOverride: ['Happy', 'Devoted', 'Entertaining'] },
  { name: 'Whippet', slug: 'whippet', group: 'Hound', size: 'Medium', lifespan: '12-15 years', weight: '25-40 lbs', height: '18-22 inches', dogCeoBreedPath: 'whippet', traitsOverride: ['Gentle', 'Affectionate', 'Playful'] },
  { name: 'Yorkshire Terrier', slug: 'yorkshire-terrier', group: 'Toy', size: 'Small', lifespan: '13-16 years', weight: '7 lbs', height: '7-8 inches', dogCeoBreedPath: 'terrier/yorkshire', traitsOverride: ['Affectionate', 'Sprightly', 'Tomboyish'] },
]

const GROUP_CARE_GROOMING: Record<Group, string> = {
  Sporting: 'Brush two to three times a week to manage shedding and keep the coat in good condition.',
  Hound: 'Most hounds are low-maintenance. A weekly brush and occasional bath keeps them clean.',
  Working: 'Brush two to three times a week; increase to daily during heavy shedding seasons.',
  Terrier: 'Regular hand-stripping or clipping every six to eight weeks keeps the coat neat.',
  Toy: 'Daily combing for long-coated breeds; short-coated toys need only a weekly brush.',
  'Non-Sporting': 'Grooming varies widely by breed. Research your specific breed for coat care needs.',
  Herding: 'Weekly brushing and occasional baths; increase brushing frequency during spring and autumn shedding.',
  Miscellaneous: 'Weekly brushing keeps the coat tidy and reduces shedding around the home.',
}

interface OutputBreed {
  slug: string
  name: string
  group: string
  size: string
  lifespan: string
  weight: string
  height: string
  description: string
  traits: string[]
  scores: Record<string, number>
  care: { feeding: string; grooming: string; exercise: string }
  health: { commonConditions: string[]; lifespan: string }
  dogCeoBreedPath: string
}

const GROUP_CONDITIONS: Record<Group, string[]> = {
  Sporting: ['Hip Dysplasia', 'Eye Conditions', 'Ear Infections'],
  Hound: ['Hip Dysplasia', 'Bloat', 'Eye Conditions'],
  Working: ['Hip Dysplasia', 'Bloat', 'Heart Conditions'],
  Terrier: ['Luxating Patella', 'Skin Conditions', 'Eye Problems'],
  Toy: ['Luxating Patella', 'Dental Issues', 'Hypoglycemia'],
  'Non-Sporting': ['Hip Dysplasia', 'Eye Conditions', 'Skin Conditions'],
  Herding: ['Hip Dysplasia', 'Eye Conditions', 'Drug Sensitivity'],
  Miscellaneous: ['Hip Dysplasia', 'Eye Conditions', 'Skin Conditions'],
}

function buildBreed(seed: BreedSeed): OutputBreed {
  const groupScores = GROUP_SCORES[seed.group]
  const apartmentScore = (groupScores.apartmentFriendly + SIZE_APARTMENT[seed.size]) / 2

  return {
    slug: seed.slug,
    name: seed.name,
    group: seed.group,
    size: seed.size,
    lifespan: seed.lifespan,
    weight: seed.weight,
    height: seed.height,
    description: seed.descriptionOverride ?? GROUP_DESCRIPTIONS[seed.group](seed.name),
    traits: seed.traitsOverride ?? GROUP_TRAITS[seed.group],
    scores: {
      friendliness: groupScores.friendliness,
      energy: groupScores.energy,
      trainability: groupScores.trainability,
      shedding: groupScores.shedding,
      kidFriendly: groupScores.kidFriendly,
      apartmentFriendly: Math.round(apartmentScore * 100) / 100,
    },
    care: {
      feeding: SIZE_CARE[seed.size].feeding,
      grooming: GROUP_CARE_GROOMING[seed.group],
      exercise: SIZE_CARE[seed.size].exercise,
    },
    health: {
      commonConditions: GROUP_CONDITIONS[seed.group],
      lifespan: seed.lifespan,
    },
    dogCeoBreedPath: seed.dogCeoBreedPath,
  }
}

const breeds: OutputBreed[] = SEEDS.map(buildBreed)

const output = `// Auto-generated by scripts/generate-breeds.ts — do not edit manually
export interface Breed {
  slug: string
  name: string
  group: string
  size: 'Small' | 'Medium' | 'Large' | 'Giant'
  lifespan: string
  weight: string
  height: string
  description: string
  traits: string[]
  scores: {
    friendliness: number
    energy: number
    trainability: number
    shedding: number
    kidFriendly: number
    apartmentFriendly: number
  }
  care: {
    feeding: string
    grooming: string
    exercise: string
  }
  health: {
    commonConditions: string[]
    lifespan: string
  }
  dogCeoBreedPath: string
}

export const breeds: Breed[] = ${JSON.stringify(breeds, null, 2)}
`

mkdirSync(join(process.cwd(), 'src/data'), { recursive: true })
const outPath = join(process.cwd(), 'src/data/breeds.ts')
writeFileSync(outPath, output, 'utf8')
console.log(`Generated ${breeds.length} breeds → ${outPath}`)
