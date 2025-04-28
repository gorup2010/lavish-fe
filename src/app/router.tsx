import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "@/components/layout/main-layout";
import AuthLayout from "@/components/layout/auth-layout";
import HomePage from "./home";
import SearchProductPage from "./search-product";
import LoginPage from "./auth/login";
import RegisterPage from "./auth/register";
import ProductInformationPage from "./product-information";
import AdminLayout from "@/components/layout/admin/admin-layout";
import { AdminProductsPage } from "./admin/products";
import { AddProductPage } from "./admin/add-product";
import { AddCategoryPage } from "./admin/add-category";
import { AdminUsersPage } from "./admin/users";

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
    path: "/admin",
    children: [
      {
        path: "products",
        element: (
            <AdminProductsPage />
        ),
      },
      {
        path: "products/new",
        element: (
            <AddProductPage />
        ),
      },
      {
        path: "categories",
        element: (
            <div />
        ),
      },
      {
        path: "categories/new",
        element: (
            <AddCategoryPage />
        ),
      },
      {
        path: "users",
        element: (
            <AdminUsersPage />
        ),
      },
    ]
  }
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
