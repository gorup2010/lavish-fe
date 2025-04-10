import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "@/components/layout/main-layout";
import HomePage from "./home";
import SearchProductPage from "./search-product";
import LoginPage from "./login";
import ProductInformationPage from "./product-information";

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
        path: "/product-infor",
        element: <ProductInformationPage />
      }
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
