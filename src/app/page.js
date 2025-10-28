'use client'

import React from 'react'
import Link from 'next/link';
import SearchComponent from './components/SearchHome';
import ColorBends from './components/ui/ColorBends'
import useSWR from 'swr';

export default function page() {

  const fetcher = (...args) => fetch(...args).then(res => res.json());

  const { data, error, isLoading } = useSWR('/api/places/featuredPlace',
    fetcher,
    {
      revalidateOnFocus: false
    }
  )
  const featuredPlaces = data
  console.log('featured place data frontend: ', featuredPlaces)


  return (
    <div className="min-h-screen text-foreground">
      <ColorBends
        // colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
        rotation={0}
        speed={0.3}
        scale={1}
        frequency={1}
        warpStrength={1}
        mouseInfluence={1}
        parallax={0.6}
        noise={0.08}
        transparent
      />
      {/* Hero Section */}
      <div className=" px-4 sm:px-6 lg:px-8 xl:px-40">
        <div className="mx-auto max-w-4xl">
          <div className="relative rounded-none sm:rounded-xl pointer-events-none">
            <div
              className="flex min-h-[400px] sm:min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center p-4 sm:p-8 rounded-none sm:rounded-xl"
            >
              <div className="flex flex-col gap-4 text-center max-w-4xl">
                <h1 className="text-foreground text-3xl sm:text-4xl lg:text-5xl font-sans font-semibold leading-tight tracking-tight">
                  See Beyond the Map
                </h1>
                <p className="text-foreground text-sm sm:text-base lg:text-lg font-normal leading-relaxed max-w-3xl mx-auto">
                  <i>Find key details about any neighborhood with our <br /> <b>Smart Search</b> — type a name, and get personalized insights in seconds.</i>
                </p>
              </div>

              {/* Search Bar */}
              <SearchComponent />

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
            {isLoading &&
              <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            }
            {error &&
              <div className='text-muted-foreground'>No featured destination to suggest.</div>
            }

            {featuredPlaces && !isLoading && featuredPlaces.length > 0 ?
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
                      <h3 className="relative text-foreground text-base font-medium leading-normal ">
                        {destination.name}
                      </h3>
                      <p className="text-muted-foreground text-sm font-normal leading-normal">
                        {destination.placeType}
                      </p>
                    </div>
                  </div>
                </Link>
              )) :
              (!isLoading && !error && <div className='text-muted-foreground'>No featured destination to suggest.</div>)
            }
          </div>
        </div>
      </div>
    </div >
  )
}
