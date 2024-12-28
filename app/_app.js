import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

function MyApp({ Component, pageProps }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return <Component {...pageProps} session={session} />;
}

export default MyApp;
