'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import useSWRInfinite from 'swr/infinite';
import { useInView } from 'react-intersection-observer';
import SearchBar from '../components/SearchBar';

const fetcher = (...args) => fetch(...args).then(res => res.json());

const page = () => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
    rootMargin: '100px',
  });

  const getKey = (pageIndex, previousPageData) => {
    // If no previous page data and not first page, return null
    if (previousPageData && !previousPageData.places?.length) return null;

    // first page
    if (pageIndex === 0) return `api/places?page=1&limit=12`;

    // Add cursor-based navigation
    const lastItem = previousPageData?.places[previousPageData.places.length - 1];
    if (lastItem?.id) {
      return `api/places?cursor=${lastItem.id}&limit=12`;
    }

    return null; // Return null if we can't get more data
  };

  const { data, error, size, setSize, isLoading, isValidating } = useSWRInfinite(
    getKey,
    fetcher,
    {
      revalidateFirstPage: false,
      revalidateAll: false,
      persistSize: true,
    }
  );
  // Simplified state calculations
  const places = data ? data.flatMap(page => page?.places || []) : [];
  const isLoadingMore = isLoading || (size > 0 && data && !data[size - 1]);
  const isEmpty = data?.[0]?.places?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.places?.length < 12);

  // Trigger load more when scrolling to bottom
  useEffect(() => {
    if (inView && !isLoading && !isReachingEnd) {
      setSize(size + 1);
    }
  }, [inView, isLoading, size, setSize, isReachingEnd]);


  if (isLoading && !data) return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>

    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div>Error loading places</div>
    </div>
  );

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

          {/* Places Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
            {places.map((place, index) => (
              <Link href={`/place/${place.slug}`} key={index} className="group cursor-pointer">
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

          {/* Loading indicator or end message */}
          {!isReachingEnd && !isLoadingMore && (
            <div ref={ref} className="h-10" /> // Hidden loading trigger
          )}

          {isLoadingMore && !isReachingEnd && (
            <div className="flex justify-center py-8">
              <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>

            </div>
          )}

          {isReachingEnd && places.length > 0 && (
            <div className="flex justify-center py-8">
              <div className="text-muted-foreground">No more places to load</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;