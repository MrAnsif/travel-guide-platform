'use client'
import React, { useState } from 'react'
import { Search, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Link from 'next/link';
import Image from 'next/image';
import { useSearch } from '../../hooks/useSearch';
import { useRouter } from 'next/navigation';
import Loader from './GeneratingLoader'

export default function SearchComponent() {
  const [ispopup, setIspopup] = useState(false)
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

  const handleResultGeneration = async (place) => {
    try {
      setQuery('');
      setIspopup(true)

      const response = await fetch('/api/places/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          placeName: place.name,
          placeDetails: place.display_name
        }),
      });

      const data = await response.json()
      console.log('frontend data from AI : ', data)

      if (data.success) {
        router.push(`/place/${data.data.results[0].slug}`);
      } else {
        throw new Error(data.error);
      }

    } catch (error) {
      console.error('Generation error:', error);
      // Handle error in UI
    } finally {
      setIspopup(false);
      setQuery('');
    }
  }

  return (
    <div className="w-full max-w-lg relative z-10 ">
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

      {/* ai generation popup */}
      {ispopup && (
        <div className="backdrop-blur-md w-screen h-screen fixed inset-0 z-50 flex items-center justify-center">
          <div className="relative flex bg-popover border w-2xs h-60 justify-center items-center rounded-2xl" >
            <Loader />
            <X className='cursor-pointer absolute top-0 right-0 m-3' onClick={() => setIspopup(false)} />
          </div>
        </div>
      )}

      {/* Search Results Dropdown */}
      {query.length >= 2 && (
        <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-lg shadow-xl mt-1 max-h-96 overflow-y-auto z-30">
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

          {!error && results.validPlaces && (
            <div className="divide-y divide-border">
              {results.data.map((place, index) => (
                <div
                  key={index}
                  onClick={() => handleResultGeneration(place)}
                  className="block p-3 sm:p-4 hover:bg-accent hover:text-accent-foreground transition-colors"
                  style={{
                    backgroundImage: `
                    radial-gradient(125% 125% at 20% 50%, var(--background) 60%, var(--chart-2) 100%)
                  `,
                    backgroundSize: "100% 100%",
                  }}

                >
                  <div className="flex items-center space-x-2 sm:space-x-3">

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground truncate text-sm sm:text-base">
                        {place.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">
                        {place.display_name}
                      </p>
                      {place.shortDescription && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1 hidden sm:block">
                          {place.addresstype}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!error && results.results?.length > 0 && (
            <div className="divide-y divide-border">
              {results.results.map((place) => (
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
      )}
    </div>
  );
}