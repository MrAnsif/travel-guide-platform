import Link from 'next/link';
import { searchPlaces } from '../../lib/Places';
import SearchBar from '../components/SearchBar';

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = params.q;
  const results = query ? await searchPlaces(query, 20) : [];

  return (
    <div className="container py-8 mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">
        {query ? `Search Results for "${query}"` : 'Search Destinations'}
      </h1>

      {!query && (
        <p className="text-gray-600">Enter a search term to find destinations.</p>
      )}

      {query && results.length === 0 && (
        <p className="text-gray-600">No results found for "{query}".</p>
      )}

      <SearchBar results={results} query={query} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
        {results.map((place) => (
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

export const metadata = {
  title: 'Search Destinations',
};