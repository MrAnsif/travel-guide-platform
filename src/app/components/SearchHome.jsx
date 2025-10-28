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
          placeName: place.name || '',
          placeDetails: place.display_name || ''
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
    <div className="w-full max-w-lg relative z-10 pointer-events-auto">
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
          className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full h-10 sm:h-12 px-4 sm:px-6 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
        >
          Search
        </Button>
      </form>

      {/* ai generation popup */}
      {ispopup && (
        <div className="backdrop-blur-md bg-black/50 w-screen h-screen fixed inset-0 z-50 flex items-center justify-center">
          <div className="relative flex bg-popover/25 border w-2xs h-60 justify-center items-center rounded-2xl" >
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
                  className="block p-3 sm:p-4 hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
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
                      {place.addresstype && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1 hidden sm:block">
                          {place.addresstype}
                        </p>
                      )}
                    </div>

                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                      width="30.000000pt" height="20.000000pt" viewBox="0 0 334.000000 295.000000" className='fill-chart-2'
                      preserveAspectRatio="xMidYMid meet">

                      <g transform="translate(0.000000,295.000000) scale(0.100000,-0.100000)"
                      >
                        <path d="M1730 2745 c-19 -37 -39 -58 -76 -80 l-50 -30 50 -30 c38 -22 57 -43
77 -82 l27 -52 10 28 c14 40 66 96 109 116 l37 18 -35 17 c-42 22 -83 65 -106
111 l-18 35 -25 -51z"/>
                        <path d="M2058 2592 c-19 -139 -195 -324 -345 -363 -21 -6 -45 -12 -53 -15 -8
-3 18 -16 58 -30 92 -31 143 -63 212 -134 59 -59 130 -188 130 -234 0 -40 18
-31 31 16 44 167 216 334 372 363 44 9 40 20 -10 30 -154 29 -323 197 -363
363 -13 52 -26 54 -32 4z"/>
                        <path d="M2339 2544 l-26 -26 29 -28 28 -28 29 28 28 29 -26 25 c-15 14 -29
26 -32 26 -2 0 -16 -12 -30 -26z"/>
                        <path d="M1400 2504 c-151 -23 -240 -49 -345 -102 -376 -187 -590 -579 -545
-997 43 -405 320 -733 717 -851 120 -36 330 -45 453 -20 183 37 311 98 465
220 l36 29 60 -59 c55 -55 59 -61 59 -106 0 -25 4 -58 9 -71 14 -36 409 -436
453 -458 78 -40 169 -18 221 53 30 41 34 124 9 174 -22 42 -410 433 -452 454
-13 7 -48 13 -76 13 -51 0 -54 2 -113 61 l-60 61 36 55 c104 161 153 320 160
518 6 144 -2 205 -43 339 -37 123 -94 160 -171 113 -45 -27 -53 -76 -25 -155
50 -145 55 -353 12 -490 -72 -226 -226 -400 -443 -500 -100 -46 -196 -65 -322
-65 -611 0 -991 665 -683 1194 45 77 145 187 219 242 67 49 180 102 268 126
58 16 110 21 220 22 143 2 144 2 167 30 17 19 24 39 24 68 0 56 -40 93 -112
101 -55 7 -154 7 -198 1z"/>
                        <path d="M1303 1838 c-27 -13 -51 -62 -126 -253 -30 -77 -74 -188 -97 -248
-46 -117 -47 -150 -5 -169 18 -8 32 -8 48 -1 23 11 31 24 65 108 l21 50 132 3
c82 2 136 -1 143 -8 5 -5 20 -36 31 -67 27 -71 63 -102 100 -85 49 22 50 48 7
157 -87 221 -173 432 -189 463 -27 53 -81 74 -130 50z m70 -198 c8 -25 27 -76
41 -114 14 -37 26 -75 26 -82 0 -11 -21 -14 -95 -14 -52 0 -95 4 -95 9 0 8 54
168 80 235 13 35 23 27 43 -34z"/>
                        <path d="M1792 1830 c-22 -21 -22 -25 -22 -325 0 -292 1 -306 20 -325 25 -25
51 -25 81 -1 l24 19 0 307 0 307 -24 19 c-30 24 -52 24 -79 -1z"/>
                      </g>
                    </svg>

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