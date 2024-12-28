'use client';

import Navbar from '@/components/navbar';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TakeQuiz() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.push('/login');
        return;
      }
    };

    checkUser();
  }, [router]);

  const [isOpenBars, setIsOpenBars] = useState(false);
  return (
    <div>
      <Navbar isOpenBars={isOpenBars} setIsOpenBars={setIsOpenBars} />
      <div
        className={`flex justify-center text-center ${
          isOpenBars ? 'mt-2' : 'mt-16'
        } sm:mt-16`}
      >
        <div className="p-8 sm:p-[4rem] mx-4 bg-slate-50 flex flex-col gap-8 sm:w-[35rem] shadow-md rounded-md">
          <div className="text-2xl font-bold">Nama Quiz</div>
          <div className="pb-5">Pertanyaannya!</div>
          <div className="flex justify-center text-white gap-12 sm:gap-[10rem]">
            <div className="flex flex-col gap-10">
              <div>
                <button className="bg-gradient-to-bl from-blue-500 to-purple-500 p-1 px-6 hover:-translate-y-1 duration-200 shadow-lg rounded-full">
                  Jawaban A
                </button>
              </div>
              <div>
                <button className="bg-gradient-to-bl from-blue-500 to-purple-500 p-1 px-6 hover:-translate-y-1 duration-200 shadow-lg rounded-full">
                  Jawaban B
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-10">
              <div>
                <button className="bg-gradient-to-bl from-blue-500 to-purple-500 p-1 px-6 hover:-translate-y-1 duration-200 shadow-lg rounded-full">
                  Jawaban C
                </button>
              </div>
              <div>
                <button className="bg-gradient-to-bl from-blue-500 to-purple-500 p-1 px-6 hover:-translate-y-1 duration-200 shadow-lg rounded-full">
                  Jawaban D
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
