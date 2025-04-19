import AuthProvider from "@/providers/AuthProvider";
import { AppRouter } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

const queryClient = new QueryClient();

export default function App() {
  window.addEventListener("load", (e) => {
    if (window.location.hash == "#_=_") {
      window.location.hash = ""; // for older browsers, leaves a # behind
      history.pushState("", document.title, window.location.pathname); // nice and clean
      e.preventDefault(); // no page reload
    }
  });
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
      <Toaster richColors/>
    </QueryClientProvider>
  );
}
