// src/app/search/page.js
import { searchPlaces } from '../../lib/Places';
import SearchBar from '../components/SearchBar';

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = params.q;
  const results = query ? await searchPlaces(query, 50) : [];

  return (
    <div className="container mx-auto px-4 py-8">
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
    </div>
  );
}

export const metadata = {
  title: 'Search Destinations',
};