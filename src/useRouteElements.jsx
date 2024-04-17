import { useAppContext } from "./contexts/AppStore";
import MainLayout from "./layouts/MainLayout";
import { Navigate, Outlet, useRoutes } from "react-router";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";

function ProtectedRoute() {
  const { isAuthenticated } = useAppContext()
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

function RejectedRoute() {
  const { isAuthenticated } = useAppContext()
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: "",
      element: <RejectedRoute />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
    {
      path: "",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <MainLayout />,
          children: [
            {
              path: "/cart",
              index: true,
              element: <Cart />,
            },
          ],
        },
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          index: true,
          element: <Home />,
        },
        {
          path: "/product/:id",
          index: true,
          element: <ProductDetail />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return routeElements;
}
