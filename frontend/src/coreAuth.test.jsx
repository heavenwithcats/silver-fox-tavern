import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './pages/login';
import SignUp from './pages/signUp';
import Profile from './pages/profile';

// Mock Supabase auth functions globally for these tests using Vitest (vi)
vi.mock('./supabaseClient', () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
      getUser: vi.fn().mockResolvedValue({
        data: { user: { email: 'traveler@silverfox.com', user_metadata: { full_name: 'Silver Fox' } } },
      }),
      updateUser: vi.fn().mockResolvedValue({ error: null }),
      signOut: vi.fn().mockResolvedValue({ error: null }),
    },
  },
}));

// Mock auth service functions used in Login and SignUp
vi.mock('./services/auth', () => ({
  signInWithEmail: vi.fn().mockResolvedValue({ data: {}, error: null }),
  signUpWithEmail: vi.fn().mockResolvedValue({ data: {}, error: null }),
  signInWithProvider: vi.fn().mockResolvedValue({ error: null }),
}));

describe('Silver Fox Tavern - Core Auth & Profile Tests', () => {
  
  test('Login page renders email and passcode inputs', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(screen.getByLabelText(/Cabin Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Unique Tavern Passcode/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enter the Den/i })).toBeInTheDocument();
  });

  test('SignUp page renders claim seat button and inputs', () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
    expect(screen.getByLabelText(/Cabin Email Address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Claim Your Seat/i })).toBeInTheDocument();
  });

  test('Profile page loads user data and displays edit fields', async () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );

    // Wait for the async useEffect to fetch and populate the mock user name
    const nameInput = await screen.findByDisplayValue('Silver Fox');
    expect(nameInput).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save Profile/i })).toBeInTheDocument();
  });

});