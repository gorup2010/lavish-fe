import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "@/components/layout/main-layout";
import AuthLayout from "@/components/layout/auth-layout";
import HomePage from "./home";
import SearchProductPage from "./search-product";
import LoginPage from "./auth/login";
import RegisterPage from "./auth/register";
import ProductInformationPage from "./product-information";
import AdminLayout from "@/components/layout/admin/admin-layout";
import { AdminProductsPage } from "./admin/product";

const router = createBrowserRouter([
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
        element: <ProductInformationPage />,
      }
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: "/admin/products",
        element: (
            <AdminProductsPage />
        ),
      }
    ]
  }
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
