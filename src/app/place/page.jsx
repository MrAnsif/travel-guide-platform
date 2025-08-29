'use client'
import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import Link from 'next/link';
import useSWR from 'swr';
import SearchBar from '../components/SearchBar';


const fetcher = (...args) => fetch(...args).then(res => res.json());

const page = () => {
  const [page, setPage] = useState(1)
  const { data, error, isLoading } = useSWR(
    `api/places?page=${page}&limit=12`,
    fetcher,
    {
      keepPreviousData: true,
    }
  )



  const [selectedFilters, setSelectedFilters] = useState({
    culture: false,
    etiquette: false,
    safety: false
  });

  const filterCategories = [
    { key: 'culture', label: 'Culture' },
    { key: 'etiquette', label: 'Etiquette' },
    { key: 'safety', label: 'Safety' }
  ];

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading places</div>
  let places = data.places

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 xl:px-40 py-6 sm:py-8">
        <div className="mx-auto max-w-4xl">

          {/* Header Section */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-wrap justify-between gap-4">
              <div className="flex min-w-0 flex-col gap-3 flex-1">
                <h1 className="text-foreground text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight">
                  Explore Places
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base font-normal leading-relaxed">
                  Discover detailed information about various locations, including culture, etiquette, and safety.
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar />

          {/* Filter Buttons */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-3">
              {filterCategories.map(({ key, label }) => (
                <Button
                  key={key}
                  variant="secondary"
                  size="sm"
                  className={`h-8 rounded-full px-4 transition-all duration-200 ${selectedFilters[key]
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-accent hover:bg-accent/80'
                    }`}
                  onClick={() => setSelectedFilters(prev => ({
                    ...prev,
                    [key]: !prev[key]
                  }))}
                >
                  <span className="text-sm font-medium">{label}</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Places Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
            {places.map((place) => (
              <Link href={`/place/${place.slug}`} key={place.id} className="group cursor-pointer">
                <div className="flex flex-col gap-3 p-2 rounded-xl hover:bg-accent/50 transition-colors duration-200">
                  <div className="relative overflow-hidden rounded-xl">
                    <div
                      className="w-full aspect-video bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundImage: `url("${place.overviewThumbnail}")` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-foreground text-base font-medium leading-normal group-hover:text-primary transition-colors">
                      {place.name}
                    </h3>
                    <p className="text-muted-foreground text-sm font-normal leading-normal">
                      {place.placeType}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default page