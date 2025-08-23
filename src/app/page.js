import React from 'react'
import { Search } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';

const page = () => {

  const featuredDestinations = [
    {
      id: 1,
      name: "San Francisco, CA",
      description: "Explore the vibrant culture and iconic landmarks of San Francisco.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "New York, NY",
      description: "Experience the energy and diversity of New York City.",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Los Angeles, CA",
      description: "Discover the entertainment capital of the world, Los Angeles.",
      image: "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      name: "Chicago, IL",
      description: "Immerse yourself in the rich history and architecture of Chicago.",
      image: "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      name: "Miami, FL",
      description: "Enjoy the sun, beaches, and nightlife of Miami.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      name: "Seattle, WA",
      description: "Uncover the tech hub and natural beauty of Seattle.",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="relative px-4 sm:px-6 lg:px-8 xl:px-40">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-none sm:rounded-xl">
            <div
              className="flex min-h-[400px] sm:min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center p-4 sm:p-8"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop")`
              }}
            >
              <div className="flex flex-col gap-4 text-center max-w-4xl">
                <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                  Discover the Heart of Every Neighborhood
                </h1>
                <p className="text-white/90 text-sm sm:text-base lg:text-lg font-normal leading-relaxed max-w-3xl mx-auto">
                  Uncover the unique stories, hidden gems, and essential insights that define each community. From local culture to safety tips, we provide the knowledge you need to feel at home, wherever you go.
                </p>
              </div>
              
              {/* Search Bar */}
              <div className="w-full max-w-lg">
                <div className="relative flex items-center">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    <Search className="h-5 w-5" />  
                  </div>
                  <Input
                    type="text"
                    placeholder="Search for a neighborhood"
                    className="pl-10 pr-20 h-12 sm:h-14 text-sm sm:text-base rounded-full border-none bg-white/95 backdrop-blur-sm shadow-lg"
                  />
                  <Button 
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full h-10 sm:h-12 px-4 sm:px-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                  >
                    Search
                  </Button>
                </div>
              </div>
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
            {featuredDestinations.map((destination) => (
              <div key={destination.id} className="group cursor-pointer">
                <div className="flex flex-col gap-3 p-2 rounded-xl hover:bg-accent/50 transition-colors">
                  <div className="relative overflow-hidden rounded-xl">
                    <div
                      className="w-full aspect-video bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundImage: `url("${destination.image}")` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-foreground text-base font-medium leading-normal ">
                      {destination.name}
                    </h3>
                    <p className="text-muted-foreground text-sm font-normal leading-normal">
                      {destination.description}
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