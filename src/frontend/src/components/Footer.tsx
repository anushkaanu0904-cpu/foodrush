import { Link } from "@tanstack/react-router";
import { Utensils } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Utensils size={16} className="text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-foreground">
              FoodRush
            </span>
          </div>
          <p className="text-muted-foreground text-xs leading-relaxed max-w-xs">
            Delivering happiness to your door, one meal at a time.
          </p>
          <div className="flex items-center gap-4 ml-auto text-xs text-muted-foreground">
            <Link
              to="/"
              className="hover:text-primary transition-colors"
              data-ocid="footer.home.link"
            >
              Home
            </Link>
            <Link
              to="/orders"
              className="hover:text-primary transition-colors"
              data-ocid="footer.orders.link"
            >
              My Orders
            </Link>
            <Link
              to="/profile"
              className="hover:text-primary transition-colors"
              data-ocid="footer.profile.link"
            >
              Profile
            </Link>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>© {year} FoodRush. All rights reserved.</span>
          <span>
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
