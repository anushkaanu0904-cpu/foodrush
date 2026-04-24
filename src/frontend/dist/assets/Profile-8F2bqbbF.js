import { h as useAuthContext, i as useActor, k as useQuery, r as reactExports, U as UserRole, j as jsxRuntimeExports, L as Link, a as ue } from "./index-BOLlBpkj.js";
import { c as createLucideIcon, L as Layout, B as Button, e as LogOut, C as ClipboardList, f as User, I as Input } from "./Layout-jHZpHPgU.js";
import { L as Label } from "./label-Bmb5X0vy.js";
import { S as Separator } from "./separator-D0rGvpi1.js";
import { S as Skeleton } from "./skeleton-CN_1PsVK.js";
import { S as StarRating } from "./StarRating-BMVZFCs5.js";
import { u as useMyOrders } from "./useOrders-BVXMOP7Z.js";
import { u as useProfile, a as useSaveProfile } from "./useProfile-AHZ80ytO.js";
import { S as Star } from "./star-BPYwLT5u.js";
import { A as ArrowRight } from "./arrow-right-CwwHqNyW.js";
import { M as MapPin } from "./map-pin-CwKfQ1No.js";
import { U as UtensilsCrossed } from "./utensils-crossed-CCNzBHfL.js";
import { S as ShieldCheck } from "./shield-check-BRQc2A6w.js";
import "./index-C0MjPmF0.js";
import "./useMutation-I4pzC6GI.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
];
const MessageSquare = createLucideIcon("message-square", __iconNode);
const roleMeta = {
  admin: {
    label: "Admin",
    color: "bg-primary/15 text-primary border-primary/25"
  },
  customer: {
    label: "Customer",
    color: "bg-muted text-muted-foreground border-border"
  },
  restaurant_owner: {
    label: "Restaurant Owner",
    color: "bg-accent/15 text-accent-foreground border-accent/25"
  }
};
function RoleBadge({ role }) {
  const meta = roleMeta[role] ?? roleMeta.customer;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${meta.color}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 11 }),
        meta.label
      ]
    }
  );
}
function SectionCard({
  title,
  icon: Icon,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-card border border-border/60 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 px-5 py-4 border-b border-border/60 bg-muted/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 14, className: "text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm text-foreground", children: title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5", children })
  ] });
}
function ReviewCard({ review, index }) {
  const date = new Date(
    Number(review.createdAt) / 1e6
  ).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `profile.review.item.${index + 1}`,
      className: "flex flex-col gap-2 p-4 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UtensilsCrossed, { size: 12, className: "text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm text-foreground truncate", children: "Order review" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { value: Number(review.rating), size: "sm" })
        ] }),
        review.comment && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed line-clamp-3 pl-9", children: [
          '"',
          review.comment,
          '"'
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground pl-9", children: date })
      ]
    }
  );
}
function StatTile({
  label,
  value,
  icon: Icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1 p-3 rounded-xl bg-muted/30 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 14, className: "text-primary" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-lg leading-none text-foreground", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: label })
  ] });
}
function Profile() {
  var _a, _b;
  const {
    isAuthenticated,
    profile: authProfile,
    isLoading: authLoading,
    logout,
    role
  } = useAuthContext();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: orders = [] } = useMyOrders();
  const saveMutation = useSaveProfile();
  const { actor, isFetching: actorFetching } = useActor();
  const { data: myReviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: ["myReviews"],
    queryFn: async () => {
      if (!actor || !profile) return [];
      const all = await actor.listAllReviews();
      return all.filter(
        (r) => r.customerId.toString() === profile.id.toString()
      );
    },
    enabled: !!actor && !actorFetching && isAuthenticated && !!profile
  });
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [defaultAddress, setDefaultAddress] = reactExports.useState("");
  reactExports.useEffect(() => {
    const p = profile ?? authProfile;
    if (p) {
      setName(p.name ?? "");
      setEmail(p.email ?? "");
      setPhone(p.phone ?? "");
      setDefaultAddress(p.defaultAddress ?? "");
    }
  }, [profile, authProfile]);
  const isLoading = authLoading || profileLoading;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveMutation.mutateAsync({ name, email, phone, defaultAddress });
      ue.success("Profile saved!", {
        description: "Your details have been updated."
      });
    } catch {
      ue.error("Failed to save profile", {
        description: "Please try again."
      });
    }
  };
  const principalText = ((_a = profile == null ? void 0 : profile.id) == null ? void 0 : _a.toString()) ?? ((_b = authProfile == null ? void 0 : authProfile.id) == null ? void 0 : _b.toString()) ?? "—";
  const shortPrincipal = principalText.length > 24 ? `${principalText.slice(0, 12)}…${principalText.slice(-8)}` : principalText;
  const memberSince = (profile == null ? void 0 : profile.createdAt) ?? (authProfile == null ? void 0 : authProfile.createdAt) ? new Date(
    Number((profile == null ? void 0 : profile.createdAt) ?? (authProfile == null ? void 0 : authProfile.createdAt)) / 1e6
  ).toLocaleDateString("en-IN", { year: "numeric", month: "long" }) : null;
  const currentRole = role ?? UserRole.customer;
  const avatarLetter = name ? name[0].toUpperCase() : "U";
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-8 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 w-full rounded-2xl" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 min-h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto px-4 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/15 border-2 border-primary/25 flex items-center justify-center shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-2xl text-primary", children: avatarLetter }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-card" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground truncate", children: name || "Your Profile" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RoleBadge, { role: currentRole })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs text-muted-foreground font-mono mt-0.5 truncate",
            title: principalText,
            children: shortPrincipal
          }
        ),
        memberSince && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { size: 11 }),
          "Member since ",
          memberSince
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: logout,
          "data-ocid": "profile.logout.button",
          className: "shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-1.5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 14 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Sign out" })
          ]
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-6 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { title: "Activity Overview", icon: ClipboardList, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatTile,
            {
              label: "Total Orders",
              value: orders.length,
              icon: ClipboardList
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatTile, { label: "Reviews", value: myReviews.length, icon: Star }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatTile,
            {
              label: "Avg Rating",
              value: myReviews.length > 0 ? (myReviews.reduce(
                (acc, r) => acc + Number(r.rating),
                0
              ) / myReviews.length).toFixed(1) : "—",
              icon: MessageSquare
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/orders",
            "data-ocid": "profile.orders_history.link",
            className: "flex items-center justify-between p-3 rounded-xl border border-border/60 bg-muted/30 hover:bg-primary/5 hover:border-primary/30 transition-colors group",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { size: 14, className: "text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "View Order History" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    orders.length,
                    " order",
                    orders.length !== 1 ? "s" : "",
                    " placed"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ArrowRight,
                {
                  size: 16,
                  className: "text-muted-foreground group-hover:text-primary transition-colors"
                }
              )
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { title: "Personal Details", icon: User, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleSubmit,
          className: "space-y-4",
          "data-ocid": "profile.form",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "name",
                    className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                    children: "Full Name"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "name",
                    value: name,
                    onChange: (e) => setName(e.target.value),
                    placeholder: "Your full name",
                    "data-ocid": "profile.name.input",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "email",
                    className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                    children: "Email Address"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "email",
                    type: "email",
                    value: email,
                    onChange: (e) => setEmail(e.target.value),
                    placeholder: "your@email.com",
                    "data-ocid": "profile.email.input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "phone",
                  className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                  children: "Phone Number"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "phone",
                  type: "tel",
                  value: phone,
                  onChange: (e) => setPhone(e.target.value),
                  placeholder: "+91 9876543210",
                  "data-ocid": "profile.phone.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Label,
                {
                  htmlFor: "defaultAddress",
                  className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 11 }),
                    "Default Delivery Address"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "defaultAddress",
                  value: defaultAddress,
                  onChange: (e) => setDefaultAddress(e.target.value),
                  placeholder: "Home / Office address",
                  "data-ocid": "profile.address.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
              saveMutation.isSuccess && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  "data-ocid": "profile.save.success_state",
                  className: "text-xs text-green-600 font-medium flex items-center gap-1",
                  children: "✓ Profile saved successfully"
                }
              ),
              saveMutation.isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  "data-ocid": "profile.save.error_state",
                  className: "text-xs text-destructive font-medium",
                  children: "Failed to save. Please retry."
                }
              ),
              !saveMutation.isSuccess && !saveMutation.isError && /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  disabled: saveMutation.isPending,
                  "data-ocid": "profile.save.submit_button",
                  className: "min-w-28",
                  children: saveMutation.isPending ? "Saving…" : "Save Changes"
                }
              )
            ] })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { title: "My Reviews", icon: Star, children: reviewsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "space-y-3",
          "data-ocid": "profile.reviews.loading_state",
          children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full rounded-xl" }, i))
        }
      ) : myReviews.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "profile.reviews.empty_state",
          className: "flex flex-col items-center gap-3 py-8 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              MessageSquare,
              {
                size: 20,
                className: "text-muted-foreground/60"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "No reviews yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Order food and share your experience" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", "data-ocid": "profile.reviews_empty.link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UtensilsCrossed, { size: 13 }),
              "Explore Restaurants"
            ] }) })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "profile.reviews.list", children: [
        myReviews.slice(0, 10).map((review, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ReviewCard,
          {
            review,
            index: i
          },
          review.id.toString()
        )),
        myReviews.length > 10 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-center text-muted-foreground pt-1", children: [
          "+ ",
          myReviews.length - 10,
          " more reviews"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { title: "Account Info", icon: ShieldCheck, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-2 border-b border-border/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Principal ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs font-mono text-foreground truncate max-w-[180px]",
                title: principalText,
                children: shortPrincipal
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-2 border-b border-border/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Role" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(RoleBadge, { role: currentRole })
          ] }),
          memberSince && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Member Since" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground", children: memberSince })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            className: "w-full mt-4 text-destructive border-destructive/30 hover:bg-destructive/5 hover:border-destructive/60 gap-2",
            onClick: logout,
            "data-ocid": "profile.logout_account.button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 14 }),
              "Sign Out of Account"
            ]
          }
        )
      ] })
    ] })
  ] }) });
}
export {
  Profile as default
};
