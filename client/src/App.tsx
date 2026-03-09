import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/i18n/context";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import CustomCursor from "@/components/CustomCursor";
import CookieBanner from "@/components/CookieBanner";
import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Procesa el token OAuth del hash ANTES de que Wouter redirija
function AuthCallback() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.includes("access_token")) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          // Token procesado — limpiar hash y dejar que Wouter redirija
          window.history.replaceState(null, "", "/es");
          window.location.href = "/es";
        }
      });
    }
  }, []);

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/:locale" component={Home} />
      <Route path="/">
        <Redirect to="/es" />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <I18nProvider>
          <AuthCallback />
          <CustomCursor />
          <CookieBanner />
          <Toaster />
          <Router />
        </I18nProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
