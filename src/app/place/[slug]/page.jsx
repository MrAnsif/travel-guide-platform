'use client'
import React, { useState } from 'react';
import Overview from './components/Overview';
import Safety from './components/Safety';
import Culture from './components/Culture';
import { useParams } from 'next/navigation';
import useSWR from 'swr';


export default function page() {

  const fetcher = (...args) => fetch(...args).then(res => res.json());

  const params = useParams()
  const slug = params.slug
  
  const { data, error, isLoading } = useSWR(
    slug ? `/api/places/${slug}` : null,
    fetcher,
    {
      revalidateOnFocus: false
    }
  )
  console.log('place is ', data)


  
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'culture', label: 'Culture & Etiquette' },
    { id: 'safety', label: 'Safety' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <Overview data={place} />
        );
      case 'culture':
        return (
          <Culture data={place} />
        );
      case 'safety':
        return (
          <Safety data={place} />
        );
      default:
        return null;
    }
  };

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading places</div>
  // if (!data) {
  //   notFound(); // This will show the 404 page
  // }
  let place = data

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 xl:px-40 py-6 sm:py-8">
        <div className="mx-auto max-w-4xl">

          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-between gap-4">
              <div className="flex min-w-0 flex-col gap-3 flex-1">
                <h1 className="text-foreground text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                  {place.name}
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg font-normal leading-relaxed max-w-3xl">
                  {place.description}
                </p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex gap-8 overflow-x-auto" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center justify-center border-b-2 pb-4 pt-4 text-sm font-semibold tracking-wide whitespace-nowrap transition-colors ${activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/50'
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-12">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  )
}
