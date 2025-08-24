"use client"
import React from 'react'
import Image from "next/image";

const page = () => {
  return (
    <section className="w-full bg-background text-foreground">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 px-6 md:px-20 py-16 md:py-24">

        {/* Left image side */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-start">
          <div className="relative w-full max-w-md h-[320px] md:h-[450px]">
            <Image
              src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop" // Replace with your actual image
              alt="About section image"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right text side */}
        <div className="w-full md:w-2/3 flex flex-col gap-6 text-left">
          <h2 className="text-[40px] md:text-[76px] font-bold leading-tight tracking-tight">
            About us.
          </h2>
          <div className='grid grid-cols-2 gap-x-5 md:gap-x-20'>
            <p className="text-muted-foreground text-lg md:text-xl font-medium">
              Our platform delivers clear, reliable insights to help you understand a place before you arrive.
              With accurate details and a quality experience, we turn curiosity into confidence.
            </p>

            <div className='space-y-5'>
              <p className="text-muted-foreground text-base leading-relaxed">
                From cultural nuances to public etiquette, local traditions to
                safety essentials, we provide everything you need to feel prepared.
                Our deep coverage goes beyond countries and states, diving into
                local areas that matter most—where real experiences happen.
              </p>

              <p className="text-muted-foreground text-base leading-relaxed">
                By integrating live data such as crime rates, community behavior,
                and practical travel tips, we ensure you step into any new place
                with awareness and respect. Whether it’s for leisure, work, or
                adventure, our mission is to make every journey more informed, safe,
                and enriching.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default page