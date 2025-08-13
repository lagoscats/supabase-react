// index.js or main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "./supabase/client";
import { ThemeProvider } from "./context/ThemeContext"; // ✅ import ThemeProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <ThemeProvider> {/* ✅ Wrap here so dark mode is global */}
        <App />
      </ThemeProvider>
    </SessionContextProvider>
  </React.StrictMode>
);
