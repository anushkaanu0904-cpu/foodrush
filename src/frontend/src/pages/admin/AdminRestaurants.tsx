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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronRight,
  Edit2,
  Plus,
  Star,
  Trash2,
  Utensils,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ExternalBlob } from "../../backend";
import { EmptyState } from "../../components/EmptyState";
import { Layout } from "../../components/Layout";
import { PageLoader } from "../../components/LoadingSpinner";
import { PriceDisplay, rupeesToPaisa } from "../../components/PriceDisplay";
import { useAuthContext } from "../../context/AuthContext";
import {
  useCreateFoodItem,
  useCreateRestaurant,
  useDeleteFoodItem,
  useDeleteRestaurant,
  useFoodItems,
  useRestaurants,
  useUpdateFoodItem,
  useUpdateRestaurant,
} from "../../hooks/useRestaurants";
import type {
  FoodItem,
  FoodItemInput,
  RestaurantInput,
  RestaurantSummary,
} from "../../types";

// ─── helpers ────────────────────────────────────────────────────────────────

function blankRestaurantInput(): RestaurantInputForm {
  return {
    name: "",
    description: "",
    cuisineType: "",
    address: "",
    phone: "",
    deliveryFee: "",
    minimumOrder: "",
    deliveryTimeMinutes: "",
    openTime: "09:00",
    closeTime: "22:00",
    daysOpen: "Mon,Tue,Wed,Thu,Fri,Sat,Sun",
    imageUrl: "",
  };
}

interface RestaurantInputForm {
  name: string;
  description: string;
  cuisineType: string;
  address: string;
  phone: string;
  deliveryFee: string;
  minimumOrder: string;
  deliveryTimeMinutes: string;
  openTime: string;
  closeTime: string;
  daysOpen: string;
  imageUrl: string;
}

interface FoodItemForm {
  name: string;
  description: string;
  category: string;
  price: string;
  imageUrl: string;
}

function blankFoodItemForm(): FoodItemForm {
  return { name: "", description: "", category: "", price: "", imageUrl: "" };
}

// ─── restaurant form ─────────────────────────────────────────────────────────

