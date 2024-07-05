'use client'
import React from 'react'
import Link from 'next/link';
import { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"

const Navbar = () => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session } = useSession();

  return (

    <nav>
      <div className="bg-green-600 text-white p-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center space-x-2">
          <img src="data:image/jpeg;base64,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" alt="NutrifyMe Logo" width={40} height={40} className="rounded-full object-cover" />
          <span className="text-2xl font-bold">NutrifyMe</span>
        </div>
        <div className="flex space-x-6">
          <Link href="/" passHref>
            <div className="hover:text-gray-200 transition duration-300 text-xl">Home</div>
          </Link>
          <Link href="/About" passHref>
            <div className="hover:text-gray-200 transition duration-300 text-xl">About</div>
          </Link>
          <Link href="/services" passHref>
            <div className="hover:text-gray-200 transition duration-300 text-xl">Services</div>
          </Link>
          <Link href="/contact" passHref>
            <div className="hover:text-gray-200 transition duration-300 text-xl">Contact</div>
          </Link>
        </div>
        {session && <div>
          <div className="relative">
            < button
              className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img src="data:image/jpeg;base64,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" alt="Profile" className="w-full h-full object-cover" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg py-2">
                <Link href="/profile" passHref>
                  <div className="block px-4 py-2 hover:bg-gray-100">Profile</div>
                </Link>
                <Link href="/settings" passHref>
                  <div className="block px-4 py-2 hover:bg-gray-100">Settings</div>
                </Link>
                {/* <Link href="/" passHref> */}
                  <div onClick={() => { signOut() }} className="block px-4 py-2 hover:bg-gray-100">Logout</div>
                {/* </Link> */}
              </div>
            )}
          </div>
        </div>}
        {!session && <Link href="/Signup" className='bg-green-800 hover:bg-green-700 rounded-2xl'>
          <button className='p-2'>SignUp</button>
        </Link>}
      </div>
    </nav>
  )
}

export default Navbar;
