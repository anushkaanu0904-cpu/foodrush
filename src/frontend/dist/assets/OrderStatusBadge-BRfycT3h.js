import { j as jsxRuntimeExports, O as OrderStatus } from "./index-BOLlBpkj.js";
const statusConfig = {
  [OrderStatus.pending]: {
    label: "Pending",
    className: "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800"
  },
  [OrderStatus.preparing]: {
    label: "Preparing",
    className: "bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 border border-orange-200 dark:border-orange-800"
  },
  [OrderStatus.out_for_delivery]: {
    label: "Out for Delivery",
    className: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
  },
  [OrderStatus.delivered]: {
    label: "Delivered",
    className: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800"
  },
  [OrderStatus.cancelled]: {
    label: "Cancelled",
    className: "bg-secondary text-muted-foreground border border-border"
  }
};
function OrderStatusBadge({
  status,
  className = ""
}) {
  const config = statusConfig[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className} ${className}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-70" }),
        config.label
      ]
    }
  );
}
export {
  OrderStatusBadge as O
};
