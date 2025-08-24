"use client";
import React from 'react'

const Overview = ({ data }) => {

  return (
    <div
      className="relative flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden "
    >
      {/* Content */}
      <main className="px-4 md:px-20 py-5 flex justify-center">
        <div className="w-full max-w-5xl flex flex-col gap-6">
          {/* Hero Image */}
          <div
            className="min-h-80 rounded-xl bg-cover bg-center flex items-end p-4 text-2xl md:text-3xl font-bold text-white"
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.4) 15%, transparent 45%), url(${data.image})`,
            }}
          >
            Explore the Heart of Willow Creek
          </div>

          {/* Travel Info */}
          <h2 className="text-xl md:text-2xl font-bold px-1">Travel Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className="rounded-xl bg-cover bg-center aspect-[3/2]"
              style={{ backgroundImage: `url(${data.image})` }}
            ></div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 border p-4 rounded-lg">
                <div
                  className="w-10 h-10 rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url(${data.thumbnail})` }}
                ></div>
                <h3 className="font-bold text-sm md:text-base">
                  Best Time to Visit: {data.bestTimeToVisit}
                </h3>
              </div>

              <div className="border-t py-3">
                <p className="text-muted-foreground text-sm">Average Stay Duration</p>
                <p className=" text-sm">{data.averageStayDuration}</p>
              </div>

              <div className="border-t py-3">
                <p className="text-muted-foreground text-sm">Popular With</p>
                <p className=" text-sm">{data.popularWith.join(", ")}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Overview