//fetchUser
import { User } from "@supabase/supabase-js";
import { createClient } from "./clientApp";
export async function fetchUserData(): Promise<User | null> {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Error fetching user:", error);
    return null;
  }

  console.log('====================================');
  console.log("User data fetched successfully:", data.user);
  console.log('====================================');
  return data.user;
}
