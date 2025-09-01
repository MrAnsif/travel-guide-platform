"use client";
import Image from 'next/image';
import React from 'react'

const Overview = ({ data }) => {
  console.log('over data', data)

  // Error handling for missing data
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">No overview data available</p>
      </div>
    );
  }

  const {
    name = "Unknown Place",
    placeType = "Unknown",
    city = "Unknown City",
    state = "Unknown State",
    country = "Unknown Country",
    population,
    // overviewImage,
    overviewThumbnail,
    attractions = "",
    languages = [],
    currency = "Unknown",
    timezone = "Unknown",
    transportationMethods = "",
    emergencyNumber = "Unknown",
    aiOverview = {}
  } = data;

  const { popularWith = [] } = aiOverview;

  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden">
      {/* Content */}
      <main className="px-4 md:px-20 py-5 flex justify-center">
        <div className="w-full max-w-5xl flex flex-col gap-6">
          {/* Hero Image */}
          <div
            className="min-h-80 rounded-xl bg-cover bg-center flex items-end p-4 text-2xl md:text-3xl font-bold text-white"
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.4) 15%, transparent 45%), url(${overviewThumbnail || '/placeholder-image.jpg'})`,
            }}
          >
            Explore {name}
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Type</p>
              <p className="font-semibold capitalize">{placeType}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-semibold">{city}, {state}, {country}</p>
            </div>
            {population && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Population</p>
                <p className="font-semibold">{population.toLocaleString()}</p>
              </div>
            )}
          </div>

          {/* Travel Information */}
          <h2 className="text-xl md:text-2xl font-bold px-1">Travel Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {overviewThumbnail && (
              <Image
                src={overviewThumbnail}
                width={540}
                height={540}
                alt={`${name} overview`}
                className="rounded-xl bg-cover bg-center aspect-[3/2]"
              />
            )}
            <div className="flex flex-col gap-4">
              {/* Languages */}
              <div className="flex items-center gap-3 border p-4 rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <span className="text-sm font-bold">🗣️</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm md:text-base">Languages</h3>
                  <p className="text-sm text-muted-foreground">
                    {languages.length > 0 ? languages.join(", ").toUpperCase() : "Not specified"}
                  </p>
                </div>
              </div>

              {/* Currency & Timezone */}
              <div className="border-t py-3">
                <p className="text-muted-foreground text-sm">Currency</p>
                <p className="text-sm">{currency}</p>
              </div>

              <div className="border-t py-3">
                <p className="text-muted-foreground text-sm">Timezone</p>
                <p className="text-sm">{timezone}</p>
              </div>

              {/* Popular With */}
              <div className="border-t py-3">
                <p className="text-muted-foreground text-sm">Popular With</p>
                <div className="text-sm">
                  {popularWith.length > 0 ? (
                    <ul className="list-disc list-inside">
                      {popularWith.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">No data available</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Attractions */}
          {attractions && (
            <div className="border rounded-lg p-4">
              <h3 className="font-bold text-lg mb-3">Popular Attractions</h3>
              <p className="text-sm">{attractions}</p>
            </div>
          )}

          {/* Transportation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-bold text-lg mb-3">Transportation</h3>
              {transportationMethods?.map(e => (
                <ul className="list-disc list-inside">
                  <li>{e}</li>
                </ul>
              )) || <p>No specific</p>}
            </div>
            {emergencyNumber &&
              <div className="border rounded-lg p-4">
                <h3 className="font-bold text-lg mb-3">Emergency Contact</h3>
                <p className="text-sm font-semibold text-red-600">{emergencyNumber}</p>
              </div>
            }
          </div>
        </div>
      </main>
    </div>
  )
}

export default Overview