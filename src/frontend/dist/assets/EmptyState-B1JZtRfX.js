import { j as jsxRuntimeExports } from "./index-BOLlBpkj.js";
import { B as Button } from "./Layout-jHZpHPgU.js";
function EmptyState({
  icon,
  title,
  description,
  action,
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `flex flex-col items-center justify-center text-center py-16 px-6 ${className}`,
      "data-ocid": "empty_state",
      children: [
        icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 text-muted-foreground opacity-40 text-6xl leading-none", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground mb-2", children: title }),
        description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs mb-6", children: description }),
        action && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: action.onClick, className: "mt-2", children: action.label })
      ]
    }
  );
}
export {
  EmptyState as E
};
