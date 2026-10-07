import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import FoxLoading from './FoxLoading';
import Lost from './pages/lost';
import Login from './pages/login';
import SignUp from './pages/signUp';
import Recipes from './pages/recipes';
import Home from './pages/home';
import Recipe from './pages/recipe';
import Stories from './pages/stories';
import Story from './pages/story';
import Guides from './pages/guides';
import Guide from './pages/guide';
import TravelersSack from './pages/travellersSack';
import Profile from './pages/profile';
import './App.css';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check current active session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2. Listen for auth changes (login, logout, token refreshes)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setLoading(false);

      // If signed in via OAuth/magic link and there's a hash token in the URL, clean it up!
      if (event === 'SIGNED_IN' && window.location.hash) {
        window.history.replaceState(null, '', '/home');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="loading-tavern">
        <FoxLoading duration={1000}>
          <div>Warming up the tavern hearth...</div>
        </FoxLoading>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Root Route: If logged in, redirect to /home. Otherwise show Lost/Landing page */}
        <Route 
          path="/" 
          element={
            session ? (
              <Navigate to="/home" replace />
            ) : (
              <FoxLoading duration={2000}>
                <Lost />
              </FoxLoading>
            )
          } 
        />

        {/* Login Route */}
        <Route 
          path="/login" 
          element={
            session ? (
              <Navigate to="/home" replace />
            ) : (
              <FoxLoading duration={2000}>
                <Login />
              </FoxLoading>
            )
          } 
        />

        {/* Sign Up Route */}
        <Route 
          path="/signUp" 
          element={
            session ? (
              <Navigate to="/home" replace />
            ) : (
              <FoxLoading duration={2000}>
                <SignUp />
              </FoxLoading>
            )
          } 
        />

        {/* Home Route */}
        <Route 
          path="/home" 
          element={
            session ? (
              <FoxLoading duration={2000}>
                <Home />
              </FoxLoading>
            ) : (
              <Navigate to="/" replace />
            )
          } 
        /> 

        {/* Recipes Route */}
        <Route 
          path="/recipes" 
          element={
            session ? (
              <FoxLoading duration={2000}>
                <Recipes />
              </FoxLoading>
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />

        {/* Recipe Detail Route */}
        <Route 
          path="/recipes/:id" 
          element={
            session ? (
              <FoxLoading duration={2000}>
                <Recipe />
              </FoxLoading>
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />

        {/* Stories Route */}
        <Route 
          path="/stories" 
          element={
            session ? (
              <FoxLoading duration={2000}>
                <Stories />
              </FoxLoading>
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />

        {/* Story Detail Route */}
        <Route 
          path="/stories/:id" 
          element={
            session ? (
              <FoxLoading duration={2000}>
                <Story />
              </FoxLoading>
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />

        {/* Guides Route */}
        <Route 
          path="/guides" 
          element={
            session ? (
              <FoxLoading duration={2000}>
                <Guides />
              </FoxLoading>
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />

        {/* Guide Detail Route */}
        <Route 
          path="/guides/:id" 
          element={
            session ? (
              <FoxLoading duration={2000}>
                <Guide />
              </FoxLoading>
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />

      <Route 
          path="/sack" 
          element={
            session ? (
              <FoxLoading duration={2000}>
                <TravelersSack />
              </FoxLoading>
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
      <Route 
          path="/profile" 
          element={
            session ? (
              <FoxLoading duration={2000}>
                <Profile />
              </FoxLoading>
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />

        {/* Fallback Catch-All */}
        <Route 
          path="*" 
          element={<Navigate to={session ? "/home" : "/"} replace />} 
        />
      </Routes>
    </Router>
  );
}

export default App;