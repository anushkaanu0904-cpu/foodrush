import { Toaster } from "@/components/ui/sonner";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { PageLoader } from "./components/LoadingSpinner";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { useAuth } from "./hooks/useAuth";

// Lazy page imports
const Home = lazy(() => import("./pages/Home"));
const RestaurantDetail = lazy(() => import("./pages/RestaurantDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess"));
const Orders = lazy(() => import("./pages/Orders"));
const Profile = lazy(() => import("./pages/Profile"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminRestaurants = lazy(() => import("./pages/admin/AdminRestaurants"));
const AdminOrders = lazy(() => import("./pages/admin/AdminOrders"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));

// Route guards
function ProtectedRoute() {
  const { isAuthenticated, isLoading, login } = useAuth();
  if (isLoading) return <PageLoader />;
  if (!isAuthenticated) {
    login();
    return <PageLoader />;
  }
  return <Outlet />;
}

function AdminRoute() {
  const { isAdmin, isAuthenticated, isLoading, login } = useAuth();
  if (isLoading) return <PageLoader />;
  if (!isAuthenticated) {
    login();
    return <PageLoader />;
  }
  if (!isAdmin) return <Navigate to="/" />;
  return <Outlet />;
}

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PageLoader />}>{children}</Suspense>
);

// Route definitions
const rootRoute = createRootRoute({
  component: () => (
    <AuthProvider>
      <CartProvider>
        <Outlet />
        <Toaster position="top-right" richColors />
      </CartProvider>
    </AuthProvider>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <SuspenseWrapper>
      <Home />
    </SuspenseWrapper>
  ),
});

const restaurantRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/restaurant/$id",
  component: () => (
    <SuspenseWrapper>
      <RestaurantDetail />
    </SuspenseWrapper>
  ),
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: () => (
    <SuspenseWrapper>
      <Cart />
    </SuspenseWrapper>
  ),
});

const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "protected",
  component: ProtectedRoute,
});

const checkoutRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/checkout",
  component: () => (
    <SuspenseWrapper>
      <Checkout />
    </SuspenseWrapper>
  ),
});

const orderSuccessRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/order-success",
  component: () => (
    <SuspenseWrapper>
      <OrderSuccess />
    </SuspenseWrapper>
  ),
});

const ordersRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/orders",
  component: () => (
    <SuspenseWrapper>
      <Orders />
    </SuspenseWrapper>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/profile",
  component: () => (
    <SuspenseWrapper>
      <Profile />
    </SuspenseWrapper>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "admin",
  component: AdminRoute,
});

const adminIndexRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/admin",
  component: () => (
    <SuspenseWrapper>
      <AdminDashboard />
    </SuspenseWrapper>
  ),
});

const adminRestaurantsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/admin/restaurants",
  component: () => (
    <SuspenseWrapper>
      <AdminRestaurants />
    </SuspenseWrapper>
  ),
});

const adminOrdersRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/admin/orders",
  component: () => (
    <SuspenseWrapper>
      <AdminOrders />
    </SuspenseWrapper>
  ),
});

const adminUsersRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/admin/users",
  component: () => (
    <SuspenseWrapper>
      <AdminUsers />
    </SuspenseWrapper>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  restaurantRoute,
  cartRoute,
  protectedRoute.addChildren([
    checkoutRoute,
    orderSuccessRoute,
    ordersRoute,
    profileRoute,
  ]),
  adminRoute.addChildren([
    adminIndexRoute,
    adminRestaurantsRoute,
    adminOrdersRoute,
    adminUsersRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
