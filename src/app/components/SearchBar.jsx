'use client';

import { useSearch } from '../../hooks/useSearch';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from './ui/input';


export default function SearchBar() {
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

  return (
    <div className="mb-6 relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
          <Search className="h-5 w-5" />
        </div>
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search destinations, cities, countries..."
          className="pl-10 h-12 text-base bg-accent/50 border-none focus:bg-accent/70 transition-colors"
          aria-label="Search destinations"
        />
        {isLoading && (
          <div className="absolute right-3 top-3.5">
            <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </form>

      {/* Search Results Dropdown */}
      <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-lg shadow-xl mt-1 max-h-96 overflow-y-auto z-50">
        {error && (
          <div className="p-3 sm:p-4 text-destructive text-sm">
            Search error: {error}
          </div>
        )}

        {!error && !isLoading && results.length === 0 && query.length !== 0 && (
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
  );
}