import { supabase } from "../../../supabase-chat/lib/supabaseClient"

export const fetchUser = async () => {
    const user = supabase.auth.user();
    if (!user) throw new Error('No user found');
    return user;
}

export const useUser = () => {
    return useQuery('user', fetchUser, {
      enabled: !!supabase.auth.user(), // 유저가 있을 때만 fetch
    });
  };

  