import { r as reactExports, j as jsxRuntimeExports, P as PageLoader, L as Link, a as ue, U as UserRole } from "./index-BOLlBpkj.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-C3_UGN1N.js";
import { c as createLucideIcon, L as Layout, f as User, b as Badge } from "./Layout-jHZpHPgU.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-lJpWrGte.js";
import { b as useAllUsers, c as useSoftDeleteUser, d as useAssignUserRole } from "./useProfile-AHZ80ytO.js";
import { U as Users } from "./users-D7LoLWuz.js";
import { S as ShieldCheck } from "./shield-check-BRQc2A6w.js";
import "./index-cR41zDxl.js";
import "./chevron-up-BSn5nQWy.js";
import "./useMutation-I4pzC6GI.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "17", x2: "22", y1: "8", y2: "13", key: "3nzzx3" }],
  ["line", { x1: "22", x2: "17", y1: "8", y2: "13", key: "1swrse" }]
];
const UserX = createLucideIcon("user-x", __iconNode);
const ROLES = Object.values(UserRole);
const ROLE_CONFIG = {
  [UserRole.admin]: {
    label: "Admin",
    badge: "bg-primary/10 text-primary border-primary/30 dark:bg-primary/20 dark:text-primary",
    icon: ShieldCheck
  },
  [UserRole.customer]: {
    label: "Customer",
    badge: "bg-secondary text-muted-foreground border-border",
    icon: User
  },
  [UserRole.restaurant_owner]: {
    label: "Restaurant Owner",
    badge: "bg-accent/15 text-accent-foreground border-accent/25",
    icon: User
  }
};
function UserRow({
  user,
  index,
  onDelete
}) {
  const assignRole = useAssignUserRole();
  const handleRoleChange = async (role) => {
    if (role === user.role) return;
    try {
      await assignRole.mutateAsync({ userId: user.id, role });
      ue.success("Role updated");
    } catch {
      ue.error("Failed to update role");
    }
  };
  const roleCfg = ROLE_CONFIG[user.role] ?? ROLE_CONFIG[UserRole.customer];
  const joinedDate = new Date(
    Number(user.createdAt) / 1e6
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `admin_users.item.${index + 1}`,
      className: "grid grid-cols-1 md:grid-cols-[1.5fr_1.5fr_1fr_1.5fr_auto] gap-3 px-4 py-4 border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors items-center",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 13, className: "text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm truncate", children: user.name || "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-[10px] text-muted-foreground pl-9 truncate", children: [
            user.id.toString().slice(0, 22),
            "…"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 pl-0 md:pl-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: user.email || "—" }),
          user.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70", children: user.phone })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: joinedDate }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: user.role,
            onValueChange: (v) => handleRoleChange(v),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "h-8 text-xs w-full",
                  "data-ocid": `admin_users.role_select.${index + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: `text-xs ${roleCfg.badge}`, children: roleCfg.label }) })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ROLES.map((r) => {
                const cfg = ROLE_CONFIG[r];
                return /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, className: "text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(cfg.icon, { size: 12 }),
                  cfg.label
                ] }) }, r);
              }) })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => onDelete(user.id, user.name || "this user"),
            "data-ocid": `admin_users.delete_button.${index + 1}`,
            className: "flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs text-destructive hover:bg-destructive/10 transition-colors shrink-0",
            "aria-label": `Remove ${user.name}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { size: 13 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Remove" })
            ]
          }
        )
      ]
    }
  );
}
function AdminUsers() {
  const [roleFilter, setRoleFilter] = reactExports.useState(null);
  const { data: users, isLoading } = useAllUsers(roleFilter);
  const deleteUser = useSoftDeleteUser();
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const handleDeleteRequest = (id, name) => {
    setDeleteTarget({ id, name });
  };
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteUser.mutateAsync(deleteTarget.id);
      ue.success(`${deleteTarget.name} removed`);
    } catch {
      ue.error("Failed to remove user");
    } finally {
      setDeleteTarget(null);
    }
  };
  const activeUsers = (users == null ? void 0 : users.filter((u) => !u.isDeleted)) ?? [];
  if (isLoading)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, {}) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/admin",
              className: "text-xs text-muted-foreground hover:text-primary mb-1 inline-flex items-center gap-1",
              children: "← Dashboard"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Users" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 16 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            activeUsers.length,
            " users"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mb-6 overflow-x-auto pb-1", children: [null, ...ROLES].map((role) => {
        var _a;
        const label = role === null ? "All Users" : ((_a = ROLE_CONFIG[role]) == null ? void 0 : _a.label) ?? role;
        const count = role === null ? activeUsers.length : activeUsers.filter((u) => u.role === role).length;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setRoleFilter(role),
            "data-ocid": `admin_users.filter.${(role ?? "all").replace(/_/g, "-")}`,
            className: `shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-smooth ${roleFilter === role ? "bg-primary text-primary-foreground border-primary shadow-card" : "bg-card text-foreground border-border hover:border-primary/40"}`,
            children: [
              label,
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs px-1.5 py-0.5 rounded-full font-bold ${roleFilter === role ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"}`,
                  children: count
                }
              )
            ]
          },
          label
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card rounded-2xl shadow-card overflow-hidden",
          "data-ocid": "admin_users.list",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:grid grid-cols-[1.5fr_1.5fr_1fr_1.5fr_auto] gap-3 px-4 py-3 bg-muted/50 text-xs font-semibold text-muted-foreground border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "User" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Email / Phone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Joined" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Role" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Action" })
            ] }),
            activeUsers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "p-12 text-center",
                "data-ocid": "admin_users.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Users,
                    {
                      size: 40,
                      className: "text-muted-foreground/30 mx-auto mb-3"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No users found." })
                ]
              }
            ) : activeUsers.map((user, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              UserRow,
              {
                user,
                index: i,
                onDelete: handleDeleteRequest
              },
              user.id.toString()
            ))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!deleteTarget,
        onOpenChange: (o) => !o && setDeleteTarget(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "admin_users.delete.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Remove User" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              "Are you sure you want to remove",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: deleteTarget == null ? void 0 : deleteTarget.name }),
              "? This will soft-delete the account and they will no longer be able to access the platform."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "admin_users.delete.cancel_button", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                onClick: handleDeleteConfirm,
                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                "data-ocid": "admin_users.delete.confirm_button",
                children: "Remove User"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  AdminUsers as default
};
