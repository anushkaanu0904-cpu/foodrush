import { r as reactExports, j as jsxRuntimeExports } from "./index-BOLlBpkj.js";
import { S as Star } from "./star-BPYwLT5u.js";
const sizeMap = { sm: 12, md: 16, lg: 20 };
function StarRating({
  value,
  max = 5,
  interactive = false,
  onChange,
  size = "md",
  className = ""
}) {
  const [hovered, setHovered] = reactExports.useState(null);
  const px = sizeMap[size];
  const display = hovered ?? value;
  const stars = Array.from({ length: max }, (_, i) => `star-${i + 1}`);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `flex items-center gap-0.5 ${className}`,
      role: interactive ? "radiogroup" : void 0,
      "aria-label": `Rating: ${value} out of ${max}`,
      children: stars.map((starId, i) => {
        const filled = i < display;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            role: interactive ? "radio" : void 0,
            "aria-checked": interactive ? i < value : void 0,
            "aria-label": interactive ? `${i + 1} star` : `${i + 1} of ${max}`,
            onClick: interactive && onChange ? () => onChange(i + 1) : void 0,
            onMouseEnter: interactive ? () => setHovered(i + 1) : void 0,
            onMouseLeave: interactive ? () => setHovered(null) : void 0,
            className: interactive ? "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded" : "cursor-default pointer-events-none",
            tabIndex: interactive ? 0 : -1,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Star,
              {
                size: px,
                className: filled ? "fill-primary text-primary" : "fill-muted text-muted-foreground/40"
              }
            )
          },
          starId
        );
      })
    }
  );
}
export {
  StarRating as S
};
