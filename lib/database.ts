import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type UserRecord = {
  id: string;
  name: string;
  surname: string;
  age: number | null;
  email: string;
  password_hash: string;
};

type SupabaseDatabase = {
  public: {
    Tables: {
      users: {
        Row: UserRecord & { created_at: string };
        Insert: Omit<UserRecord, "id"> & { id?: string; created_at?: string };
        Update: Partial<Omit<UserRecord, "id">> & { id?: string; created_at?: string };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

const globalSupabase = globalThis as typeof globalThis & {
  lingorifySupabase?: SupabaseClient<SupabaseDatabase>;
};

function getSupabase() {
  if (globalSupabase.lingorifySupabase) {
    return globalSupabase.lingorifySupabase;
  }

  const url = process.env.SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secretKey) {
    throw new Error("SUPABASE_URL and SUPABASE_SECRET_KEY must be configured.");
  }

  const supabase = createClient<SupabaseDatabase>(url, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
  globalSupabase.lingorifySupabase = supabase;
  return supabase;
}

export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  const { data, error } = await getSupabase()
    .from("users")
    .select("id, name, surname, age, email, password_hash")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to find Supabase user: ${error.message}`);
  }

  return data;
}

export async function createUser(
  name: string,
  surname: string,
  age: number,
  email: string,
  passwordHash: string,
): Promise<string | null> {
  const { data, error } = await getSupabase()
    .from("users")
    .insert({ name, surname, age, email, password_hash: passwordHash })
    .select("id")
    .single();

  if (error?.code === "23505") {
    return null;
  }
  if (error) {
    throw new Error(`Failed to create Supabase user: ${error.message}`);
  }

  return data.id;
}

export type { UserRecord };
