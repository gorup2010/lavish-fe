import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "@/components/layout/main-layout";
import AuthLayout from "@/components/layout/auth-layout";
import AdminLayout from "@/components/layout/admin/admin-layout";
import HomePage from "./home";
import SearchProductPage from "./search-product";
import LoginPage from "./auth/login";
import RegisterPage from "./auth/register";
import ProductInformationPage from "./product-information";
import { AdminProductsPage } from "./admin/products";
import { AddProductPage } from "./admin/add-product";
import { AddCategoryPage } from "./admin/add-category";
import { AdminUsersPage } from "./admin/users";
import { AdminCategoriesPage } from "./admin/categories";
import { AdminProductDetails } from "./admin/product-details";
import { AdminCategoryDetails } from "./admin/category-details";
import { AdminUserDetails } from "./admin/user-details";

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
      },
    ],
  },
  {
    element: <AdminLayout />,
    path: "/admin",
    children: [
      {
        path: "products",
        element: <AdminProductsPage />,
      },
      {
        path: "products/:id",
        element: <AdminProductDetails />,
      },
      {
        path: "products/new",
        element: <AddProductPage />,
      },
      {
        path: "categories",
        element: <AdminCategoriesPage />,
      },
      {
        path: "categories/:id",
        element: <AdminCategoryDetails />,
      },
      {
        path: "categories/new",
        element: <AddCategoryPage />,
      },
      {
        path: "users",
        element: <AdminUsersPage />,
      },
      {
        path: "users/:id",
        element: <AdminUserDetails />,
      }
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