function RestaurantFormModal({
  open,
  onClose,
  initial,
  restaurantId,
}: {
  open: boolean;
  onClose: () => void;
  initial?: RestaurantSummary | null;
  restaurantId?: bigint | null;
}) {
  const isEdit = !!restaurantId;
  const createMutation = useCreateRestaurant();
  const updateMutation = useUpdateRestaurant();
  const { profile } = useAuthContext();

  const [form, setForm] = useState<RestaurantInputForm>(() =>
    initial
      ? {
          name: initial.name,
          description: "",
          cuisineType: initial.cuisineType,
          address: "",
          phone: "",
          deliveryFee: (Number(initial.deliveryFee) / 100).toString(),
          minimumOrder: (Number(initial.minimumOrder) / 100).toString(),
          deliveryTimeMinutes: initial.deliveryTimeMinutes.toString(),
          openTime: "09:00",
          closeTime: "22:00",
          daysOpen: "Mon,Tue,Wed,Thu,Fri,Sat,Sun",
          imageUrl: initial.image?.getDirectURL?.() ?? "",
        }
      : blankRestaurantInput(),
  );
  const [saving, setSaving] = useState(false);

  const set = (k: keyof RestaurantInputForm, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.cuisineType) {
      toast.error("Name and cuisine type are required");
      return;
    }
    setSaving(true);
    try {
      const input: RestaurantInput = {
        name: form.name,
        description: form.description,
        cuisineType: form.cuisineType,
        address: form.address,
        phone: form.phone,
        deliveryFee: rupeesToPaisa(Number.parseFloat(form.deliveryFee) || 0),
        minimumOrder: rupeesToPaisa(Number.parseFloat(form.minimumOrder) || 0),
        deliveryTimeMinutes: BigInt(
          Number.parseInt(form.deliveryTimeMinutes) || 30,
        ),
        image: form.imageUrl
          ? ExternalBlob.fromURL(form.imageUrl)
          : ExternalBlob.fromURL("/assets/images/placeholder-restaurant.jpg"),
        ownerId: profile!.id,
        operatingHours: {
          openTime: form.openTime,
          closeTime: form.closeTime,
          daysOpen: form.daysOpen.split(",").map((d) => d.trim()),
        },
      };
      if (isEdit && restaurantId) {
        await updateMutation.mutateAsync({ id: restaurantId, input });
        toast.success("Restaurant updated");
      } else {
        await createMutation.mutateAsync(input);
        toast.success("Restaurant created");
      }
      onClose();
    } catch {
      toast.error(isEdit ? "Failed to update" : "Failed to create");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-lg max-h-[90vh] overflow-y-auto"
        data-ocid="admin_restaurants.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display">
            {isEdit ? "Edit Restaurant" : "Add Restaurant"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-1">
              <Label htmlFor="r-name">Restaurant Name *</Label>
              <Input
                id="r-name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="e.g. Spice Garden"
                data-ocid="admin_restaurants.name.input"
              />
            </div>
            <div className="col-span-2 space-y-1">
              <Label htmlFor="r-desc">Description</Label>
              <Textarea
                id="r-desc"
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Short description…"
                rows={2}
                data-ocid="admin_restaurants.description.textarea"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="r-cuisine">Cuisine Type *</Label>
              <Input
                id="r-cuisine"
                value={form.cuisineType}
                onChange={(e) => set("cuisineType", e.target.value)}
                placeholder="e.g. North Indian"
                data-ocid="admin_restaurants.cuisine.input"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="r-phone">Phone</Label>
              <Input
                id="r-phone"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="+91 …"
                data-ocid="admin_restaurants.phone.input"
              />
            </div>
            <div className="col-span-2 space-y-1">
              <Label htmlFor="r-address">Address</Label>
              <Input
                id="r-address"
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
                placeholder="Full address"
                data-ocid="admin_restaurants.address.input"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="r-fee">Delivery Fee (₹)</Label>
              <Input
                id="r-fee"
                type="number"
                min="0"
                value={form.deliveryFee}
                onChange={(e) => set("deliveryFee", e.target.value)}
                placeholder="49"
                data-ocid="admin_restaurants.delivery_fee.input"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="r-min">Min Order (₹)</Label>
              <Input
                id="r-min"
                type="number"
                min="0"
                value={form.minimumOrder}
                onChange={(e) => set("minimumOrder", e.target.value)}
                placeholder="149"
                data-ocid="admin_restaurants.min_order.input"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="r-time">Delivery Time (min)</Label>
              <Input
                id="r-time"
                type="number"
                min="1"
                value={form.deliveryTimeMinutes}
                onChange={(e) => set("deliveryTimeMinutes", e.target.value)}
                placeholder="30"
                data-ocid="admin_restaurants.delivery_time.input"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="r-days">Days Open</Label>
              <Input
                id="r-days"
                value={form.daysOpen}
                onChange={(e) => set("daysOpen", e.target.value)}
                placeholder="Mon,Tue,…"
                data-ocid="admin_restaurants.days_open.input"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="r-open">Open Time</Label>
              <Input
                id="r-open"
                type="time"
                value={form.openTime}
                onChange={(e) => set("openTime", e.target.value)}
                data-ocid="admin_restaurants.open_time.input"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="r-close">Close Time</Label>
              <Input
                id="r-close"
                type="time"
                value={form.closeTime}
                onChange={(e) => set("closeTime", e.target.value)}
                data-ocid="admin_restaurants.close_time.input"
              />
            </div>
            <div className="col-span-2 space-y-1">
              <Label htmlFor="r-img">Image URL</Label>
              <Input
                id="r-img"
                value={form.imageUrl}
                onChange={(e) => set("imageUrl", e.target.value)}
                placeholder="https://…"
                data-ocid="admin_restaurants.image_url.input"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-ocid="admin_restaurants.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving}
              data-ocid="admin_restaurants.submit_button"
            >
              {saving
                ? "Saving…"
                : isEdit
                  ? "Save Changes"
                  : "Create Restaurant"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── food item panel ──────────────────────────────────────────────────────────

function FoodItemsPanel({ restaurantId }: { restaurantId: bigint }) {
  const { data: items, isLoading } = useFoodItems(restaurantId);
  const createMutation = useCreateFoodItem();
  const updateMutation = useUpdateFoodItem();
  const deleteMutation = useDeleteFoodItem();

  const [form, setForm] = useState<FoodItemForm>(blankFoodItemForm());
  const [editingId, setEditingId] = useState<bigint | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const setF = (k: keyof FoodItemForm, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const openEdit = (item: FoodItem) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      description: item.description,
      category: item.category,
      price: (Number(item.price) / 100).toString(),
      imageUrl: item.image?.getDirectURL?.() ?? "",
    });
    setShowForm(true);
  };

  const openAdd = () => {
    setEditingId(null);
    setForm(blankFoodItemForm());
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.category) {
      toast.error("Name and category are required");
      return;
    }
    setSaving(true);
    try {
      const input: FoodItemInput = {
        restaurantId,
        name: form.name,
        description: form.description,
        category: form.category,
        price: rupeesToPaisa(Number.parseFloat(form.price) || 0),
        dietaryTags: [],
        image: form.imageUrl
          ? ExternalBlob.fromURL(form.imageUrl)
          : ExternalBlob.fromURL("/assets/images/placeholder-food.jpg"),
      };
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, input });
        toast.success("Item updated");
      } else {
        await createMutation.mutateAsync(input);
        toast.success("Item added");
      }
      setShowForm(false);
    } catch {
      toast.error("Failed to save item");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: FoodItem) => {
    if (!confirm(`Delete "${item.name}"?`)) return;
    try {
      await deleteMutation.mutateAsync({
        foodItemId: item.id,
        restaurantId,
      });
      toast.success("Item deleted");
    } catch {
      toast.error("Failed to delete item");
    }
  };

  return (
    <div className="mt-4 border-t border-border pt-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-foreground">Menu Items</p>
        <Button
          size="sm"
          variant="outline"
          onClick={openAdd}
          data-ocid="admin_restaurants.add_food_item.button"
          className="h-7 text-xs gap-1"
        >
          <Plus size={12} /> Add Item
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSave}
          className="bg-muted/40 rounded-xl p-4 mb-3 space-y-3"
          data-ocid="admin_restaurants.food_item_form"
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Name *</Label>
              <Input
                value={form.name}
                onChange={(e) => setF("name", e.target.value)}
                placeholder="e.g. Butter Chicken"
                className="h-8 text-xs"
                data-ocid="admin_restaurants.food_item.name.input"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Category *</Label>
              <Input
                value={form.category}
                onChange={(e) => setF("category", e.target.value)}
                placeholder="e.g. Main Course"
                className="h-8 text-xs"
                data-ocid="admin_restaurants.food_item.category.input"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Price (₹)</Label>
              <Input
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => setF("price", e.target.value)}
                placeholder="299"
                className="h-8 text-xs"
                data-ocid="admin_restaurants.food_item.price.input"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Image URL</Label>
              <Input
                value={form.imageUrl}
                onChange={(e) => setF("imageUrl", e.target.value)}
                placeholder="https://…"
                className="h-8 text-xs"
                data-ocid="admin_restaurants.food_item.image.input"
              />
            </div>
            <div className="col-span-2 space-y-1">
              <Label className="text-xs">Description</Label>
              <Input
                value={form.description}
                onChange={(e) => setF("description", e.target.value)}
                placeholder="Short description"
                className="h-8 text-xs"
                data-ocid="admin_restaurants.food_item.description.input"
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 text-xs"
              onClick={() => setShowForm(false)}
              data-ocid="admin_restaurants.food_item.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="h-7 text-xs"
              disabled={saving}
              data-ocid="admin_restaurants.food_item.save_button"
            >
              {saving ? "Saving…" : editingId ? "Update" : "Add"}
            </Button>
          </div>
        </form>
      )}

      {isLoading ? (
        <p className="text-xs text-muted-foreground py-2">Loading items…</p>
      ) : !items || items.length === 0 ? (
        <p
          className="text-xs text-muted-foreground py-2"
          data-ocid="admin_restaurants.food_items.empty_state"
        >
          No menu items yet.
        </p>
      ) : (
        <div
          className="space-y-2"
          data-ocid="admin_restaurants.food_items.list"
        >
          {items.map((item, idx) => (
            <div
              key={item.id.toString()}
              data-ocid={`admin_restaurants.food_item.${idx + 1}`}
              className="flex items-center gap-3 py-2 border-b border-border/50 last:border-b-0"
            >
              <div className="w-10 h-10 rounded-lg bg-muted overflow-hidden shrink-0">
                <img
                  src={
                    item.image?.getDirectURL?.() ??
                    "/assets/images/placeholder-food.jpg"
                  }
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {item.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {item.category} · <PriceDisplay paisa={item.price} />
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0"
                  onClick={() => openEdit(item)}
                  data-ocid={`admin_restaurants.food_item.edit_button.${idx + 1}`}
                >
                  <Edit2 size={12} />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => handleDelete(item)}
                  data-ocid={`admin_restaurants.food_item.delete_button.${idx + 1}`}
                >
                  <Trash2 size={12} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── main page ────────────────────────────────────────────────────────────────

export default function AdminRestaurants() {
  const { data: restaurants, isLoading } = useRestaurants();
  const deleteMutation = useDeleteRestaurant();

  const [modalOpen, setModalOpen] = useState(false);
  const [editRestaurant, setEditRestaurant] =
    useState<RestaurantSummary | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<RestaurantSummary | null>(
    null,
  );
  const [expandedMenuId, setExpandedMenuId] = useState<bigint | null>(null);

  const handleEdit = (r: RestaurantSummary) => {
    setEditRestaurant(r);
    setModalOpen(true);
  };

  const handleAddNew = () => {
    setEditRestaurant(null);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditRestaurant(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success(`"${deleteTarget.name}" deleted`);
    } catch {
      toast.error("Failed to delete restaurant");
    } finally {
      setDeleteTarget(null);
    }
  };

  const toggleMenu = (id: bigint) =>
    setExpandedMenuId((prev) => (prev === id ? null : id));

  if (isLoading)
    return (
      <Layout>
        <PageLoader />
      </Layout>
    );

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-6">
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
              Restaurants
            </h1>
          </div>
          <Button
            onClick={handleAddNew}
            data-ocid="admin_restaurants.add_button"
            className="gap-2"
          >
            <Plus size={16} /> Add Restaurant
          </Button>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Total", value: restaurants?.length ?? 0 },
            {
              label: "Active",
              value: restaurants?.filter((r) => r.isActive).length ?? 0,
            },
            {
              label: "Inactive",
              value: restaurants?.filter((r) => !r.isActive).length ?? 0,
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-card rounded-xl shadow-card p-3 text-center"
            >
              <p className="font-display font-bold text-xl text-foreground">
                {s.value}
              </p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {!restaurants || restaurants.length === 0 ? (
          <EmptyState
            icon={<Utensils size={56} />}
            title="No restaurants yet"
            description="Add your first restaurant to get started."
            action={{ label: "Add Restaurant", onClick: handleAddNew }}
            data-ocid="admin_restaurants.empty_state"
          />
        ) : (
          <div className="space-y-3" data-ocid="admin_restaurants.list">
            {restaurants.map((restaurant, i) => {
              const imageUrl =
                restaurant.image?.getDirectURL?.() ??
                "/assets/images/placeholder-restaurant.jpg";
              const isExpanded = expandedMenuId === restaurant.id;

              return (
                <div
                  key={restaurant.id.toString()}
                  data-ocid={`admin_restaurants.item.${i + 1}`}
                  className="bg-card rounded-2xl shadow-card overflow-hidden"
                >
                  <div className="flex gap-4 p-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted shrink-0">
                      <img
                        src={imageUrl}
                        alt={restaurant.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-display font-semibold text-foreground truncate">
                          {restaurant.name}
                        </h3>
                        <Badge
                          variant={
                            restaurant.isActive ? "default" : "secondary"
                          }
                          className={`text-xs shrink-0 ${restaurant.isActive ? "bg-primary/10 text-primary border-primary/25" : ""}`}
                        >
                          {restaurant.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1.5">
                        {restaurant.cuisineType}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1">
                          <Star
                            size={11}
                            className="fill-primary text-primary"
                          />
                          {restaurant.averageRating.toFixed(1)} (
                          {restaurant.reviewCount.toString()})
                        </span>
                        <span>
                          Min: <PriceDisplay paisa={restaurant.minimumOrder} />
                        </span>
                        <span>
                          Fee: <PriceDisplay paisa={restaurant.deliveryFee} />
                        </span>
                        <span>
                          {restaurant.deliveryTimeMinutes.toString()} min
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs gap-1"
                        onClick={() => handleEdit(restaurant)}
                        data-ocid={`admin_restaurants.edit_button.${i + 1}`}
                      >
                        <Edit2 size={11} /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 text-xs gap-1 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => setDeleteTarget(restaurant)}
                        data-ocid={`admin_restaurants.delete_button.${i + 1}`}
                      >
                        <Trash2 size={11} /> Delete
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 text-xs gap-1 text-primary hover:bg-primary/10"
                        onClick={() => toggleMenu(restaurant.id)}
                        data-ocid={`admin_restaurants.menu_button.${i + 1}`}
                      >
                        Menu{" "}
                        {isExpanded ? (
                          <ChevronDown size={11} />
                        ) : (
                          <ChevronRight size={11} />
                        )}
                      </Button>
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="px-4 pb-4">
                      <FoodItemsPanel restaurantId={restaurant.id} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add / Edit modal */}
      <RestaurantFormModal
        open={modalOpen}
        onClose={handleModalClose}
        initial={editRestaurant}
        restaurantId={editRestaurant?.id ?? null}
      />

      {/* Delete confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <AlertDialogContent data-ocid="admin_restaurants.delete.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Restaurant</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &ldquo;{deleteTarget?.name}
              &rdquo;? This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin_restaurants.delete.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="admin_restaurants.delete.confirm_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}
