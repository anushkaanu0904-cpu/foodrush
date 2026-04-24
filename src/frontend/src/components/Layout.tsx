import { Link, useRouterState } from "@tanstack/react-router";
import { ClipboardList, Home, ShoppingCart, User } from "lucide-react";
import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
}

const bottomNavItems = [
  { to: "/", icon: Home, label: "Home", requiresAuth: false },
  { to: "/cart", icon: ShoppingCart, label: "Cart", requiresAuth: false },
  { to: "/orders", icon: ClipboardList, label: "Orders", requiresAuth: true },
  { to: "/profile", icon: User, label: "Profile", requiresAuth: true },
];

export function Layout({ children, hideFooter = false }: LayoutProps) {
  const { totalItems } = useCart();
  const { isAuthenticated, login } = useAuth();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      {!hideFooter && <Footer />}

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border md:hidden z-40 safe-area-pb">
        <div className="flex items-center justify-around h-16">
          {bottomNavItems.map(({ to, icon: Icon, label, requiresAuth }) => {
            const isActive =
              to === "/" ? currentPath === "/" : currentPath.startsWith(to);
            const isCart = to === "/cart";
            return (
              <Link
                key={to}
                to={to}
                onClick={
                  requiresAuth && !isAuthenticated
                    ? (e) => {
                        e.preventDefault();
                        login();
                      }
                    : undefined
                }
                data-ocid={`bottom_nav.${label.toLowerCase()}.link`}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 min-w-[60px] relative transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <div className="relative">
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                  {isCart && totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                      {totalItems > 9 ? "9+" : totalItems}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[10px] font-medium ${isActive ? "text-primary" : ""}`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
