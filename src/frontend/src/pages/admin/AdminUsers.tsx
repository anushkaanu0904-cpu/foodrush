import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "@tanstack/react-router";
import { ShieldCheck, User, UserX, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Layout } from "../../components/Layout";
import { PageLoader } from "../../components/LoadingSpinner";
import {
  useAllUsers,
  useAssignUserRole,
  useSoftDeleteUser,
} from "../../hooks/useProfile";
import { UserRole } from "../../types";
import type { UserId, UserProfile } from "../../types";

const ROLES = Object.values(UserRole);

const ROLE_CONFIG: Record<
  UserRole,
  { label: string; badge: string; icon: React.ElementType }
> = {
  [UserRole.admin]: {
    label: "Admin",
    badge:
      "bg-primary/10 text-primary border-primary/30 dark:bg-primary/20 dark:text-primary",
    icon: ShieldCheck,
  },
  [UserRole.customer]: {
    label: "Customer",
    badge: "bg-secondary text-muted-foreground border-border",
    icon: User,
  },
  [UserRole.restaurant_owner]: {
    label: "Restaurant Owner",
    badge: "bg-accent/15 text-accent-foreground border-accent/25",
    icon: User,
  },
};

// ─── user row ─────────────────────────────────────────────────────────────────

function UserRow({
  user,
  index,
  onDelete,
}: {
  user: UserProfile;
  index: number;
  onDelete: (id: UserId, name: string) => void;
}) {
  const assignRole = useAssignUserRole();

  const handleRoleChange = async (role: UserRole) => {
    if (role === user.role) return;
    try {
      await assignRole.mutateAsync({ userId: user.id, role });
      toast.success("Role updated");
    } catch {
      toast.error("Failed to update role");
    }
  };

  const roleCfg = ROLE_CONFIG[user.role] ?? ROLE_CONFIG[UserRole.customer];
  const joinedDate = new Date(
    Number(user.createdAt) / 1_000_000,
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      data-ocid={`admin_users.item.${index + 1}`}
      className="grid grid-cols-1 md:grid-cols-[1.5fr_1.5fr_1fr_1.5fr_auto] gap-3 px-4 py-4 border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors items-center"
    >
      {/* Name + principal */}
      <div className="min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <User size={13} className="text-primary" />
          </div>
          <p className="font-medium text-foreground text-sm truncate">
            {user.name || "—"}
          </p>
        </div>
        <p className="font-mono text-[10px] text-muted-foreground pl-9 truncate">
          {user.id.toString().slice(0, 22)}…
        </p>
      </div>

      {/* Email */}
      <div className="min-w-0 pl-0 md:pl-0">
        <p className="text-xs text-muted-foreground truncate">
          {user.email || "—"}
        </p>
        {user.phone && (
          <p className="text-xs text-muted-foreground/70">{user.phone}</p>
        )}
      </div>

      {/* Joined */}
      <div>
        <p className="text-xs text-muted-foreground">{joinedDate}</p>
      </div>

      {/* Role select */}
      <div>
        <Select
          value={user.role}
          onValueChange={(v) => handleRoleChange(v as UserRole)}
        >
          <SelectTrigger
            className="h-8 text-xs w-full"
            data-ocid={`admin_users.role_select.${index + 1}`}
          >
            <SelectValue>
              <Badge variant="outline" className={`text-xs ${roleCfg.badge}`}>
                {roleCfg.label}
              </Badge>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {ROLES.map((r) => {
              const cfg = ROLE_CONFIG[r];
              return (
                <SelectItem key={r} value={r} className="text-xs">
                  <div className="flex items-center gap-2">
                    <cfg.icon size={12} />
                    {cfg.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* Delete */}
      <button
        type="button"
        onClick={() => onDelete(user.id, user.name || "this user")}
        data-ocid={`admin_users.delete_button.${index + 1}`}
        className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs text-destructive hover:bg-destructive/10 transition-colors shrink-0"
        aria-label={`Remove ${user.name}`}
      >
        <UserX size={13} />
        <span className="hidden sm:inline">Remove</span>
      </button>
    </div>
  );
}

// ─── main page ────────────────────────────────────────────────────────────────

export default function AdminUsers() {
  const [roleFilter, setRoleFilter] = useState<UserRole | null>(null);
  const { data: users, isLoading } = useAllUsers(roleFilter);
  const deleteUser = useSoftDeleteUser();
  const [deleteTarget, setDeleteTarget] = useState<{
    id: UserId;
    name: string;
  } | null>(null);

  const handleDeleteRequest = (id: UserId, name: string) => {
    setDeleteTarget({ id, name });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteUser.mutateAsync(deleteTarget.id);
      toast.success(`${deleteTarget.name} removed`);
    } catch {
      toast.error("Failed to remove user");
    } finally {
      setDeleteTarget(null);
    }
  };

  const activeUsers = users?.filter((u) => !u.isDeleted) ?? [];

  if (isLoading)
    return (
      <Layout>
        <PageLoader />
      </Layout>
    );

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link
              to="/admin"
              className="text-xs text-muted-foreground hover:text-primary mb-1 inline-flex items-center gap-1"
            >
              ← Dashboard
            </Link>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Users
            </h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users size={16} />
            <span>{activeUsers.length} users</span>
          </div>
        </div>

        {/* Role filter tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {([null, ...ROLES] as Array<UserRole | null>).map((role) => {
            const label =
              role === null ? "All Users" : (ROLE_CONFIG[role]?.label ?? role);
            const count =
              role === null
                ? activeUsers.length
                : activeUsers.filter((u) => u.role === role).length;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setRoleFilter(role)}
                data-ocid={`admin_users.filter.${(role ?? "all").replace(/_/g, "-")}`}
                className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-smooth ${
                  roleFilter === role
                    ? "bg-primary text-primary-foreground border-primary shadow-card"
                    : "bg-card text-foreground border-border hover:border-primary/40"
                }`}
              >
                {label}
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                    roleFilter === role
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* User table */}
        <div
          className="bg-card rounded-2xl shadow-card overflow-hidden"
          data-ocid="admin_users.list"
        >
          {/* Table header */}
          <div className="hidden md:grid grid-cols-[1.5fr_1.5fr_1fr_1.5fr_auto] gap-3 px-4 py-3 bg-muted/50 text-xs font-semibold text-muted-foreground border-b border-border">
            <span>User</span>
            <span>Email / Phone</span>
            <span>Joined</span>
            <span>Role</span>
            <span>Action</span>
          </div>

          {activeUsers.length === 0 ? (
            <div
              className="p-12 text-center"
              data-ocid="admin_users.empty_state"
            >
              <Users
                size={40}
                className="text-muted-foreground/30 mx-auto mb-3"
              />
              <p className="text-muted-foreground text-sm">No users found.</p>
            </div>
          ) : (
            activeUsers.map((user, i) => (
              <UserRow
                key={user.id.toString()}
                user={user}
                index={i}
                onDelete={handleDeleteRequest}
              />
            ))
          )}
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <AlertDialogContent data-ocid="admin_users.delete.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Remove User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove{" "}
              <strong>{deleteTarget?.name}</strong>? This will soft-delete the
              account and they will no longer be able to access the platform.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin_users.delete.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="admin_users.delete.confirm_button"
            >
              Remove User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}
