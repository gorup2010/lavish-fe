import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "@/components/layout/main-layout";
import AuthLayout from "@/components/layout/auth-layout";

import HomePage from "./home";
import SearchProductPage from "./search-product";
import LoginPage from "./auth/login";
import RegisterPage from "./auth/register";
import ProductInformationPage from "./product-information";
import { ProtectedRoute } from "./protected-route";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/search",
        element: <SearchProductPage />,
      },
      {
        path: "/products/:id",
        element: (
            <ProductInformationPage />
        ),
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
