import { getPlaceBySlug, insertPlace } from "../../../lib/Places";
import { NextResponse } from "next/server";

export async function GET() {
    const data = await getPlaceBySlug('shinjuku-tokyo-japan')
    return NextResponse.json(data)
}

export async function POST() {
    const data = await insertPlace()
    return new NextResponse(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}















'use client'
import React from 'react'
import { Search } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { getFeaturedPlaces } from '../lib/Places';
import Link from 'next/link';
import { useSearch } from '../hooks/useSearch';
import { useRouter } from 'next/navigation';

export default async function page() {

  const { query, setQuery, results, isLoading, error } = useSearch();
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && results.length > 0) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setQuery('');
    }
  };

  const handleResultClick = () => {
    setQuery('');
  };

  const featuredPlaces = await getFeaturedPlaces(6)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="relative px-4 sm:px-6 lg:px-8 xl:px-40">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-none sm:rounded-xl">
            <div
              className="flex min-h-[400px] sm:min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center p-4 sm:p-8"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop")`
              }}
            >
              <div className="flex flex-col gap-4 text-center max-w-4xl">
                <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                  Discover the Heart of Every Neighborhood
                </h1>
                <p className="text-white/90 text-sm sm:text-base lg:text-lg font-normal leading-relaxed max-w-3xl mx-auto">
                  Uncover the unique stories, hidden gems, and essential insights that define each community. From local culture to safety tips, we provide the knowledge you need to feel at home, wherever you go.
                </p>
              </div>

              {/* Search Bar */}
              <div className="w-full max-w-lg relative">
                <form onSubmit={handleSubmit} className="relative flex items-center">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    <Search className="h-5 w-5" />
                  </div>
                  <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a neighborhood"
                    aria-label="Search destinations"
                    className="pl-10 pr-20 h-12 sm:h-14 text-sm sm:text-base rounded-full border-none bg-white/60 backdrop-blur-sm shadow-lg"
                  />
                  <Button
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full h-10 sm:h-12 px-4 sm:px-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                  >
                    Search
                  </Button>
                </form>

                {/* Search Results Dropdown */}
                <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-lg shadow-xl mt-1 max-h-96 overflow-y-auto z-50">
                  {error && (
                    <div className="p-3 sm:p-4 text-destructive text-sm">
                      Search error: {error}
                    </div>
                  )}

                  {!error && !isLoading && results.length === 0 && (
                    <div className="p-3 sm:p-4 text-muted-foreground text-center text-sm">
                      No results found for "{query}"
                    </div>
                  )}

                  {!error && results.length > 0 && (
                    <div className="divide-y divide-border">
                      {results.map((place) => (
                        <Link
                          key={place.id}
                          href={`/place/${place.slug}`}
                          onClick={handleResultClick}
                          className="block p-3 sm:p-4 hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            {place.overviewThumbnail && (
                              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 relative">
                                <Image
                                  src={place.overviewThumbnail}
                                  alt={place.name}
                                  fill
                                  className="object-cover rounded"
                                  sizes="(max-width: 640px) 40px, 48px"
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-foreground truncate text-sm sm:text-base">
                                {place.name}
                              </h4>
                              <p className="text-xs sm:text-sm text-muted-foreground truncate">
                                {place.city}, {place.country}
                              </p>
                              {place.shortDescription && (
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-1 hidden sm:block">
                                  {place.shortDescription}
                                </p>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}

                      {results.length >= 8 && (
                        <Link
                          href={`/search?q=${encodeURIComponent(query)}`}
                          onClick={handleResultClick}
                          className="block p-3 sm:p-4 text-center text-primary hover:bg-primary/10 font-medium text-sm transition-colors"
                        >
                          <span className="hidden sm:inline">View all results →</span>
                          <span className="sm:hidden">View all →</span>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Destinations Section */}
      <div className="px-4 sm:px-6 lg:px-8 xl:px-40 py-8 sm:py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-foreground text-xl sm:text-2xl font-bold leading-tight tracking-tight mb-6 sm:mb-8">
            Featured Destinations
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredPlaces ?
              featuredPlaces.map((destination) => (
                <Link href={`/place/${destination.slug}`} key={destination.id} className="group cursor-pointer">
                  <div className="flex flex-col gap-3 p-2 rounded-xl hover:bg-accent/50 transition-colors">
                    <div className="relative overflow-hidden rounded-xl">
                      <div
                        className="w-full aspect-video bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundImage: `url("${destination.overviewThumbnail}")` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-foreground text-base font-medium leading-normal ">
                        {destination.name}
                      </h3>
                      <p className="text-muted-foreground text-sm font-normal leading-normal">
                        {destination.placeType}
                      </p>
                    </div>
                  </div>
                </Link>
              )) :
              <div>No featured destination to suggest.</div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
