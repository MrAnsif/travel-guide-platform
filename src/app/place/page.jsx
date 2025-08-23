'use client'
import React, { useState } from 'react';
import { Search, ChevronDown, Twitter, Instagram, Facebook } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
const page = () => {

    const [selectedFilters, setSelectedFilters] = useState({
    culture: false,
    etiquette: false,
    safety: false
  });

  const places = [
    {
      id: 1,
      name: "San Francisco",
      description: "Explore the vibrant culture and iconic landmarks of San Francisco.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "New York City",
      description: "Discover the diverse neighborhoods and bustling streets of New York City.",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Los Angeles",
      description: "Experience the entertainment industry and sunny beaches of Los Angeles.",
      image: "https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      name: "Chicago",
      description: "Immerse yourself in the architectural wonders and deep-dish pizza of Chicago.",
      image: "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      name: "Miami",
      description: "Enjoy the tropical vibes and lively nightlife of Miami.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      name: "Seattle",
      description: "Uncover the tech scene and stunning natural beauty of Seattle.",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop"
    },
    {
      id: 7,
      name: "Boston",
      description: "Walk through the historic streets and prestigious universities of Boston.",
      image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=300&fit=crop"
    },
    {
      id: 8,
      name: "Austin",
      description: "Dive into the live music and tech-savvy atmosphere of Austin.",
      image: "https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=400&h=300&fit=crop"
    },
    {
      id: 9,
      name: "Denver",
      description: "Explore the outdoor adventures and mountain views of Denver.",
      image: "https://images.unsplash.com/photo-1619856699906-09e1f58c98b1?w=400&h=300&fit=crop"
    },
    {
      id: 10,
      name: "Atlanta",
      description: "Experience the southern charm and thriving arts scene of Atlanta.",
      image: "https://images.unsplash.com/photo-1554016809-0e5e1e6d3bf4?w=400&h=300&fit=crop"
    },
    {
      id: 11,
      name: "Dallas",
      description: "Discover the business hub and diverse communities of Dallas.",
      image: "https://images.unsplash.com/photo-1583769515615-801c500089c9?w=400&h=300&fit=crop"
    },
    {
      id: 12,
      name: "Houston",
      description: "Immerse yourself in the culinary delights and space exploration history of Houston.",
      image: "https://images.unsplash.com/photo-1558443957-dea8d1e90c1c?w=400&h=300&fit=crop"
    }
  ];

  const filterCategories = [
    { key: 'culture', label: 'Culture' },
    { key: 'etiquette', label: 'Etiquette' },
    { key: 'safety', label: 'Safety' }
  ];

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
          <div className="mb-6">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                <Search className="h-5 w-5" />
              </div>
              <Input
                type="text"
                placeholder="Search for a place"
                className="pl-10 h-12 text-base bg-accent/50 border-none focus:bg-accent/70 transition-colors"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-3">
              {filterCategories.map(({ key, label }) => (
                <Button
                  key={key}
                  variant="secondary"
                  size="sm"
                  className={`h-8 rounded-full px-4 transition-all duration-200 ${
                    selectedFilters[key] 
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
              <div key={place.id} className="group cursor-pointer">
                <div className="flex flex-col gap-3 p-2 rounded-xl hover:bg-accent/50 transition-colors duration-200">
                  <div className="relative overflow-hidden rounded-xl">
                    <div
                      className="w-full aspect-video bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundImage: `url("${place.image}")` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-foreground text-base font-medium leading-normal group-hover:text-primary transition-colors">
                      {place.name}
                    </h3>
                    <p className="text-muted-foreground text-sm font-normal leading-normal">
                      {place.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
    )
}

export default page