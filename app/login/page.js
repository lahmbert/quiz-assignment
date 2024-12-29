'use client';

import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Added state for success message

  const handleLoginUser = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage('Please fill your email!');
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
    });

    if (error) {
      setErrorMessage('Login failed: ' + error.message);
      setSuccessMessage(''); // Clear success message if there's an error
    } else {
      setSuccessMessage('Please check your email for the login link.'); // Success message
      setErrorMessage(''); // Clear any existing error messages
    }
  };

  const handleRegister = () => {
    router.push('/register');
  };

  return (
    <div>
      <div className="mt-[5rem] text-center justify-items-center">
        <div className="bg-slate-50 mx-4 rounded-lg p-8 sm:flex flex-row sm:gap-5 py-10 shadow-lg sm:w-[50rem]">
          <div className="sm:flex hidden w-[30rem] justify-center justify-items-center items-center">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" />
          </div>
          <div className="flex sm:w-[20rem] flex-col">
            <div className="pb-8">
              <span className="text-2xl font-semibold">Logo</span>
              <p className="text-sm py-1">Silahkan Login untuk Memulai!</p>
            </div>
            {errorMessage && (
              <p className="text-red-500 py-2">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-green-500 py-2">{successMessage}</p> // Show success message
            )}
            <form
              onSubmit={handleLoginUser}
              className="flex flex-col gap-6 text-start text-sm"
            >
              <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="ml-1 mt-2 p-1 border border-slate-400 focus:outline-none rounded-sm"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Input your email!"
                />
              </div>
              <div className="py-2">
                <button
                  type="submit"
                  className="uppercase font-bold duration-300 text-slate-100 hover:-translate-y-1 p-2 w-full bg-gradient-to-tl from-green-500 to-lime-500 shadow-md rounded-sm"
                >
                  Sign In
                </button>
              </div>
              <div className="flex text-center justify-center cursor-pointer gap-1">
                <span>Don't Have an Account?</span>
                <span onClick={handleRegister} className="text-blue-500">
                  Register!
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
