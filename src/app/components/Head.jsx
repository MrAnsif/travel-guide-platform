import React from 'react'
import Link from 'next/link'
import ThemeToggleButton from '../components/ui/theme-toggle-button'


const Head = () => {

    const navItem = [
        { name: 'Home', link: '/' },
        { name: 'Explore', link: '/place' },
        { name: 'About', link: '/about' },
    ]

    return (
        <div className='flex justify-between items-center px-8 py-4 gap-5 sticky top-0 z-40  backdrop-blur-lg'>
            <div className='flex justify-between w-full '>
                <Link href='/' className='flex items-center gap-3' >
                    <div className='size-5'>
                        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </div>
                    <h1 className='hidden md:block font-sans font-bold'>Local Insights</h1>
                </Link>
                <div className='flex flex-wrap gap-8'>
                    {navItem.map((item, index) => (
                        <Link key={index} href={item.link} className="text-sm md:text-base px-2 py-1.5 md:px-3 md:py-1.5 border hover:border-foreground hover:border-dashed transition-all duration-700 rounded-md" >
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </div>
            </div>

            <div >
                <ThemeToggleButton variant="circle-blur" start="top-right" />
            </div>
        </div>
    )
}

export default Head