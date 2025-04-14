import { useAuth } from "@/providers/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

export function AuthLayout() {
  const authContext = useAuth();
  
  if (authContext.auth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          alt="Rolex Watch"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          src="https://media.rolex.com/image/upload/v1710426086/rolexcom/new-watches/2024/main-navigation/rolex-watches-navigation-sea-dweller-m126603-0001-10158_rsa_seadweller_43_m126603_0001_carrousel_24-portrait.jpg"
        />
      </div>
    </div>
  );
}

export default AuthLayout;
