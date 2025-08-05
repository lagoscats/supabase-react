import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { supabase } from './supabase/client';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SessionContextProvider supabaseClient={supabase}>
    <App />
  </SessionContextProvider>
);
