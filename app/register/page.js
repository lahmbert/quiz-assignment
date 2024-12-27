'use client';

import { useRouter } from 'next/navigation';

export default function Regiter() {
  const route = useRouter();
  const handleLogin = () => {
    route.push('/login');
  };
  return (
    <div>
      <div className="mt-[4rem] sm:mb-0 mb-[4rem] text-center justify-items-center">
        <div className="bg-slate-50 mx-4 rounded-lg p-8 sm:flex flex-row sm:gap-5 py-10 shadow-lg sm:w-[50rem]">
          <div className="sm:flex hidden w-[30rem] justify-center justify-items-center items-center">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" />
          </div>
          <div className="flex sm:w-[20rem] flex-col">
            <div className="pb-8">
              <span className="text-2xl font-semibold">Logo</span>
              <p className="text-sm py-1">Silahkan Daftar untuk Memulai!</p>
            </div>
            <form className="flex flex-col w-full gap-6 text-start text-sm">
              <div className="flex flex-col">
                <label htmlFor="name">Full Name</label>
                <input
                  className="ml-1 mt-2 p-1 border border-slate-400 focus:outline-none rounded-sm"
                  type="name"
                  name="name"
                  id="name"
                  placeholder="Input your name!"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input
                  className="ml-1 mt-2 p-1 border border-slate-400 focus:outline-none rounded-sm"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Input your email!"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password">Password</label>
                <input
                  className="ml-1 mt-2 p-1 border border-slate-400 focus:outline-none rounded-sm"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Input your password!"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="r-password">Retype Password</label>
                <input
                  className="ml-1 mt-2 p-1 border border-slate-400 focus:outline-none rounded-sm"
                  type="r-password"
                  name="r-password"
                  id="r-password"
                  placeholder="Input your r-password!"
                />
              </div>
              <div className="flex items-center gap-1 px-4">
                <input type="checkbox" name="remember" id="remember" />
                <label htmlFor="remember">
                  I Agree with all{' '}
                  <span className="text-blue-500 cursor-pointer">
                    term of service
                  </span>
                  .
                </label>
              </div>
              <div className="py-2">
                <button className="uppercase font-bold duration-300 text-slate-100 hover:-translate-y-1 p-2 w-full bg-gradient-to-tl from-green-500 to-lime-500 shadow-md rounded-sm">
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
