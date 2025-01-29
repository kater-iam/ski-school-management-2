import { AuthBindings } from "@refinedev/core";
import { supabaseClient } from "../supabase-client";

export const generateAuthProvider = (): AuthBindings => ({
  login: async ({ email, password }) => {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        success: false,
        error,
      };
    }

    if (data?.user) {
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: new Error("Invalid credentials"),
    };
  },
  logout: async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      return {
        success: false,
        error,
      };
    }

    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const { data } = await supabaseClient.auth.getSession();
    const { session } = data;

    if (!session) {
      return {
        authenticated: false,
        redirectTo: "/login",
      };
    }

    return {
      authenticated: true,
    };
  },
  getPermissions: async () => {
    const { data } = await supabaseClient.auth.getSession();
    const { session } = data;

    if (!session) {
      return null;
    }

    return session.user.role;
  },
  getIdentity: async () => {
    const { data } = await supabaseClient.auth.getSession();
    const { session } = data;

    if (!session) {
      return null;
    }

    return {
      id: session.user.id,
      name: session.user.email,
      email: session.user.email,
    };
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
}); 