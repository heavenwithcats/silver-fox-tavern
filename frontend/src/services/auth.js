// frontend/src/services/authService.js
import { supabase } from '../supabaseClient';

// Shared OAuth Handler for Marshmallow Buttons
export const signInWithProvider = async (providerName) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: providerName,
    options: {
      redirectTo: `${window.location.origin}/home`,
    }, // 'google', 'github', or 'facebook'
  });
  if (error) {
    console.error(`Error traveling with ${providerName}:`, error.message);
    throw error;
  }
  return data;
};

// Standard Email/Password Sign Up
export const signUpWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

// Standard Email/Password Login
export const signInWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

// Sign Out
export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};