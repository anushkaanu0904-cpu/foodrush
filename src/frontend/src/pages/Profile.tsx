import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  ClipboardList,
  LogOut,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Star,
  User,
  UtensilsCrossed,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Layout } from "../components/Layout";
import { StarRating } from "../components/StarRating";
import { useAuthContext } from "../context/AuthContext";
import { useActor } from "../hooks/useBackend";
import { useMyOrders } from "../hooks/useOrders";
import { useProfile, useSaveProfile } from "../hooks/useProfile";
import type { Review } from "../types";
import { UserRole } from "../types";

// ── Role badge ──────────────────────────────────────────────────────────────
const roleMeta: Record<UserRole, { label: string; color: string }> = {
  admin: {
    label: "Admin",
    color: "bg-primary/15 text-primary border-primary/25",
  },
  customer: {
    label: "Customer",
    color: "bg-muted text-muted-foreground border-border",
  },
  restaurant_owner: {
    label: "Restaurant Owner",
    color: "bg-accent/15 text-accent-foreground border-accent/25",
  },
};

function RoleBadge({ role }: { role: UserRole }) {
  const meta = roleMeta[role] ?? roleMeta.customer;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${meta.color}`}
    >
      <ShieldCheck size={11} />
      {meta.label}
    </span>
  );
}

// ── Section card ─────────────────────────────────────────────────────────────
function SectionCard({
  title,
  icon: Icon,
  children,
}: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="bg-card rounded-2xl shadow-card border border-border/60 overflow-hidden">
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-border/60 bg-muted/30">
        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon size={14} className="text-primary" />
        </div>
        <h2 className="font-display font-semibold text-sm text-foreground">
          {title}
        </h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

// ── Review card ───────────────────────────────────────────────────────────────
function ReviewCard({ review, index }: { review: Review; index: number }) {
  const date = new Date(
    Number(review.createdAt) / 1_000_000,
  ).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      data-ocid={`profile.review.item.${index + 1}`}
      className="flex flex-col gap-2 p-4 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <UtensilsCrossed size={12} className="text-primary" />
          </div>
          <span className="font-medium text-sm text-foreground truncate">
            Order review
          </span>
        </div>
        <StarRating value={Number(review.rating)} size="sm" />
      </div>
      {review.comment && (
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 pl-9">
          "{review.comment}"
        </p>
      )}
      <p className="text-xs text-muted-foreground pl-9">{date}</p>
    </div>
  );
}

// ── Stat tile ─────────────────────────────────────────────────────────────────
function StatTile({
  label,
  value,
  icon: Icon,
}: { label: string; value: string | number; icon: React.ElementType }) {
  return (
    <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-muted/30 text-center">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-0.5">
        <Icon size={14} className="text-primary" />
      </div>
      <span className="font-display font-bold text-lg leading-none text-foreground">
        {value}
      </span>
      <span className="text-[11px] text-muted-foreground">{label}</span>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Profile() {
  const {
    isAuthenticated,
    profile: authProfile,
    isLoading: authLoading,
    logout,
    role,
  } = useAuthContext();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: orders = [] } = useMyOrders();
  const saveMutation = useSaveProfile();

  // Fetch my reviews: use listAllReviews and filter by caller principal
  const { actor, isFetching: actorFetching } = useActor();
  const { data: myReviews = [], isLoading: reviewsLoading } = useQuery<
    Review[]
  >({
    queryKey: ["myReviews"],
    queryFn: async () => {
      if (!actor || !profile) return [];
      const all = await actor.listAllReviews();
      return all.filter(
        (r) => r.customerId.toString() === profile.id.toString(),
      );
    },
    enabled: !!actor && !actorFetching && isAuthenticated && !!profile,
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [defaultAddress, setDefaultAddress] = useState("");

  useEffect(() => {
    const p = profile ?? authProfile;
    if (p) {
      setName(p.name ?? "");
      setEmail(p.email ?? "");
      setPhone(p.phone ?? "");
      setDefaultAddress(p.defaultAddress ?? "");
    }
  }, [profile, authProfile]);

  const isLoading = authLoading || profileLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveMutation.mutateAsync({ name, email, phone, defaultAddress });
      toast.success("Profile saved!", {
        description: "Your details have been updated.",
      });
    } catch {
      toast.error("Failed to save profile", {
        description: "Please try again.",
      });
    }
  };

  const principalText =
    profile?.id?.toString() ?? authProfile?.id?.toString() ?? "—";
  const shortPrincipal =
    principalText.length > 24
      ? `${principalText.slice(0, 12)}…${principalText.slice(-8)}`
      : principalText;

  const memberSince =
    (profile?.createdAt ?? authProfile?.createdAt)
      ? new Date(
          Number((profile?.createdAt ?? authProfile?.createdAt)!) / 1_000_000,
        ).toLocaleDateString("en-IN", { year: "numeric", month: "long" })
      : null;

  const currentRole: UserRole = role ?? UserRole.customer;
  const avatarLetter = name ? name[0].toUpperCase() : "U";

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 py-8 space-y-5">
          <Skeleton className="h-28 w-full rounded-2xl" />
          <Skeleton className="h-64 w-full rounded-2xl" />
          <Skeleton className="h-40 w-full rounded-2xl" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-muted/30 min-h-full">
        {/* Hero strip */}
        <div className="bg-card border-b border-border/60">
          <div className="max-w-2xl mx-auto px-4 py-6">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-primary/15 border-2 border-primary/25 flex items-center justify-center shadow-card">
                  <span className="font-display font-bold text-2xl text-primary">
                    {avatarLetter}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-card" />
              </div>

              {/* Identity info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-display font-bold text-xl text-foreground truncate">
                    {name || "Your Profile"}
                  </h1>
                  <RoleBadge role={currentRole} />
                </div>
                <p
                  className="text-xs text-muted-foreground font-mono mt-0.5 truncate"
                  title={principalText}
                >
                  {shortPrincipal}
                </p>
                {memberSince && (
                  <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                    <CalendarDays size={11} />
                    Member since {memberSince}
                  </p>
                )}
              </div>

              {/* Logout */}
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                data-ocid="profile.logout.button"
                className="shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-1.5"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Sign out</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
          {/* Order stats summary */}
          <SectionCard title="Activity Overview" icon={ClipboardList}>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <StatTile
                label="Total Orders"
                value={orders.length}
                icon={ClipboardList}
              />
              <StatTile label="Reviews" value={myReviews.length} icon={Star} />
              <StatTile
                label="Avg Rating"
                value={
                  myReviews.length > 0
                    ? (
                        myReviews.reduce(
                          (acc, r) => acc + Number(r.rating),
                          0,
                        ) / myReviews.length
                      ).toFixed(1)
                    : "—"
                }
                icon={MessageSquare}
              />
            </div>
            <Link
              to="/orders"
              data-ocid="profile.orders_history.link"
              className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-muted/30 hover:bg-primary/5 hover:border-primary/30 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ClipboardList size={14} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    View Order History
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {orders.length} order{orders.length !== 1 ? "s" : ""} placed
                  </p>
                </div>
              </div>
              <ArrowRight
                size={16}
                className="text-muted-foreground group-hover:text-primary transition-colors"
              />
            </Link>
          </SectionCard>

          {/* Edit profile form */}
          <SectionCard title="Personal Details" icon={User}>
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              data-ocid="profile.form"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="name"
                    className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    data-ocid="profile.name.input"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="email"
                    className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    data-ocid="profile.email.input"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="phone"
                  className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                >
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 9876543210"
                  data-ocid="profile.phone.input"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="defaultAddress"
                  className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1"
                >
                  <MapPin size={11} />
                  Default Delivery Address
                </Label>
                <Input
                  id="defaultAddress"
                  value={defaultAddress}
                  onChange={(e) => setDefaultAddress(e.target.value)}
                  placeholder="Home / Office address"
                  data-ocid="profile.address.input"
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between gap-3">
                {saveMutation.isSuccess && (
                  <p
                    data-ocid="profile.save.success_state"
                    className="text-xs text-green-600 font-medium flex items-center gap-1"
                  >
                    ✓ Profile saved successfully
                  </p>
                )}
                {saveMutation.isError && (
                  <p
                    data-ocid="profile.save.error_state"
                    className="text-xs text-destructive font-medium"
                  >
                    Failed to save. Please retry.
                  </p>
                )}
                {!saveMutation.isSuccess && !saveMutation.isError && <span />}
                <Button
                  type="submit"
                  disabled={saveMutation.isPending}
                  data-ocid="profile.save.submit_button"
                  className="min-w-28"
                >
                  {saveMutation.isPending ? "Saving…" : "Save Changes"}
                </Button>
              </div>
            </form>
          </SectionCard>

          {/* My reviews */}
          <SectionCard title="My Reviews" icon={Star}>
            {reviewsLoading ? (
              <div
                className="space-y-3"
                data-ocid="profile.reviews.loading_state"
              >
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-20 w-full rounded-xl" />
                ))}
              </div>
            ) : myReviews.length === 0 ? (
              <div
                data-ocid="profile.reviews.empty_state"
                className="flex flex-col items-center gap-3 py-8 text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                  <MessageSquare
                    size={20}
                    className="text-muted-foreground/60"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    No reviews yet
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Order food and share your experience
                  </p>
                </div>
                <Link to="/" data-ocid="profile.reviews_empty.link">
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <UtensilsCrossed size={13} />
                    Explore Restaurants
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3" data-ocid="profile.reviews.list">
                {myReviews.slice(0, 10).map((review, i) => (
                  <ReviewCard
                    key={review.id.toString()}
                    review={review}
                    index={i}
                  />
                ))}
                {myReviews.length > 10 && (
                  <p className="text-xs text-center text-muted-foreground pt-1">
                    + {myReviews.length - 10} more reviews
                  </p>
                )}
              </div>
            )}
          </SectionCard>

          {/* Account info */}
          <SectionCard title="Account Info" icon={ShieldCheck}>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-border/40">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Principal ID
                </span>
                <span
                  className="text-xs font-mono text-foreground truncate max-w-[180px]"
                  title={principalText}
                >
                  {shortPrincipal}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border/40">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Role
                </span>
                <RoleBadge role={currentRole} />
              </div>
              {memberSince && (
                <div className="flex items-center justify-between py-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Member Since
                  </span>
                  <span className="text-xs text-foreground">{memberSince}</span>
                </div>
              )}
            </div>
            <Button
              variant="outline"
              className="w-full mt-4 text-destructive border-destructive/30 hover:bg-destructive/5 hover:border-destructive/60 gap-2"
              onClick={logout}
              data-ocid="profile.logout_account.button"
            >
              <LogOut size={14} />
              Sign Out of Account
            </Button>
          </SectionCard>
        </div>
      </div>
    </Layout>
  );
}
