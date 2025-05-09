import AuthProvider from "@/providers/AuthProvider";
import { AppRouter } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

const queryClient = new QueryClient();

export default function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
      <Toaster richColors/>
    </QueryClientProvider>
  );
}
