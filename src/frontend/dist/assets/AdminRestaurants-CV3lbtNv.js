import { j as jsxRuntimeExports, r as reactExports, P as PageLoader, L as Link, a as ue, h as useAuthContext, E as ExternalBlob } from "./index-BOLlBpkj.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-C3_UGN1N.js";
import { c as createLucideIcon, a as cn, L as Layout, B as Button, U as Utensils, b as Badge, d as ChevronDown, I as Input } from "./Layout-jHZpHPgU.js";
import { R as Root, C as Content, a as Close, b as Title, P as Portal, O as Overlay } from "./index-cR41zDxl.js";
import { X } from "./x-BnbYBnaW.js";
import { L as Label } from "./label-Bmb5X0vy.js";
import { T as Textarea } from "./textarea-CoNsSluP.js";
import { E as EmptyState } from "./EmptyState-B1JZtRfX.js";
import { P as PriceDisplay, r as rupeesToPaisa } from "./PriceDisplay-BM2hoOae.js";
import { u as useRestaurants, f as useDeleteRestaurant, b as useFoodItems, g as useCreateFoodItem, h as useUpdateFoodItem, i as useDeleteFoodItem, j as useCreateRestaurant, k as useUpdateRestaurant } from "./useRestaurants-D_HCb9c3.js";
import { P as Plus } from "./plus-BtlvXxTP.js";
import { S as Star } from "./star-BPYwLT5u.js";
import { T as Trash2 } from "./trash-2-HAHo1oqD.js";
import { C as ChevronRight } from "./chevron-right-u12SehgJ.js";
import "./index-C0MjPmF0.js";
import "./useMutation-I4pzC6GI.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode);
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function blankRestaurantInput() {
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
    imageUrl: ""
  };
}
function blankFoodItemForm() {
  return { name: "", description: "", category: "", price: "", imageUrl: "" };
}
function RestaurantFormModal({
  open,
  onClose,
  initial,
  restaurantId
}) {
  const isEdit = !!restaurantId;
  const createMutation = useCreateRestaurant();
  const updateMutation = useUpdateRestaurant();
  const { profile } = useAuthContext();
  const [form, setForm] = reactExports.useState(
    () => {
      var _a, _b;
      return initial ? {
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
        imageUrl: ((_b = (_a = initial.image) == null ? void 0 : _a.getDirectURL) == null ? void 0 : _b.call(_a)) ?? ""
      } : blankRestaurantInput();
    }
  );
  const [saving, setSaving] = reactExports.useState(false);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.cuisineType) {
      ue.error("Name and cuisine type are required");
      return;
    }
    setSaving(true);
    try {
      const input = {
        name: form.name,
        description: form.description,
        cuisineType: form.cuisineType,
        address: form.address,
        phone: form.phone,
        deliveryFee: rupeesToPaisa(Number.parseFloat(form.deliveryFee) || 0),
        minimumOrder: rupeesToPaisa(Number.parseFloat(form.minimumOrder) || 0),
        deliveryTimeMinutes: BigInt(
          Number.parseInt(form.deliveryTimeMinutes) || 30
        ),
        image: form.imageUrl ? ExternalBlob.fromURL(form.imageUrl) : ExternalBlob.fromURL("/assets/images/placeholder-restaurant.jpg"),
        ownerId: profile.id,
        operatingHours: {
          openTime: form.openTime,
          closeTime: form.closeTime,
          daysOpen: form.daysOpen.split(",").map((d) => d.trim())
        }
      };
      if (isEdit && restaurantId) {
        await updateMutation.mutateAsync({ id: restaurantId, input });
        ue.success("Restaurant updated");
      } else {
        await createMutation.mutateAsync(input);
        ue.success("Restaurant created");
      }
      onClose();
    } catch {
      ue.error(isEdit ? "Failed to update" : "Failed to create");
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-lg max-h-[90vh] overflow-y-auto",
      "data-ocid": "admin_restaurants.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: isEdit ? "Edit Restaurant" : "Add Restaurant" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "r-name", children: "Restaurant Name *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "r-name",
                  value: form.name,
                  onChange: (e) => set("name", e.target.value),
                  placeholder: "e.g. Spice Garden",
                  "data-ocid": "admin_restaurants.name.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "r-desc", children: "Description" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "r-desc",
                  value: form.description,
                  onChange: (e) => set("description", e.target.value),
                  placeholder: "Short description…",
                  rows: 2,
                  "data-ocid": "admin_restaurants.description.textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "r-cuisine", children: "Cuisine Type *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "r-cuisine",
                  value: form.cuisineType,
                  onChange: (e) => set("cuisineType", e.target.value),
                  placeholder: "e.g. North Indian",
                  "data-ocid": "admin_restaurants.cuisine.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "r-phone", children: "Phone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "r-phone",
                  value: form.phone,
                  onChange: (e) => set("phone", e.target.value),
                  placeholder: "+91 …",
                  "data-ocid": "admin_restaurants.phone.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "r-address", children: "Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "r-address",
                  value: form.address,
                  onChange: (e) => set("address", e.target.value),
                  placeholder: "Full address",
                  "data-ocid": "admin_restaurants.address.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "r-fee", children: "Delivery Fee (₹)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "r-fee",
                  type: "number",
                  min: "0",
                  value: form.deliveryFee,
                  onChange: (e) => set("deliveryFee", e.target.value),
                  placeholder: "49",
                  "data-ocid": "admin_restaurants.delivery_fee.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "r-min", children: "Min Order (₹)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "r-min",
                  type: "number",
                  min: "0",
                  value: form.minimumOrder,
                  onChange: (e) => set("minimumOrder", e.target.value),
                  placeholder: "149",
                  "data-ocid": "admin_restaurants.min_order.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "r-time", children: "Delivery Time (min)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "r-time",
                  type: "number",
                  min: "1",
                  value: form.deliveryTimeMinutes,
                  onChange: (e) => set("deliveryTimeMinutes", e.target.value),
                  placeholder: "30",
                  "data-ocid": "admin_restaurants.delivery_time.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "r-days", children: "Days Open" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "r-days",
                  value: form.daysOpen,
                  onChange: (e) => set("daysOpen", e.target.value),
                  placeholder: "Mon,Tue,…",
                  "data-ocid": "admin_restaurants.days_open.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "r-open", children: "Open Time" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "r-open",
                  type: "time",
                  value: form.openTime,
                  onChange: (e) => set("openTime", e.target.value),
                  "data-ocid": "admin_restaurants.open_time.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "r-close", children: "Close Time" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "r-close",
                  type: "time",
                  value: form.closeTime,
                  onChange: (e) => set("closeTime", e.target.value),
                  "data-ocid": "admin_restaurants.close_time.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "r-img", children: "Image URL" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "r-img",
                  value: form.imageUrl,
                  onChange: (e) => set("imageUrl", e.target.value),
                  placeholder: "https://…",
                  "data-ocid": "admin_restaurants.image_url.input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2 justify-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: onClose,
                "data-ocid": "admin_restaurants.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: saving,
                "data-ocid": "admin_restaurants.submit_button",
                children: saving ? "Saving…" : isEdit ? "Save Changes" : "Create Restaurant"
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function FoodItemsPanel({ restaurantId }) {
  const { data: items, isLoading } = useFoodItems(restaurantId);
  const createMutation = useCreateFoodItem();
  const updateMutation = useUpdateFoodItem();
  const deleteMutation = useDeleteFoodItem();
  const [form, setForm] = reactExports.useState(blankFoodItemForm());
  const [editingId, setEditingId] = reactExports.useState(null);
  const [showForm, setShowForm] = reactExports.useState(false);
  const [saving, setSaving] = reactExports.useState(false);
  const setF = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const openEdit = (item) => {
    var _a, _b;
    setEditingId(item.id);
    setForm({
      name: item.name,
      description: item.description,
      category: item.category,
      price: (Number(item.price) / 100).toString(),
      imageUrl: ((_b = (_a = item.image) == null ? void 0 : _a.getDirectURL) == null ? void 0 : _b.call(_a)) ?? ""
    });
    setShowForm(true);
  };
  const openAdd = () => {
    setEditingId(null);
    setForm(blankFoodItemForm());
    setShowForm(true);
  };
  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name || !form.category) {
      ue.error("Name and category are required");
      return;
    }
    setSaving(true);
    try {
      const input = {
        restaurantId,
        name: form.name,
        description: form.description,
        category: form.category,
        price: rupeesToPaisa(Number.parseFloat(form.price) || 0),
        dietaryTags: [],
        image: form.imageUrl ? ExternalBlob.fromURL(form.imageUrl) : ExternalBlob.fromURL("/assets/images/placeholder-food.jpg")
      };
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, input });
        ue.success("Item updated");
      } else {
        await createMutation.mutateAsync(input);
        ue.success("Item added");
      }
      setShowForm(false);
    } catch {
      ue.error("Failed to save item");
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async (item) => {
    if (!confirm(`Delete "${item.name}"?`)) return;
    try {
      await deleteMutation.mutateAsync({
        foodItemId: item.id,
        restaurantId
      });
      ue.success("Item deleted");
    } catch {
      ue.error("Failed to delete item");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 border-t border-border pt-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Menu Items" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          variant: "outline",
          onClick: openAdd,
          "data-ocid": "admin_restaurants.add_food_item.button",
          className: "h-7 text-xs gap-1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12 }),
            " Add Item"
          ]
        }
      )
    ] }),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleSave,
        className: "bg-muted/40 rounded-xl p-4 mb-3 space-y-3",
        "data-ocid": "admin_restaurants.food_item_form",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Name *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.name,
                  onChange: (e) => setF("name", e.target.value),
                  placeholder: "e.g. Butter Chicken",
                  className: "h-8 text-xs",
                  "data-ocid": "admin_restaurants.food_item.name.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Category *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.category,
                  onChange: (e) => setF("category", e.target.value),
                  placeholder: "e.g. Main Course",
                  className: "h-8 text-xs",
                  "data-ocid": "admin_restaurants.food_item.category.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Price (₹)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  min: "0",
                  value: form.price,
                  onChange: (e) => setF("price", e.target.value),
                  placeholder: "299",
                  className: "h-8 text-xs",
                  "data-ocid": "admin_restaurants.food_item.price.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Image URL" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.imageUrl,
                  onChange: (e) => setF("imageUrl", e.target.value),
                  placeholder: "https://…",
                  className: "h-8 text-xs",
                  "data-ocid": "admin_restaurants.food_item.image.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Description" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.description,
                  onChange: (e) => setF("description", e.target.value),
                  placeholder: "Short description",
                  className: "h-8 text-xs",
                  "data-ocid": "admin_restaurants.food_item.description.input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                className: "h-7 text-xs",
                onClick: () => setShowForm(false),
                "data-ocid": "admin_restaurants.food_item.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                size: "sm",
                className: "h-7 text-xs",
                disabled: saving,
                "data-ocid": "admin_restaurants.food_item.save_button",
                children: saving ? "Saving…" : editingId ? "Update" : "Add"
              }
            )
          ] })
        ]
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground py-2", children: "Loading items…" }) : !items || items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-xs text-muted-foreground py-2",
        "data-ocid": "admin_restaurants.food_items.empty_state",
        children: "No menu items yet."
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "space-y-2",
        "data-ocid": "admin_restaurants.food_items.list",
        children: items.map((item, idx) => {
          var _a, _b;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": `admin_restaurants.food_item.${idx + 1}`,
              className: "flex items-center gap-3 py-2 border-b border-border/50 last:border-b-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-muted overflow-hidden shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: ((_b = (_a = item.image) == null ? void 0 : _a.getDirectURL) == null ? void 0 : _b.call(_a)) ?? "/assets/images/placeholder-food.jpg",
                    alt: item.name,
                    className: "w-full h-full object-cover"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: item.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    item.category,
                    " · ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(PriceDisplay, { paisa: item.price })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "ghost",
                      className: "h-7 w-7 p-0",
                      onClick: () => openEdit(item),
                      "data-ocid": `admin_restaurants.food_item.edit_button.${idx + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 12 })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "ghost",
                      className: "h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10",
                      onClick: () => handleDelete(item),
                      "data-ocid": `admin_restaurants.food_item.delete_button.${idx + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 12 })
                    }
                  )
                ] })
              ]
            },
            item.id.toString()
          );
        })
      }
    )
  ] });
}
function AdminRestaurants() {
  const { data: restaurants, isLoading } = useRestaurants();
  const deleteMutation = useDeleteRestaurant();
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [editRestaurant, setEditRestaurant] = reactExports.useState(null);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(
    null
  );
  const [expandedMenuId, setExpandedMenuId] = reactExports.useState(null);
  const handleEdit = (r) => {
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
      ue.success(`"${deleteTarget.name}" deleted`);
    } catch {
      ue.error("Failed to delete restaurant");
    } finally {
      setDeleteTarget(null);
    }
  };
  const toggleMenu = (id) => setExpandedMenuId((prev) => prev === id ? null : id);
  if (isLoading)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, {}) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 py-6", children: [
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Restaurants" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: handleAddNew,
            "data-ocid": "admin_restaurants.add_button",
            className: "gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
              " Add Restaurant"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 mb-6", children: [
        { label: "Total", value: (restaurants == null ? void 0 : restaurants.length) ?? 0 },
        {
          label: "Active",
          value: (restaurants == null ? void 0 : restaurants.filter((r) => r.isActive).length) ?? 0
        },
        {
          label: "Inactive",
          value: (restaurants == null ? void 0 : restaurants.filter((r) => !r.isActive).length) ?? 0
        }
      ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card rounded-xl shadow-card p-3 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xl text-foreground", children: s.value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: s.label })
          ]
        },
        s.label
      )) }),
      !restaurants || restaurants.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Utensils, { size: 56 }),
          title: "No restaurants yet",
          description: "Add your first restaurant to get started.",
          action: { label: "Add Restaurant", onClick: handleAddNew },
          "data-ocid": "admin_restaurants.empty_state"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "admin_restaurants.list", children: restaurants.map((restaurant, i) => {
        var _a, _b;
        const imageUrl = ((_b = (_a = restaurant.image) == null ? void 0 : _a.getDirectURL) == null ? void 0 : _b.call(_a)) ?? "/assets/images/placeholder-restaurant.jpg";
        const isExpanded = expandedMenuId === restaurant.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `admin_restaurants.item.${i + 1}`,
            className: "bg-card rounded-2xl shadow-card overflow-hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-xl overflow-hidden bg-muted shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: imageUrl,
                    alt: restaurant.name,
                    className: "w-full h-full object-cover"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground truncate", children: restaurant.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: restaurant.isActive ? "default" : "secondary",
                        className: `text-xs shrink-0 ${restaurant.isActive ? "bg-primary/10 text-primary border-primary/25" : ""}`,
                        children: restaurant.isActive ? "Active" : "Inactive"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1.5", children: restaurant.cuisineType }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Star,
                        {
                          size: 11,
                          className: "fill-primary text-primary"
                        }
                      ),
                      restaurant.averageRating.toFixed(1),
                      " (",
                      restaurant.reviewCount.toString(),
                      ")"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "Min: ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(PriceDisplay, { paisa: restaurant.minimumOrder })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "Fee: ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(PriceDisplay, { paisa: restaurant.deliveryFee })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      restaurant.deliveryTimeMinutes.toString(),
                      " min"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      className: "h-7 text-xs gap-1",
                      onClick: () => handleEdit(restaurant),
                      "data-ocid": `admin_restaurants.edit_button.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 11 }),
                        " Edit"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "ghost",
                      className: "h-7 text-xs gap-1 text-destructive hover:text-destructive hover:bg-destructive/10",
                      onClick: () => setDeleteTarget(restaurant),
                      "data-ocid": `admin_restaurants.delete_button.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 11 }),
                        " Delete"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "ghost",
                      className: "h-7 text-xs gap-1 text-primary hover:bg-primary/10",
                      onClick: () => toggleMenu(restaurant.id),
                      "data-ocid": `admin_restaurants.menu_button.${i + 1}`,
                      children: [
                        "Menu",
                        " ",
                        isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 11 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 11 })
                      ]
                    }
                  )
                ] })
              ] }),
              isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FoodItemsPanel, { restaurantId: restaurant.id }) })
            ]
          },
          restaurant.id.toString()
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      RestaurantFormModal,
      {
        open: modalOpen,
        onClose: handleModalClose,
        initial: editRestaurant,
        restaurantId: (editRestaurant == null ? void 0 : editRestaurant.id) ?? null
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!deleteTarget,
        onOpenChange: (o) => !o && setDeleteTarget(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "admin_restaurants.delete.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Restaurant" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              "Are you sure you want to delete “",
              deleteTarget == null ? void 0 : deleteTarget.name,
              "”? This cannot be undone."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "admin_restaurants.delete.cancel_button", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                onClick: handleDeleteConfirm,
                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                "data-ocid": "admin_restaurants.delete.confirm_button",
                children: "Delete"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  AdminRestaurants as default
};
