import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        // Redirect ke halaman login jika belum login
        router.push('/login');
      }
    };

    checkUser();
  }, [router]);
};
