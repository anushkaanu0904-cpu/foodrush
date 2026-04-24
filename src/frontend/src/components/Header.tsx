import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Search,
  ShoppingCart,
  User,
  Utensils,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";

export function Header() {
  const { isAuthenticated, isAdmin, profile, login, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({ to: "/", search: { q: searchQuery.trim() } });
    }
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-subtle">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link
          to="/"
          data-ocid="header.logo.link"
          className="flex items-center gap-2 shrink-0 group"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:bg-primary/90 transition-colors">
            <Utensils size={16} className="text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-foreground text-lg hidden sm:block">
            FoodRush
          </span>
        </Link>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="flex-1 max-w-md hidden md:flex"
        >
          <div className="relative w-full">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="search"
              placeholder="Search restaurants or dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-ocid="header.search_input"
              className="pl-9 bg-input border-input focus-visible:ring-primary text-sm"
            />
          </div>
        </form>

        <div className="flex items-center gap-2 ml-auto">
          {/* Cart */}
          <Link to="/cart" data-ocid="header.cart.link" className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="View cart"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-primary text-primary-foreground">
                  {totalItems > 99 ? "99+" : totalItems}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Auth */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  data-ocid="header.user_menu.open_modal_button"
                  className="flex items-center gap-1.5 font-medium"
                >
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                    <User size={14} className="text-primary" />
                  </div>
                  <span className="hidden sm:block text-sm truncate max-w-[100px]">
                    {profile?.name || "Account"}
                  </span>
                  <ChevronDown size={14} className="text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/profile" data-ocid="header.profile.link">
                    <User size={14} className="mr-2" />
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/orders" data-ocid="header.orders.link">
                    <ShoppingCart size={14} className="mr-2" />
                    My Orders
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/admin" data-ocid="header.admin.link">
                        <LayoutDashboard size={14} className="mr-2" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  data-ocid="header.logout.button"
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut size={14} className="mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={login}
              size="sm"
              data-ocid="header.login.button"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
