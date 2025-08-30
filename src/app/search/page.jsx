'use client'
import { Suspense } from 'react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSearch } from '../../hooks/useSearch';
import SearchBar from '../components/SearchBar';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const { query: searchQuery, setQuery, results, isLoading, error } = useSearch();

  // Sync the URL query with the search hook
  useEffect(() => {
    if (query && query !== searchQuery) {
      setQuery(query);
    }
  }, [query, searchQuery, setQuery]);

  // Use the results from useSearch hook instead of server-side results
  const searchResults = results || [];

  return (
    <div className="container py-8 mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">
        {query ? `Search Results for "${query}"` : 'Search Destinations'}
      </h1>

      {!query && (
        <p className="text-gray-600">Enter a search term to find destinations.</p>
      )}

      {query && !isLoading && searchResults.length === 0 && !error && (
        <p className="text-gray-600">No results found for "{query}".</p>
      )}

      {error && (
        <p className="text-red-600">Search error: {error}</p>
      )}

      {isLoading && query && (
        <p className="text-gray-600">Searching...</p>
      )}

      <SearchBar results={searchResults} query={query} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
        {searchResults.map((place) => (
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
                  {place.country}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container py-8 mx-auto max-w-4xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-8 w-64"></div>
          <div className="h-4 bg-gray-200 rounded mb-4 w-48"></div>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}