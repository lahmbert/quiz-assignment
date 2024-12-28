'use client';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function Navbar({ isOpenBars, setIsOpenBars }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // Check user authentication status
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    fetchUser();
  }, []);

  // Handle toggle of navbar on small screens
  const handleOpenBars = () => {
    setIsOpenBars(!isOpenBars);
  };

  // Handle login or logout
  const handleLoginLogout = async () => {
    if (user) {
      await supabase.auth.signOut(); // Sign out if user is logged in
      setUser(null); // Update local state to reflect logged out status
    } else {
      router.push('/login'); // Redirect to login if not logged in
    }
  };

  return (
    <div className="bg-gradient-to-tl from-blue-500 items-center to-purple-500 p-8 py-6 sm:px-[5rem] text-white sm:font-semibold font-medium text-sm shadow-md">
      <div className="flex items-center justify-between w-full">
        <div>Logo</div>
        <button className="sm:hidden flex" onClick={handleOpenBars}>
          <FontAwesomeIcon icon={faBars} className="w-4" />
        </button>
        <div className="sm:flex hidden items-center justify-around gap-4">
          <div className="cursor-pointer">Home</div>
          <div className="cursor-pointer">Take Quiz</div>
          <div className="cursor-pointer">Manage Quiz</div>
          <div>
            <button
              onClick={handleLoginLogout}
              className="bg-gradient-to-tl rounded-full shadow-md hover:-translate-y-1 duration-300 from-green-500 to-lime-500 p-2 px-4"
            >
              {user ? 'Sign Out' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>
      <div
        className={`sm:hidden transition-all duration-500 ease-in-out ${
          isOpenBars ? 'flex' : 'hidden'
        } flex pt-4 border-b-2`}
      ></div>
      <div
        className={`sm:hidden transition-all duration-500 ease-in-out ${
          isOpenBars ? 'flex' : 'hidden'
        } flex pt-4 gap-2 flex-col text-start`}
      >
        <div className="cursor-pointer">Home</div>
        <div className="cursor-pointer">Take Quiz</div>
        <div className="cursor-pointer">Manage Quiz</div>
        <div className="w-full text-center pt-2">
          <button
            onClick={handleLoginLogout}
            className="p-2 bg-gradient-to-tl w-[50%] duration-300 hover:-translate-y-1 rounded-full from-green-500 to-lime-500"
          >
            {user ? 'Sign Out' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
}
