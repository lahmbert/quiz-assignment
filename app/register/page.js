'use client';

import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import bcrypt from 'bcryptjs'; // Import bcrypt

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (password !== rePassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    // Enkripsi password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Pendaftaran dengan Supabase Auth
    const { user, error: authError } = await supabase.auth.signUp({
      email,
      password: hashedPassword, // Gunakan password yang sudah terenkripsi
    });

    if (authError) {
      setErrorMessage(authError.message);
      console.error(authError);
      return;
    }

    // Insert data pengguna ke tabel users setelah registrasi
    const { error: dbError } = await supabase
      .from('users') // Gunakan nama tabel yang benar
      .insert([
        {
          email,
          full_name: fullName,
          password: hashedPassword, // Simpan password yang terenkripsi
        },
      ]);

    if (dbError) {
      setErrorMessage(dbError.message);
      console.error(dbError);
    } else {
      router.push('/login');
    }
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div>
      <div className="mt-[4rem] sm:mb-0 mb-[4rem] text-center justify-items-center">
        <div className="bg-slate-50 mx-4 rounded-lg p-8 sm:flex flex-row sm:gap-5 py-10 shadow-lg sm:w-[50rem]">
          <div className="sm:flex hidden w-[30rem] justify-center justify-items-center items-center">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              alt="Illustration"
            />
          </div>
          <div className="flex sm:w-[20rem] flex-col">
            <div className="pb-8">
              <span className="text-2xl font-semibold">Logo</span>
              <p className="text-sm py-1">Silahkan Daftar untuk Memulai!</p>
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <form
              onSubmit={handleRegisterUser}
              className="flex flex-col w-full gap-6 text-start text-sm"
            >
              <div className="flex flex-col">
                <label htmlFor="name">Full Name</label>
                <input
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                  className="ml-1 mt-2 p-1 border border-slate-400 focus:outline-none rounded-sm"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Input your name!"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="ml-1 mt-2 p-1 border border-slate-400 focus:outline-none rounded-sm"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Input your email!"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password">Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="ml-1 mt-2 p-1 border border-slate-400 focus:outline-none rounded-sm"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Input your password!"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="r-password">Retype Password</label>
                <input
                  onChange={(e) => setRePassword(e.target.value)}
                  value={rePassword}
                  className="ml-1 mt-2 p-1 border border-slate-400 focus:outline-none rounded-sm"
                  type="password"
                  name="r-password"
                  id="r-password"
                  placeholder="Input your password again!"
                  required
                />
              </div>
              <div className="flex items-center gap-1 px-4">
                <input type="checkbox" name="remember" id="remember" required />
                <label htmlFor="remember">
                  I Agree with all{' '}
                  <span className="text-blue-500 cursor-pointer">
                    terms of service
                  </span>
                  .
                </label>
              </div>
              <div className="py-2">
                <button
                  type="submit"
                  className="uppercase font-bold duration-300 text-slate-100 hover:-translate-y-1 p-2 w-full bg-gradient-to-tl from-green-500 to-lime-500 shadow-md rounded-sm"
                >
                  Sign Up
                </button>
              </div>
              <div className="flex text-center justify-center cursor-pointer gap-1">
                <span>Already Have an Account?</span>
                <span onClick={handleLogin} className="text-blue-500">
                  Sign In!
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
